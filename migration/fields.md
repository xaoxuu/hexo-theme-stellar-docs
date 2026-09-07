---
title: 配置对照
date: 2026-09-05 20:49
updated: 2026-09-07 20:24
---

下表以 [1.44.0 默认配置](https://github.com/xaoxuu/hexo-theme-stellar/blob/1.44.0/_config.yml)、Collection 读取链和页面实际用法为依据，覆盖从 1.44.0 升级时仍可出现的主题配置、Collection 与 Front Matter 输入。v2 不会自动读取这些旧名称；新配置的完整用法见[主题参考](/wiki/stellar/reference/theme/)和[Collection 参考](/wiki/stellar/reference/collection/)。

## 站点布局

| 1.44.0 输入 | v2 目标与处理 |
| :--- | :--- |
| `logo.avatar/title/subtitle` | `leftbar.brand.image.src/name/tagline/href`；从 Markdown 链接中拆出图片／文字和链接；不能直接搬 HTML |
| `menubar.items` | `leftbar.menu` 数组；项目 theme 配色改为 accent，保留 id/title/icon/url |
| `site_tree` | `profiles`；同时转换下面的类型名与子字段 |
| index_blog / index_topic / index_wiki | blog_index / topic / wiki_index |
| notebooks / notes / error_page | notebooks / notebook / error；笔记详情仍是 note |
| profile `base_dir/menu_id` | `path/active_menu`；修改后确认生成页面的路径 |
| profile `leftbar/rightbar` 字符串 | Region 对象的 `widgets` 数组；逗号列表拆项，空列表显式 `[]` |
| `nav_tabs` 映射 | `listing_nav.enabled/tabs`，条目转换为 title/url |
| `footer.social` | `leftbar.footer.actions`，逐项明确 link/button/dropdown/spacer |
| `footer.content`、`footer.sitemap` | 分别核对站点页脚正文与 `footer.sections` 的标题／链接分栏；不是 XML sitemap 插件配置 |
| `preconnect` | 路径不变，数组仍整体替换；v2 默认改为空数组，需要的资源 Origin 必须显式保留 |

## 内容默认值

| 1.44.0 输入 | v2 目标与处理 |
| :--- | :--- |
| `article.type/indent` | `article.style/paragraph_indent`；缩进 true→always、false→never，省略按 auto |
| `article.pin_style/card_style/cover_ratio/auto_excerpt/card_tags` | `article.listing.pinned_layout/card_layout/cover_ratio/excerpt_length/show_tags` |
| `article.banner_ratio/category_color/reading_time` | `article.banner.ratio/category_colors/show_reading_time` |
| `article.license/share/tags` | `article.footer.license/share/show_tags`；保留原站点的开关意图 |
| `article.related_posts.enable/max_count` | `article.related_posts_limit`；原来关闭则设 0 |
| `article.ai_label` 样式／默认值配置 | 样式不再是站点参数；实际内容标记写入 Collection/Page `article.ai_label` |
| `notebook.auto_excerpt/per_page/order_by` | `profiles.notebook.listing.excerpt_length/per_page/sort`；`-updated` 转 `{field: updated, direction: desc}` |
| `notebook.tagcons` | `profiles.notebook.tag_icons`；只保留仍有实际标签匹配的键 |
| `notebook.license/share` | 不再是主题级 Notebook 字段；按原适用范围写入各 Notebook Collection 的 `footer.license/share`。Collection 默认关闭分享，`true` 恢复全局 Article 值，数组显式选择服务 |

## 功能与资源

| 1.44.0 输入 | v2 目标与处理 |
| :--- | :--- |
| `search.service: local_search/algolia_search` | `search.provider: local/algolia` |
| `search.local_search.field/content/cache_ttl` | `search.local.scope/include_content/cache_ttl_seconds` |
| `search.local_search.skip_search` | 在实际匹配的页面设置 `visibility.searchable: false`；先保留匹配清单 |
| 搜索索引 path、lazy_load、Algolia js | 当前索引与资源生命周期由主题管理，不保留对应调参入口 |
| `comments.service/comment_title` | `comments.provider/title`；第三方参数保留原字段名 |
| 评论 js/css/src/meta_css 与 custom_css | 内部资源由主题管理；确有自有样式用可信 inject；不要作为 Provider 参数照搬 |
| `tag_plugins` | `tags`；逐项按当前标签参考迁移子字段 |
| `dependencies` | 整段移除；标签插件的懒加载资源、Swiper 和 Markdown 渲染器由 Runtime 管理 |
| `plugins` | 按能力迁入 `features`，不能只改根名：preload→link_prefetch、scrollreveal→reveal、fancybox→lightbox；其它逐项核对 |
| `data_services` | 服务地址进入对应 services Provider 参数；内部脚本路径不再配置 |
| `data_cache` | 缓存策略由 Runtime 内部管理；无对应公开数值开关 |
| `api_host` | 按用途进入 `services.github` 或 `services.github_card` 的完整地址 |
| `style` | 按用途进入 appearance，颜色、排版、圆角、背景分别迁移 |
| `default` | 头像、链接卡片等备用资源进入 fallbacks，错误图进入 profiles.error.image；内容与 Brand 不再共用通用封面 |
| `canonical.originalHost/officialHosts` | `canonical.host/allowed_hosts` |
| `open_graph.enable`、`structured_data.links` | `open_graph.enabled`、`structured_data.same_as` |
| `plugins.<id>.inject` | 内置集成改用对应 features；自有可信 HTML 可放 inject.head_end/body_end，先检查加载时机及是否重复 |
| `stellar`、`system` 内部元数据／资源路径 | 从站点覆盖中移除，以安装包和主题 Runtime 为准 |

`search/comments/canonical/open_graph/structured_data/preconnect` 这些根名称仍存在，但内部字段和默认值已经变化，不能因为根名相同就整段复制。`comments` 的第三方参数保持服务方原字段名；其它根按上表逐项转换。

## 标签与动态数据

v1 的标签插件配置不能只把根节点从 `tag_plugins` 改成 `tags`。下表列出需要继续转换或删除的输入；当前可用标签及参数以[标签插件参考](/wiki/stellar/reference/tags/)为准。

| 1.44.0 输入 | v2 目标与处理 |
| :--- | :--- |
| `tag_plugins.note/checkbox/quot/emoji/icon/button/mark/hashtag` | 保留在 `tags` 的同名节点下；按当前参考重新核对字段与默认值 |
| `tag_plugins.gallery.size` | `tags.gallery.size` |
| `tag_plugins.gallery.ratio` | `tags.gallery.aspect_ratio`；旧值 `origin` 改为 `original` |
| `tag_plugins.gallery.layout` | 不再是全局配置；在每个 gallery 标签中写 `layout:grid` 或 `layout:flow` |
| `tag_plugins.image.parse_markdown` | 移除；v2 不再自动把图片标签转换成 Markdown 图片语法 |
| `tag_plugins.copy.toast` | 移除；复制反馈使用主题内置文案 |
| `tag_plugins.timeline.max-height` | 移除；时间线高度与布局由当前样式管理 |
| `tag_plugins.okr.*` | 移除全局状态表；状态和颜色按当前 OKR 标签参数填写 |
| `tag_plugins.chat.api` | 移除；这是旧版内部资源路径，不是公开服务地址 |
| `{% tip text:注解 %}词句{% endtip %}` | 改为单行语法 `{% tip 词句 pop:注解 %}`；原文支持内联 Markdown，pop 仅接受纯文本 |
| `{% about %}` | 已移除；改用普通 Markdown，并按需组合页面 Front Matter 的 Banner 与 Region |
| `{% users %}` | 改用 `{% friends %}`；v2 不注册旧别名 |
| `source/_data/chat_users.yml` | 将用户资料写在每个 chat 标签块开头的内联 YAML 中 |
| `data_services.fcircle` 或 `timeline type:fcircle` | 无内置等价项；转换为默认时间线可接受的数据，或由站点自行实现适配器 |

其它 `data_services` 内部 JavaScript 路径同样需要移除。只有第三方服务的外部端点和公开参数才进入相应 `services` Provider 配置。

## Collection 与 Front Matter

| 1.44.0 输入 | v2 目标与处理 |
| :--- | :--- |
| 页面 wiki/topic/notebook | `collection.profile/id`；唯一归属可省略，有歧义时显式声明 |
| Collection `title/subtitle` | `name/tagline`；若旧文件同时有 `name` 与 `title/headline`，保留短名为 `name`，把展示主标题放入 `headline` |
| Collection `repo/branch` | `source.repository/source.branch` |
| Collection `base_dir/path/start/tree` | `route.path/route.path/route.start/navigation.tree`；start 仅 Topic、tree 仅 Wiki |
| Collection `sort/pin/order_by` | `listing.order/priority/sort`；排序方向改为结构化的 `field/direction` |
| Collection `auto_excerpt/per_page` | `listing.excerpt_length/per_page`；只写到支持这些字段的 Topic 或 Notebook |
| Collection `leftbar/rightbar` 字符串 | 对应 Region 的 `widgets` 数组；逗号列表拆项，`[]` 明确清空 |
| Notebook `note_leftbar/note_rightbar` | 通用详情默认写入 `profiles.note.*.widgets`；仅个别页面不同则写该页 Region |
| Collection `logo` | 主要迁入 `leftbar.brand`；旧版移动端也复用同一 Logo，需要继续显示时另配 `topbar.brand` 与 `topbar.enabled`；把图标、标题、标语与链接拆为结构化字段 |
| Collection `search/menu/wiki_home` | `leftbar.brand.search`、`leftbar.menu`、`leftbar.brand.back_button`；布尔菜单开关需改成实际菜单数组 |
| Wiki `available` | `audience`；这是项目卡片的“适用于”文字，不是 `visibility` |
| Wiki `coverpage/background/animation/preview/actions` | `hero.enabled/background.image/background.effect/preview/actions`；只支持 Wiki，旧 `animation.params` 改为 effect `options` |
| Wiki `homepage` | 不再单独配置；把目标页放到 `navigation.tree` 第一项，或按最终路由与目录让主题唯一推导 |
| 页面 h1/subtitle/banner_info | `banner.headline/tagline` 与横幅对象，按旧字段实际用途转换 |
| 顶层 type/indent/author/ai_label | `article.style/paragraph_indent/author/ai_label` |
| references/license/share | `footer.references/license/share` |
| 页面 `menu_id` | `active_menu` |
| 页面 `comments` 布尔、`comments_service`、`comment_title/comment_id` | `comments.enabled/provider/title/id` |
| 页面 `beaudar/utterances/giscus/twikoo/waline/artalk` 参数对象 | 移入 `comments.options`；全站默认参数仍写在主题 `comments.<provider>` |
| 页面 `header` | `topbar.enabled`；若需要旧移动页头中的身份信息，同时配置 `topbar.brand` |
| 页面 `logo` | 按显示位置拆为 `leftbar.brand` 与 `topbar.brand`；不再用一份对象隐式覆盖两个区域 |
| 页面 `search` | v2 没有旧版 filter/placeholder 参数对象；需要入口时在 `leftbar.menu` 或 `topbar.menu` 放 `type: search` 项，Collection 范围由当前页面自动确定 |
| 页面 `menu` | `leftbar.menu`；旧布尔开关要改为实际菜单数组，空数组明确隐藏 |
| 页面 `nav_tabs` | 列表级导航迁入 `profiles.blog_index.listing_nav` 或 `profiles.wiki_index.listing_nav`；普通内容页改用 Region Menu 或 navbar 标签 |
| 页面 `wiki_home` | 移入对应 Wiki Collection 的 `leftbar.brand.back_button` |
| indexing | `visibility.searchable` |
| pin/sticky | `listing.priority`；布尔 true 需显式转换为正整数，false 转 0，仅限支持置顶的页面 |
| Notebook order_by/per_page | `listing.sort/per_page`；标签排序与集合排序分别验证 |
| Notebook note_leftbar/note_rightbar | 审查原列表／详情差异，公共值进入 Collection Region，详情专属值放 profiles.note 或页面覆盖 |
| mathjax/katex/mermaid 主题集成开关 | `render.math/diagrams`；其它第三方插件字段按插件本身协议核对 |

`poster` 在 1.44.0 之前已经移除，不属于本次 1.44.0 → v2 的兼容输入；若更早的站点仍保留它，先按旧版本发布记录迁移到 1.44.0，再执行本表。

## 无等价项与默认变化

有些旧字段没有一对一的替代项。`dependencies`、`data_cache`、内部脚本 URL、Wiki `homepage`、标签插件的全局 OKR／复制／时间线策略等由 Runtime 接管或需要按内容重写；自定义脚本、模板注入、缺图时的默认图片和路由设置也要按原用途分别处理。若要保留旧版效果，可能需要在站点中显式配置。本表不包含开发期间的中间配置结构，主题内部模型的属性也不能直接写进站点配置。

迁移后需要通过 Doctor 检查，并确认生成页面的效果，详见[迁移流程](/wiki/stellar/migration/v1-to-v2/)。
