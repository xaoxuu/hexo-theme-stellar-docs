---
title: Collection 配置
date: 2026-09-05 20:49
updated: 2026-09-06 15:51
---

Collection 文件位于 `source/_data/wiki/`、`source/_data/topic/` 或 `source/_data/notebooks/`。文件路径提供 profile，文件名提供 ID；`name` 是必填非空名称。只需填写当前集合要修改的配置，其余值由主题提供。

## 基本信息、路径与展示

| 字段 | 类型／默认 | 适用范围与行为 |
| :--- | :--- | :--- |
| `name` | 非空 string，必填 | 全部；集合名称 |
| `headline/tagline/description/audience` | string / null | 全部；标题、辅助文案、描述及受众 |
| `tags` | string array，省略为空 | 全部；集合分类信息 |
| `icon/cover` | string / null | 身份图标与集合列表封面 |
| `route.path` | string，省略由 profile 与 ID 派生 | 集合路径，规范化为相对路径 |
| `route.start` | string / null | 仅 Topic，入口文章 |
| `navigation.tree` | array / object | 仅 Wiki，页面键列表或分组树 |
| `listing.priority` | 非负整数 / null | 仅 Wiki 集合；在支持置顶的列表中使用 |
| `listing.order` | 非负整数 / null | Wiki、Notebook；当前 Wiki 书架另按 shelf 顺序 |
| `listing.excerpt_length` | 非负整数 / null | Topic、Notebook，0 关闭自动摘要 |
| `listing.per_page` | 非负整数 / null | 仅 Notebook，0 不分页，null 继承 Hexo |
| `listing.sort.field/direction` | date/updated/title；asc/desc，可省略 | Topic、Notebook；默认分别 date desc、updated desc |
| `visibility.listed/searchable` | boolean，默认 true | 全部；控制集合上架及成员的列表／搜索默认值，不删除路由 |

没有集合封面时不跨字段使用 `icon` 或横幅补齐；成员文章的根级 `cover/tagline` 也不继承集合对应字段。

## Hero 与横幅

`hero` 仅用于 Wiki：

| 字段 | 类型与用途 |
| :--- | :--- |
| `hero.enabled` | boolean / null，是否启用首页 Hero |
| `hero.background.image` | string / null，背景图片 |
| `hero.background.effect` | object / null，注册效果；当前为 `type: galaxy`，`options` 为效果参数 |
| `hero.background.effect.runtime` | `pause_when_hidden/respect_reduced_motion` 可选 boolean；运行时策略 |
| `hero.preview.type` | terminal / image |
| `hero.preview.src/alt` | 图片地址与替代文字 |
| `hero.preview.commands` | 数组，条目 `label/codes` |
| `hero.actions` | 数组，条目 `title/url/icon` |

Wiki、Topic、Notebook 等集合都支持内容横幅 `banner.enabled/image/avatar/headline/tagline`，分别是 boolean/null 与 string/null。页面按字段覆盖集合横幅。Hero、集合封面、图标与内容横幅互不替代。

## Region 与 Brand

顶部栏、左侧栏、右侧栏（Region）使用 `enabled/widgets`，Topbar 和 Leftbar 还支持 `brand/menu`，Leftbar 支持 `footer.actions`。它们沿用[主题结构](/wiki/stellar/reference/theme/#布局、Brand-与导航)，但作为局部覆盖：省略继承，数组整体替换，`[]` 清空。

Collection 的 `leftbar.brand` 额外支持 `source: site/collection`、`back_button`、`search`。Wiki/Notebook 默认来源是 collection，Topic 默认 site；返回与集合搜索开关只在 collection 来源有效。`style: regular/compact` 与来源独立。Brand 整体可为 false 或 null；null 继承，false 隐藏。具体字段 null 隐藏对应内容。

## 成员默认值

| 配置域 | 字段 | 来源与默认 |
| :--- | :--- | :--- |
| 导航 | `active_menu`、`breadcrumb` | 菜单 ID/null、boolean/null；导航按页面类型及集合上下文生成 |
| 排版 | `article.style/paragraph_indent/author/ai_label` | 继承主题排版；作者/AI 标记由集合或页面指定 |
| 页脚 | `footer.references/license/share/show_tags` | 许可协议和标签继承 Article；分享默认关闭；页面可覆盖 |
| 评论 | `comments.enabled/title/id/provider/options` | 继承全局服务，可按集合或页面替换 |
| 源码 | `source.repository/branch` | string/null；GitHub owner/repo 与分支 |
| 可见性 | `visibility.listed/searchable` | Collection 值是成员默认；Page 可再覆盖 |

具体取值见 [Front Matter](/wiki/stellar/reference/front-matter/)，它与 Collection 共用这些内容覆盖结构。对象逐字段覆盖并不意味着所有 null 都有相同效果，详见[行为规则](/wiki/stellar/reference/behavior/#配置覆盖顺序与空值)。

Wiki、Topic、Notebook Collection 的 `footer.share` 默认关闭。设置 `true` 会恢复全局 `article.footer.share`，数组显式选择服务，`false` 或 `[]` 关闭；许可协议同样可用 `true` 恢复全局 Article 文案。Collection 的 `visibility.listed: false` 会隐藏集合总入口，并成为成员页的默认列表状态；`searchable: false` 成为成员页的默认搜索状态。页面可以显式改回 `true`，详情路由仍然生成。

## 各集合类型支持的功能

| Profile | Collection 专属能力 | 成员页面可置顶 |
| :--- | :--- | :--- |
| Wiki | Hero、目录树、listing.priority/order | 否 |
| Topic | route.start、listing.excerpt_length/sort | 是 |
| Notebook | listing.order/excerpt_length/per_page/sort | 是 |

配置项需要符合所属集合类型。例如，Notebook 不能使用 Wiki 的 Hero；即使 YAML 格式正确，Doctor 和站点生成仍会报错。`visibility` 是三类 Collection 的共享字段；`render`、`seo`、`inject` 只能写在页面中。
