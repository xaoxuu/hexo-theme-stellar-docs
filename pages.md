---
date: 2023-12-06 21:55
updated: 2026-08-22 00:12
title: 编写文章以及独立页面
collection:
  type: wiki
  id: hexo-stellar
---

Stellar v2 将页面外观与行为拆分到命名明确的对象中。Hexo 自带的 `title`、`date`、`tags`、`categories`、`description`、`excerpt` 等字段保持不变。

## 推荐模板

```yaml blog/scaffolds/post.md
---
title: {{ title }}
date: {{ date }}
tags: []
categories: []
description:
card:
  cover:
  tagline:
banner:
  image:
  headline:
  tagline:
listing:
  priority: 0
article:
  type: tech
  indent: false
  author:
  ai_label:
footer:
  references: []
  license: true
  share: true
comments:
  enabled: true
visibility:
  listed: true
  searchable: true
sidebar:
  left:
    widgets:
  right:
    widgets:
navigation:
  menu: post
  breadcrumb: true
mermaid:
katex:
mathjax:
---
```

不需要的对象可以整段删除，不要保留类型错误的空值。

## 列表卡片

`card` 只控制文章在首页、专栏、搜索等列表中的呈现：

```yaml
card:
  cover: https://example.com/card.webp
  tagline: 一行辅助文案
```

`card.tagline` 缺失时依次使用 `description`、`excerpt` 或正文摘要。主题不会用横幅图片或其它身份图标自动补 `card.cover`。

主题级卡片样式与自动摘要长度仍在 `_config.stellar.yml` 的 `article` 中配置：

```yaml
article:
  card_style: hero # hero | classic
  auto_excerpt: 200
```

## 内容页横幅

`banner` 只控制内容页顶部：

```yaml
banner:
  enabled: true
  image: https://example.com/banner.webp
  avatar: https://example.com/avatar.webp
  headline: 快速开始
  tagline: 页面顶部的一行说明
```

设置 `banner.enabled: false` 可关闭横幅。`banner.headline: ''` 可隐藏横幅主标题。横幅与卡片需要使用同一张图时，请分别显式配置 `card.cover` 和 `banner.image`。

## 文章排版和作者

```yaml
article:
  type: story # tech | story
  indent: true
  author: xaoxuu
  ai_label: reviewed # manual | reviewed | polished | generated
```

`tech` 是默认技术文章风格，`story` 会增加文字与段落间距。作者 id 对应 `_data/authors.yml`。

## 所属集合

页面使用同一组字段加入 Wiki、专栏或笔记本：

```yaml
collection:
  type: topic
  id: stellar
```

```yaml
collection:
  type: wiki
  id: hexo-stellar
```

```yaml
collection:
  type: notebook
  id: dev-notes
```

## 置顶和可见性

```yaml
listing:
  priority: 10
visibility:
  listed: true
  searchable: true
```

`listing.priority > 0` 才置顶，数字越大越靠前。`visibility.listed` 控制主题列表，`visibility.searchable` 控制站内搜索；两者可以分别设置。

## 导航和侧边栏

```yaml
navigation:
  menu: more
  breadcrumb: false
sidebar:
  left:
    widgets: [recent]
    search: false
    menu: true
    brand:
      image:
        src: https://example.com/icon.svg
        style: icon
      name: 关于本站
      tagline: 独立页面
      url: /about/
  right:
    widgets: [toc]
```

`navigation.menu` 对应 `menubar.items` 中的 id，用于高亮主菜单。`sidebar.left` 是页面左侧主导航栏，`sidebar.right` 是正文右侧辅助栏；`widgets` 必须写成数组。

手机端 Brand 栏由页面类型自动决定：主页和各类索引/列表页显示，文章、普通页面、集合内容页、归档、作者页和 404 隐藏，不提供页面开关。

## 参考资料、许可和分享

```yaml
footer:
  references:
    - '[参考资料](https://example.com)'
  license: '本文采用 CC BY-NC-SA 4.0 许可协议。'
  share: true
```

`footer.license: true` 沿用主题的文章许可文案，字符串则覆盖文案，`false` 隐藏。`footer.share` 控制分享入口。

## 评论

```yaml
comments:
  enabled: true
  title: 欢迎讨论
  id: shared-thread
  service: giscus
  giscus:
    data-repo: owner/repo
    data-mapping: specific
    data-term: shared-thread
```

`enabled: false` 关闭当前页面评论。Giscus、Twikoo、Waline 等服务对象保持上游字段名。

## 摘要与 Open Graph

正文开头与正文之间可使用 `<!-- more -->` 生成摘要。也可以直接配置 Hexo 的 `description` 或 `excerpt`。

```yaml
open_graph:
  image: https://example.com/social.webp
```

`open_graph` 属于现有 SEO 集成，字段格式保持插件约定。

## 独立页面

关于、友链等独立页面无需特殊布局。通过 `navigation.menu` 设置菜单高亮，再按需组合 Stellar 标签：

```yaml blog/source/about/index.md
---
title: 关于
navigation:
  menu: more
sidebar:
  left:
    widgets: [recent]
  right:
    widgets: [toc]
---
```

友链可以在任意页面通过友链标签插入，详见 {% link https://xaoxuu.com/wiki/stellar/tag-plugins/#友链标签 #友链标签 %}。
