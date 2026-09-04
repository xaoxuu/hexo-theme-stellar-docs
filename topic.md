---
date: 2024-01-14 17:47
updated: 2026-09-05 00:05
title: 实现博客专栏/专题
---

专栏把一组博客文章组织为连续主题：文章仍存放在 `source/_posts/`，主题根据 `collection` 归属自动聚合和排序。

## 创建专栏

在 `source/_data/topic/` 中创建描述文件，文件名就是专栏 id：

```yaml blog/source/_data/topic/stellar.yml
name: Stellar
headline: Stellar 开发札记
tagline: 从设计到实现
description: 关于 Stellar 的设计、开发和版本更新。
icon: https://example.com/icon.svg
cover: https://example.com/card.webp
banner:
  image: https://example.com/banner.webp
listing:
  sort:
    field: date
    direction: desc
article:
  style: tech
leftbar:
  widgets: [recent]
rightbar:
  widgets: [toc]
```

- `name` 用于紧凑位置，`headline` 是专栏列表主标题。
- `icon` 是专栏的内容身份图标，不会自动改变 Brand。
- `cover` 是专栏列表中的最新文章卡片背景，不会传给专栏成员文章。
- `banner.image` 是专栏文章横幅的集合级默认图；页面 `banner` 可按字段覆盖。
- `listing.sort` 使用 `field: date|updated|title` 与 `direction: asc|desc`，默认按发布日期降序。

## 发布专栏文章

```yaml blog/source/_posts/20240114.md
---
title: 这是文章标题
collection:
  profile: topic
  id: stellar
cover: https://example.com/post-card.webp
tagline: 文章列表小字
---

文章正文
```

`collection.id` 必须对应 `source/_data/topic/stellar.yml` 的文件名。

专栏文章在博客首页、分类和标签等文章列表中继承全局 `content.article.listing.card_layout`。`hero` 布局还要求当前文章显式配置根级 `cover`；未配置时回退为无封面的 `classic` 卡片。专栏 YAML 中的根级 `cover` / `tagline` 仅用于专栏索引，不会作为成员文章的回退值；需要使用同一内容时，请在文章 Front Matter 中分别配置根级 `cover` / `tagline`。

## 专栏 Brand

专栏只是博客文章的组织方式。它默认继承目标 Region 的 Brand，专栏根级 `icon`、`name`、`tagline` 和路由不会自动生成 Brand。若要显示专栏专属 Brand，在目标 Region 显式覆盖：

```yaml blog/source/_data/topic/stellar.yml
name: Stellar
leftbar:
  brand:
    image:
      src: https://example.com/icon.svg
      variant: icon
    name: Stellar 开发札记
    tagline: 从设计到实现
    href: /topic/stellar/
  widgets: [related, recent]
```

Topbar 与 Leftbar 的 Brand 内容相互独立，不会跨栏回退。

## 展示逻辑

专栏索引页按各专栏最新文章的时间排序，无文章的专栏排在末尾。每个专栏先显示最新文章卡片，再列出其它文章；文章内部仍使用普通博客文章布局。

相比分类，专栏强调一组文章的整体主题和前后关系；相比 Wiki，专栏无需手动维护目录树，更适合持续增加的新文章。
