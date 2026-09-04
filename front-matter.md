---
date: 2025-07-06 13:34
updated: 2026-09-05 00:05
title: front-matter 全部字段索引
---

Stellar v2 将页面配置按作用域分组。主题自有字段统一使用 `snake_case`；JavaScript API 使用 `camelCase`；CSS class 与文件名使用 `kebab-case`。第三方配置对象是例外，例如 Giscus 的 `data-repo` 和 React Bits Galaxy 的 `starSpeed`，必须保持上游原始字段名。

v2 不读取 v1 别名。发现旧字段、未知字段或错误类型时，构建会直接报出文件路径和字段路径。

## Hexo 内置字段

`layout`、`title`、`date`、`updated`、`tags`、`categories`、`permalink`、`excerpt`、`lang`、`published`、`disableNunjucks` 等字段仍遵循 [Hexo Front-matter](https://hexo.io/zh-cn/docs/front-matter)。Stellar 不重命名这些上游字段。

## Stellar 页面字段

| 字段 | 作用 |
| :-- | :-- |
| `collection` | 页面所属的 Wiki、专栏或笔记本；唯一候选可省略 |
| `cover/tagline` | 列表卡片的封面和辅助文案 |
| `banner` | 内容页顶部横幅 |
| `topbar/leftbar/rightbar` | 三个 Region 及其 Brand、Menu、Actions 与 Widget 覆盖 |
| `active_menu/breadcrumb` | 菜单高亮和面包屑 |
| `article` | 文章排版、作者和 AI 标记 |
| `footer` | 参考资料、许可协议和分享 |
| `comments` | 评论开关、评论区标识和服务覆盖 |
| `visibility` | 列表与站内搜索可见性 |
| `listing` | 列表排序权重 |
| `source` | 页面关联的源码仓库 |
| `render/seo/inject` | 数学、图表、Open Graph 与可信注入 |

完整示例：

```yaml
---
title: 页面标题
collection:
  profile: topic # wiki | topic | notebook
  id: example
cover: https://example.com/card.webp
tagline: 列表卡片的一行小字
banner:
  enabled: true
  image: https://example.com/banner.webp
  avatar: https://example.com/avatar.webp
  headline: 页内主标题
  tagline: 横幅辅助文案
topbar:
  enabled: true
  brand:
    name: Stellar
    href: /wiki/stellar/
  menu: []
  widgets: [spacer, menu]
leftbar:
  widgets: [recent]
rightbar:
  widgets: [toc]
active_menu: docs
breadcrumb: true
article:
  style: tech # tech | story
  paragraph_indent: never
  author: xaoxuu
  ai_label: reviewed
footer:
  references:
    - '[参考资料](https://example.com)'
  license: null
  share: true
comments:
  enabled: true
  title: 欢迎讨论
  id: shared-thread
  provider: giscus
  options: # 第三方字段保持 Giscus 原样
    data-repo: owner/repo
    data-mapping: specific
    data-term: shared-thread
visibility:
  listed: true
  searchable: true
listing:
  priority: 10
source:
  repository: owner/repo
  branch: main
---
```

## 图片字段的边界

| 字段 | 生效位置 | 不承担的职责 |
| :-- | :-- | :-- |
| `cover` / `tagline` | 当前 Collection 或内容在列表中的封面与小字 | 不作为内容页横幅或项目图标 |
| Collection / Page `banner.image` | 内容页顶部横幅；Page 按字段覆盖 Collection | 不作为列表卡片封面 |
| Collection `icon` | 集合配置中的项目/专栏/笔记本身份图标 | 不作为封面兜底 |
| `hero.background.image` | 集合首页 Hero 背景 | 不影响普通内容页 |

Brand 图片不属于上述内容资源。Topbar 与 Leftbar 分别使用自己的 `brand` 对象，页面或集合可在目标 Region 中按字段覆盖，也可设为 `false` 整体隐藏。Wiki 与 Notebook 未显式配置 Leftbar Brand 时，会从 Collection 的 `name/tagline/icon/route` 生成；Topic 继续使用站点 Brand。

主题不会跨语义字段猜测。例如 Front Matter 缺少根级 `cover` 时，不会拿 Collection `cover`、`icon` 或 `banner.image` 自动充当文章封面。

## 可见性与置顶

`visibility.listed: false` 表示不进入主题列表，`visibility.searchable: false` 表示不进入站内搜索。两者彼此独立。

`listing.priority` 是有限数字；大于 `0` 才参与置顶，数字越大越靠前，`0` 表示不置顶。不再接受 `pin`、`sticky` 或布尔值。它只适用于 Post、Topic 与 Notebook 页面，Wiki 和普通 Page 不接受这个无效果组合。

## Collection 能力边界

| Profile | Collection 专属字段 |
| :-- | :-- |
| Wiki | `listing.priority/order`、`navigation.tree`、`hero` |
| Topic | `listing.excerpt_length/sort`、`route.start` |
| Notebook | `listing.order/excerpt_length/per_page/sort` |

三类 Collection 都支持 `route.path`、`banner`、三个 Region、`active_menu/breadcrumb`、`article/footer/comments/source`。Schema 会按 `_data/wiki`、`_data/topic` 或 `_data/notebooks` 的所属 profile 拒绝没有消费者的组合；页面则在归属推导后执行对应约束。

## 评论与第三方字段

页面级评论开关写作 `comments.enabled`，不再接受 `comments: false`。页面要覆盖服务时使用 `comments.provider/options`，`options` 内保持服务原始字段名。

## 第三方渲染插件

`mathjax`、`katex`、`mermaid` 等字段来自相应插件或主题既有集成，继续保持其原始名称。
