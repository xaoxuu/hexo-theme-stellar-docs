---
date: 2023-12-06 21:55
updated: 2026-08-22 00:12
title: 如何使用文档系统
collection:
  type: wiki
  id: hexo-stellar
---

Stellar 的 Wiki 系统会将多个页面组织成一个项目，并根据项目配置生成列表卡片、项目首页 Hero、目录树、侧边栏和评论区。

## 创建项目

在 `source/_data/wiki/` 中创建项目文件，文件名就是项目 id：

```yaml blog/source/_data/wiki/hexo-stellar.yml
name: Stellar # 短名称
headline: 每个人的独立博客 # 卡片和 Hero 主标题
tagline: 基于 Hexo 的全能型个人知识库 # 一行辅助文案
description: Stellar 是一个内置文档系统的 Hexo 主题。
tags: [博客主题, 知识库]
audience: 独立博主

identity:
  icon: https://example.com/icon.svg
card:
  cover: https://example.com/card.webp
hero:
  enabled: true
  background:
    image: https://example.com/hero.webp
  preview:
    type: terminal
    commands:
      - label: npm
        codes: npm i hexo-theme-stellar
  actions:
    - title: 在线演示
      url: https://example.com
      icon: default:monitor

source:
  repository: xaoxuu/hexo-theme-stellar
  branch: main
routing:
  base_dir: /wiki/stellar/
listing:
  priority: 10
  sort: 1

sidebar:
  left:
    search:
      filter: /wiki/stellar/
      placeholder: 在 Stellar 中搜索
    widgets: [tree, related]
  right:
    widgets: [ghrepo, toc]
footer:
  license: true
  share: true
comments:
  enabled: true
  title: 欢迎讨论
  service: giscus
  giscus:
    data-repo: xaoxuu/hexo-theme-stellar
    data-mapping: number
    data-term: 226

tree:
  快速开始:
    - index
    - examples
  基本使用:
    - pages
    - sidebar
```

集合字段的语义边界如下：

- `name` 是面包屑等紧凑位置使用的短名称。
- `headline` 是 Wiki 卡片和 Hero 的主标题；缺失时使用 `name`。
- `tagline` 是卡片、自动 Brand 等位置的一行辅助文案。
- `description` 是较完整的项目说明，也用于 SEO 回退。
- `identity.icon` 只代表项目身份；`card.cover` 只用于列表卡片；`hero.background` 只用于项目首页 Hero。
- `audience` 是 Wiki 列表卡片中的适用对象。
- `listing.priority > 0` 进入置顶区域；`listing.sort` 控制普通 Wiki 项目顺序。

`tags` 必须是字符串数组，即使只有一项也写作 `[博客主题]`。v2 不再把错误的字符串类型自动转成数组。

## 关联页面

Wiki 页面通过统一的 `collection` 对象声明归属：

```yaml blog/source/wiki/stellar/index.md
---
title: 快速开始
collection:
  type: wiki
  id: hexo-stellar
---
```

`collection.type` 只能是 `wiki`、`topic` 或 `notebook`，`collection.id` 对应数据文件名。不再使用三个互斥的顶层字段。

## 上架 Wiki

在 `source/_data/wiki.yml` 中列出公开展示的项目 id：

```yaml blog/source/_data/wiki.yml
- hexo-stellar
- another-project
```

没有上架的项目仍可生成具体文档页，但不会出现在 Wiki 总列表。

## 路由和目录树

`routing.base_dir` 是目录项匹配的基础路径；`tree` 可以按分组对象或简单数组书写：

```yaml
routing:
  base_dir: /wiki/stellar/
tree:
  快速开始:
    - index
    - examples
  进阶:
    - advanced-settings
```

```yaml
routing:
  base_dir: /wiki/stellar/
tree:
  - index
  - examples
```

每个目录项都必须是字符串。未被 `tree` 收录、但属于该 Wiki 的有标题页面会进入额外分组。

## 项目首页 Hero

`hero.enabled: true` 只在项目首页启用全屏 Hero。背景图与动态效果可单独使用，也可叠加：

```yaml
hero:
  enabled: true
  background:
    image: https://example.com/hero.webp
    effect:
      type: galaxy
      options:
        density: 2
        starSpeed: 2
        hueShift: 140
        mouseInteraction: true
        disableAnimation: false
  preview:
    type: image
    src: https://example.com/preview.webp
    alt: 首页预览
  actions:
    - title: 在线演示
      url: https://example.com
      icon: default:monitor
```

`hero.background.effect.options` 是 React Bits Galaxy 的第三方参数袋，因此保留上游 `camelCase`。支持的字段包括：

```yaml
options:
  focal: [0.5, 0.5]
  rotation: [1, 0]
  starSpeed: 2
  density: 2
  hueShift: 140
  disableAnimation: false
  speed: 0.5
  mouseInteraction: true
  glowIntensity: 0.2
  saturation: 0.1
  mouseRepulsion: true
  repulsionStrength: 0.1
  twinkleIntensity: 0.1
  rotationSpeed: 0.1
  autoCenterRepulsion: 0
  transparent: true
```

这里不能写 `star_speed` 等 Stellar 风格别名。未知字段或错误类型会终止构建，而不是静默忽略。浏览器启用“减少动态效果”、不支持 WebGL 或动态层加载失败时，仅保留静态背景。

## GitHub 仓库与 README 首页

```yaml
source:
  repository: xaoxuu/hexo-theme-stellar
  branch: main
```

配置仓库后，GitHub 组件和 Hero 源码入口会使用该地址。如果项目首页正文为空，主题会读取仓库的 `README.md`；`branch` 缺失时使用仓库默认分支。正文非空时始终以本地内容为准。

## 侧边栏、页脚和评论

```yaml
sidebar:
  left:
    widgets: [tree, related]
    search:
      filter: /wiki/stellar/
      placeholder: 在 Stellar 中搜索
    wiki_home: true
  right:
    widgets: [ghrepo, toc]
footer:
  license: true
  share: true
comments:
  enabled: true
  title: 评论区仅供交流
  service: giscus
  giscus:
    data-repo: owner/repo
```

`sidebar.left` 表示页面左侧主导航栏，`sidebar.right` 表示正文右侧辅助栏。两侧的 `widgets` 都必须是数组。评论服务对象保持第三方字段原样。

集合未配置 `sidebar.left.brand` 时，主题会用 `identity.icon`、`name`、`tagline` 和 Wiki 首页生成自动 Brand；缺少身份图标时只使用主题默认项目图，不会拿 `card.cover` 或 Hero 背景代替。

## 修改 Wiki 总路径

Wiki 索引路径属于主题站点结构配置：

```yaml blog/_config.stellar.yml
site_tree:
  index_wiki:
    base_dir: wiki
```

项目自己的内容路径仍由各自的 `routing.base_dir` 决定。
