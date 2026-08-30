---
date: 2025-06-14 19:48
updated: 2026-08-27 22:49
title: 实现完整的笔记体系
collection:
  profile: wiki
  id: hexo-stellar
footer:
  references:
    - '[PR#464 @calfzhou](https://github.com/xaoxuu/hexo-theme-stellar/pull/464)'
---

笔记系统适合持续更新、按标签树组织的页面。一个站点可以有多个笔记本，一篇笔记只能属于一个笔记本。

## 创建笔记本

在 `source/_data/notebooks/` 中创建 YAML，文件名就是笔记本 id：

```yaml blog/source/_data/notebooks/dev-notes.yml
name: 开发笔记
headline: Development Notes
tagline: 持续整理的开发知识
description: 关于 Web、Node.js 和工具链的笔记。
identity:
  icon: /images/favicon.png
card:
  cover: https://example.com/notebook.webp
route:
  path: /notes/dev/
listing:
  order: 1
  excerpt_length: 128
  per_page: 10
  sort:
    field: updated
    direction: desc
navigation:
  menu: notes
footer:
  license: null
  share: []
regions:
  leftbar:
    widgets: [tagtree, recent]
note_defaults:
  regions:
    leftbar:
      widgets: [tagtree, recent]
    rightbar:
      widgets: [toc]
```

`listing.order` 控制笔记本列表顺序；`listing.per_page` 和结构化 `listing.sort` 控制笔记列表。`per_page: null` 继承 Hexo，`0` 关闭分页。`regions` 用于笔记本列表页，`note_defaults.regions` 用于具体笔记页。

笔记本的 Brand Widget 会从 `identity.icon`、`name`、`tagline` 和 `route.path` 生成自动 Brand；`card.cover` 不会作为 Brand 图片回退。是否显示以及放在哪个 Region，由 `brand` Widget 的位置决定。

主题级默认值写在：

```yaml blog/_config.stellar.yml
content:
  notebook:
    listing:
      excerpt_length: 128
      per_page: null
      sort:
        field: updated
        direction: desc
    tag_icons: {}
    footer:
      license: null
      share: null
```

## 创建笔记

笔记是普通页面，通过 `collection` 关联笔记本：

```yaml blog/source/notes/nodejs/index.md
---
title: Node.js 笔记
collection:
  profile: notebook
  id: dev-notes
tags:
  - knowledge/nodejs
  - tools
card:
  cover: https://example.com/note.webp
listing:
  priority: 5
---
```

嵌套标签使用 `/` 分隔，例如 `knowledge/math/probability`。标签树会根据所有笔记的 `tags` 自动生成。

`listing.priority > 0` 的笔记排在普通笔记之前，数字越大越靠前。不再接受 `pin`、`sticky` 或布尔值。

## 页面结构

- 笔记本列表页列出所有笔记本。
- 笔记本页按 `listing.sort.field` 和 `listing.sort.direction` 排序并分页列出笔记。
- 标签页只显示对应标签及其子标签的笔记。
- 笔记页优先展示更新时间，并可显示标签、许可协议和分享入口。

笔记卡片的 `card.cover` 只用于列表卡片，不参与博客文章的 `content.article.listing.card_layout`。搜索框会自动限定在当前笔记本的 `route.path`。
