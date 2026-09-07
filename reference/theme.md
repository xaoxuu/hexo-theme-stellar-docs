---
title: 主题配置
date: 2026-09-05 20:49
updated: 2026-09-07 20:24
---

本页适用于 v2 的 `_config.stellar.yml`。主题[默认配置](https://github.com/xaoxuu/hexo-theme-stellar/blob/main/_config.yml)列出了完整配置和默认值，[校验规则](https://github.com/xaoxuu/hexo-theme-stellar/blob/main/scripts/schema/config-rules.js)说明了类型和取值限制。不同版本可能有差异，请以安装版本为准。

下表按用途列出配置项。第三方服务的完整参数以服务方说明为准；对象和数组的覆盖方式见[行为参考](/wiki/stellar/reference/behavior/)。

## 布局、Brand 与导航

| 字段 | 类型与默认 | 说明 |
| :--- | :--- | :--- |
| `topbar.enabled` | boolean，`false` | 顶部栏开关 |
| `leftbar.enabled`、`rightbar.enabled` | boolean，`true` | 左右栏开关 |
| `leftbar.default_state` | `expanded` / `collapsed`，默认 `expanded` | 桌面初始状态 |
| `topbar.brand`、`leftbar.brand` | object / `false` | 固定 Brand；`false` 整体隐藏 |
| Brand `image.src`、`name`、`tagline` | string / null，默认 null | 图片与纯文本身份信息；null 隐藏 |
| Brand `image.variant` | `avatar` / `icon` / `plain`，默认 `avatar` | 图片呈现方式 |
| Brand `href` | string / null，默认 `/` | 安全导航链接 |
| `leftbar.brand.style` | `regular` / `compact`，默认 `regular` | 视觉样式 |
| `topbar.menu`、`leftbar.menu` | array | 顶部默认空；左侧默认博客、分类、标签、专栏、归档、友链、关于及搜索 |
| Menu 项 | object | `type`（默认 link，可用 search）；链接填写非空 kebab-case 的 `id` 与 `url`，可配 title/icon/accent；搜索项只需 type |
| `topbar.widgets`、`leftbar.widgets`、`rightbar.widgets` | array，默认 `[]` | 内容 Widget 列表；profile 可继续覆盖 |
| `leftbar.footer.actions` | array，默认 `[]` | 操作项；类型为 `link/button/dropdown/spacer` |
| Action 项 | object | `type/icon/title/url/onclick/items`；link 用 url，button 用 onclick，dropdown 用 items；子项为 link 或 button |
| `footer.content` | string | 站点页脚 Markdown，默认主题署名；支持主题变量，空串隐藏 |
| `footer.sections` | array，默认 `[]` | 分栏项 `title/items`；子项 `title/url` |

`source/back_button/search` 不属于主题固定 Brand 字段，见 [Collection Brand](/wiki/stellar/reference/collection/#Region-与-Brand)。

## 页面类型

`profiles.<profile>` 保存各类型的专属设置、Region 默认值及导航。Region 子字段沿用上表；省略继承，数组替换，允许的 null 表示继承。下表给出预设布局，实际内容还受可见性和上下文限制。

| Profile | 用途／默认路径 | 默认 Leftbar Widget | 默认 Rightbar Widget |
| :--- | :--- | :--- | :--- |
| `home` | 首页 | recent | 空 |
| `blog_index` | 博客列表，`/blog/` | recent | 空 |
| `post` | 博客文章 | related、recent | ghrepo、toc |
| `topic` | 专栏，`/topic/` 前缀 | related、recent | ghrepo、toc |
| `wiki_index` | Wiki 列表，`/wiki/` | related、recent | 空 |
| `wiki` | Wiki 页面 | tree、related | ghrepo、toc |
| `notebooks` | 全部笔记本，`/notebooks/`；`path: null` 只关闭总列表 | recent | 空 |
| `notebook` | 单个笔记本的列表与标签页 | tagtree、recent | 空 |
| `note` | 笔记详情 | tagtree、recent | toc |
| `author` | 作者页，`/author/` | recent | 空 |
| `page` | 普通独立页面 | recent | toc |
| `settings` | 设置页，`/settings/` | recent | 空 |
| `error` | 错误页，`/404.html` | recent | 空 |

`active_menu` 为菜单 ID 或 null；默认 home、blog_index、post、topic、author、page、error 使用 `post`，其余 null。Wiki 默认清空固定菜单和底部操作。

`path` 用于表中支持自定义路径的页面类型；文章的永久链接使用 `permalink`，集合路径使用 `route.path`。`wiki_index.path: null` 停止生成 Wiki 列表；`notebooks.path: null` 只停止生成笔记本总列表，各 Notebook 的集合、标签和详情路由仍会生成。

`profiles.blog_index.listing_nav` 和 `profiles.wiki_index.listing_nav` 使用 `enabled/tabs`；默认分别 false/true，tabs 默认空，每项为 `title/url`。

`profiles.home.comments` 与 `profiles.error.comments` 都使用 `enabled/title/id/provider/options`，默认关闭、其它字段 null、options 空对象。设为 `enabled: true` 时默认继承全局评论 Provider，覆盖语义同[页面评论](/wiki/stellar/reference/front-matter/#评论)。

```yaml blog/_config.stellar.yml
profiles:
  error:
    comments:
      enabled: true
```

## 文章、笔记与设置页

| 字段 | 默认值 | 可选值与用途 |
| :--- | :--- | :--- |
| `article.style` | tech | tech / story |
| `article.paragraph_indent` | auto | auto / always / never |
| `article.listing.pinned_layout` | carousel | carousel / flat |
| `article.listing.card_layout` | hero | hero / classic |
| `article.listing.cover_ratio` | 2 | 正数 |
| `article.listing.excerpt_length` | 128 | 非负整数；0 禁用自动摘要 |
| `article.listing.show_tags` | false | boolean，卡片标签 |
| `article.category_colors` | 内置“探索号”配色 | 分类名到 CSS 颜色的映射 |
| `article.banner.ratio` | 2.5 | 正数 |
| `article.show_reading_time` | false | boolean |
| `article.related_posts_limit` | 0 | 非负整数；0 不显示相关文章 |
| `article.footer.license` | 默认 CC BY-NC-SA 4.0 文案 | string / false |
| `article.footer.share` | 全部内置服务 | 字符串数组，空数组隐藏 |
| `article.footer.show_tags` | true | boolean，文章页标签 |
| `profiles.notebook.listing.per_page` | null | 非负整数或 null；0 不分页，null 继承 Hexo |
| `profiles.notebook.listing.sort.field` | updated | date / updated / title |
| `profiles.notebook.listing.sort.direction` | desc | asc / desc |
| `profiles.notebook.listing.excerpt_length` | 128 | 非负整数 |
| `profiles.notebook.tag_icons` | `{}` | 标签到图标的映射 |
| `profiles.settings.about.items` | Hexo 与主题版本 | 数组，条目 `key/value/url`；value 与 url 支持主题变量 |

分享服务为 `wechat/weibo/x/telegram/whatsapp/email/link/system`。`profiles.notebook` 只配置 Notebook Collection 的列表默认值与标签图标，不接受 `footer`；Wiki、Topic、Notebook 的内容页脚在 Collection 或 Front Matter 中配置，默认继承 Article 许可协议并关闭分享。页面作者和 AI 标记见 Front Matter，它们不是主题 article 的全局字段。

## 外观

| 字段 | 默认／约束 |
| :--- | :--- |
| `appearance.preset` | card；card / glass / minimal / flat |
| `appearance.color_scheme` | auto；auto / light / dark |
| `appearance.colors.primary/accent/link` | CSS 颜色，具体值见默认配置 |
| `appearance.gradients.primary_action/search_bar` | CSS 渐变，具体值见默认配置 |
| `appearance.typography.font_family.body/code` | 字体列表；默认系统字体与 Menlo/Monaco/Consolas 等代码字体 |
| `appearance.typography.font_size.root/inline_code/code_block` | CSS 长度，默认 16px / 85% / 0.8125rem |
| `appearance.typography.content_align` | left；left / center / right / justify |
| `appearance.typography.heading_prefixes.h2/h3/h4/h5` | 字符串，默认分别为井号、等号、竖线、冒号 |
| `appearance.shape.corner` | superellipse(1.25)；round / scoop / bevel / notch / square / superellipse(...) |
| `appearance.shape.radius.card_large/card/card_small/bar` | CSS 长度，默认 24px / 16px / 12px / 12px |
| `appearance.shape.radius.image_large/image/image_small` | CSS 长度，默认 24px / 16px / 8px |
| `appearance.backgrounds.leftbar.type` | gradient；none / gradient / image |
| `appearance.backgrounds.leftbar.image` | 资源地址或 null，默认 null |
| `appearance.backgrounds.leftbar.gradient.light/dark` | 颜色数组，默认四种配色；整体替换 |
| `appearance.backgrounds.leftbar.opacity` | 0–1，默认 1 |
| `appearance.backgrounds.leftbar.backdrop.radius` | CSS 长度，默认 100px |
| `appearance.backgrounds.page.image` | 资源地址或 null，默认 null |
| `appearance.backgrounds.page.backdrop.radius/overlay/saturation` | 模糊、遮罩与饱和度，默认 100px / var(--bg-a75) / 300% |
| `appearance.code_block.scrollbar_width` | CSS 长度，默认 4px |
| `appearance.code_block.highlight_stylesheet` | 资源地址或 null，默认 Atom One Dark 样式表 |

## 搜索

| 字段 | 默认／约束 |
| :--- | :--- |
| `search.provider` | local；local / algolia / null（关闭） |
| `search.local.scope` | all；索引范围 all / post / page |
| `search.local.include_content` | true，是否索引正文 |
| `search.local.cache_ttl_seconds` | 86400，非负整数秒；0 不缓存 |
| `search.algolia` | 参数对象；`appId/apiKey/indexName` 默认 null |

## 评论

`comments.provider` 默认 null，可选 beaudar、utterances、giscus、twikoo、waline、artalk。`comments.title` 默认 null。各服务的参数填写在同名子对象中，并使用服务方原有的字段名；连接参数和操作步骤见[评论指南](/wiki/stellar/guides/comments/)。默认参数可查主题默认配置，账号信息和部署地址需要自行填写。

## 标签默认值

| 字段 | 默认／约束 |
| :--- | :--- |
| `tags.note.default_color/border` | 空字符串 / true |
| `tags.checkbox.interactive` | false |
| `tags.quot.<variant>.prefix/suffix` | 图标 ID 或 null；内置 default、hashtag、question |
| `tags.emoji.default_source` | blobcat，必须对应 sources 中的键 |
| `tags.emoji.sources` | 地址模板映射，使用 `{name}`；内置 twemoji、qq、aru、tieba、blobcat |
| `tags.icon.default_color` | accent |
| `tags.button.default_color` | theme |
| `tags.mark.default_color` | yellow |
| `tags.hashtag.default_color` | null |
| `tags.gallery.size` | mix；s / m / l / xl / mix |
| `tags.gallery.aspect_ratio` | square；original / square / portrait |

语法见[表达标签](/wiki/stellar/reference/tags/express/)、[数据标签](/wiki/stellar/reference/tags/data/)和[容器标签](/wiki/stellar/reference/tags/container/)。

## 浏览器功能

| 字段 | 默认／约束 |
| :--- | :--- |
| `features.color_scheme_switch.enabled` | false |
| `features.lazy_loading.transition/auto_aspect_ratio` | fade / true；transition 可选 blur/fade |
| `features.lightbox.enabled/selector` | true / `.timenode p>img` |
| `features.link_prefetch.enabled`、`features.reveal.enabled` | true |
| `features.card_hover.enabled`、`features.heti.enabled` | false |
| `features.math.provider` | null；katex / mathjax / null |
| `features.math.katex/mathjax` | 第三方参数对象，默认空对象 |
| `features.diagrams.provider` | null；mermaid / null |
| `features.diagrams.mermaid.theme` | neutral；default / dark / forest / neutral |

## 服务与资源

| 字段 | 默认／约束 |
| :--- | :--- |
| `services.site_info.provider` | site_info_api / null |
| `services.site_info.site_info_api.endpoint` | Site Info 公共接口，支持 `{href}` 占位 |
| `services.rating.provider`、`services.vote.provider` | star_vote / null |
| `services.rating.star_vote.endpoint`、`services.vote.star_vote.endpoint` | 评分、投票公共接口 |
| `services.contributors.provider` | github |
| `services.contributors.github.repositories` | 空数组；条目 `source_prefix/repository/branch`，branch 默认 main |
| `services.github_card.provider` | github_readme_stats |
| `services.github_card.github_readme_stats.endpoint` | GitHub Readme Stats 地址 |
| `services.github.api_url/raw_url/gist_url` | GitHub 官方 API、Raw、Gist 完整 HTTP(S) 地址 |
| `preconnect` | 空数组；资源 Origin 列表 |
| `fallbacks.avatar/link_card/cover` | 非空资源地址，默认主题占位资源；用于对应的头像、链接卡片或 SEO 图片 |
| `profiles.error.image` | 错误页插图资源地址，null 隐藏 |

默认 endpoint 的完整地址见[默认配置](https://github.com/xaoxuu/hexo-theme-stellar/blob/main/_config.yml)。这些备用图片不适用于所有卡片或 Brand；缺图时的显示方式见[行为参考](/wiki/stellar/reference/behavior/#图片与-Brand-来源)。

## SEO 与可信注入

| 字段 | 默认／约束 |
| :--- | :--- |
| `canonical.host` | null；主机名，null 不生成主题 canonical 并关闭主机检查 |
| `canonical.allowed_hosts` | `[localhost]`，备用主机列表 |
| `open_graph.enabled` | true |
| `open_graph.twitter_id` | null 或字符串 |
| `structured_data.same_as` | 空数组，外部身份 URL |
| `inject.head_end/body_end` | 空字符串，可信原始 HTML |

配置文件使用本页列出的字段。主题源码中的运行时对象和 camelCase 属性不直接用于 `_config.stellar.yml`。
