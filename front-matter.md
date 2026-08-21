---
date: 2025-07-06 13:34
updated: 2026-08-22 00:12
title: front-matter 全部字段索引
collection:
  type: wiki
  id: hexo-stellar
---

Stellar v2 将页面配置按作用域分组。主题自有字段统一使用 `snake_case`；JavaScript API 使用 `camelCase`；CSS class 与文件名使用 `kebab-case`。第三方配置对象是例外，例如 Giscus 的 `data-repo` 和 React Bits Galaxy 的 `starSpeed`，必须保持上游原始字段名。

v2 不读取 v1 别名。发现旧字段、未知字段或错误类型时，构建会直接报出文件路径和字段路径。

## Hexo 内置字段

`layout`、`title`、`date`、`updated`、`tags`、`categories`、`permalink`、`excerpt`、`lang`、`published`、`disableNunjucks` 等字段仍遵循 [Hexo Front-matter](https://hexo.io/zh-cn/docs/front-matter)。Stellar 不重命名这些上游字段。

## Stellar 页面字段

| 字段 | 作用 |
| :-- | :-- |
| `collection` | 页面所属的 Wiki、专栏或笔记本 |
| `card` | 列表卡片的封面和辅助文案 |
| `banner` | 内容页顶部横幅 |
| `sidebar` | 左右侧边栏 |
| `navigation` | 菜单高亮和面包屑 |
| `article` | 文章排版、作者和 AI 标记 |
| `footer` | 参考资料、许可协议和分享 |
| `comments` | 评论开关、评论区标识和服务覆盖 |
| `visibility` | 列表与站内搜索可见性 |
| `listing` | 列表排序权重 |
| `source` | 页面关联的源码仓库 |

完整示例：

```yaml
---
title: 页面标题
collection:
  type: wiki # wiki | topic | notebook
  id: hexo-stellar
card:
  cover: https://example.com/card.webp
  tagline: 列表卡片的一行小字
banner:
  enabled: true
  image: https://example.com/banner.webp
  avatar: https://example.com/avatar.webp
  headline: 页内主标题
  tagline: 横幅辅助文案
sidebar:
  left:
    widgets: [tree, related]
    search:
      filter: /wiki/stellar/
      placeholder: 在 Stellar 中搜索
    menu: true
    wiki_home: true
    brand:
      image:
        src: https://example.com/icon.svg
        style: icon
      name: Stellar
      tagline: 每个人的独立博客
      url: /wiki/stellar/
  right:
    widgets: [toc]
navigation:
  menu: docs
  breadcrumb: true
article:
  type: tech # tech | story
  indent: false
  author: xaoxuu
  ai_label: reviewed
footer:
  references:
    - '[参考资料](https://example.com)'
  license: true
  share: true
comments:
  enabled: true
  title: 欢迎讨论
  id: shared-thread
  service: giscus
  giscus: # 第三方字段保持 Giscus 原样
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
| `card.cover` | 首页、专栏、Wiki、笔记等列表卡片 | 不作为内容页横幅或项目图标 |
| `banner.image` | 文章和独立页面顶部横幅 | 不作为列表卡片封面 |
| `identity.icon` | 集合配置中的项目/专栏/笔记本身份图标 | 不作为封面兜底 |
| `hero.background.image` | 集合首页 Hero 背景 | 不影响普通内容页 |

Brand 图片不属于上述内容资源。站点使用根级 `brand`，页面或集合使用 `sidebar.left.brand`。其中 `brand.image` 必须完整提供 `src` 和 `style`，覆盖时不会继承上级图片字段。

主题不会跨语义字段猜测。例如缺少 `card.cover` 时，不会拿 `identity.icon` 自动充当封面。

## 可见性与置顶

`visibility.listed: false` 表示不进入主题列表，`visibility.searchable: false` 表示不进入站内搜索。两者彼此独立。

`listing.priority` 是有限数字；大于 `0` 才参与置顶，数字越大越靠前，`0` 表示不置顶。不再接受 `pin`、`sticky` 或布尔值。

## 评论与第三方字段

页面级评论开关写作 `comments.enabled`，不再接受 `comments: false`。评论服务自己的配置放在 `comments.giscus`、`comments.twikoo` 等对象中，并保持服务原始字段名。

## 第三方渲染插件

`mathjax`、`katex`、`mermaid` 等字段来自相应插件或主题既有集成，继续保持其原始名称。
