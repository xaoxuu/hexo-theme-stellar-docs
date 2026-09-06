---
title: Wiki 文档
date: 2023-12-06 21:55
updated: 2026-09-06 22:41
---

Wiki 通过目录组织一组页面，适合产品手册、项目文档和长期维护的专题。目录顺序由你指定，可以按阅读需要分组。

如果你更想按标签自动整理内容，而不是手工维护目录，可以改用[笔记本](/wiki/stellar/guides/notebook/)。

## 创建文档项目

先创建项目描述。文件名 `handbook` 会成为这套文档的 ID：

```yaml blog/source/_data/wiki/handbook.yml
name: 使用手册
route:
  path: /wiki/handbook/
navigation:
  tree:
    开始使用:
      - index
      - install
```

创建 `source/wiki/handbook/index.md` 与 `install.md`，各自填写标题和正文：

```markdown blog/source/wiki/handbook/index.md
---
title: 欢迎使用
---

从安装开始了解这个项目。
```

页面在标准目录中且归属唯一时，可以省略 `collection`。自定义目录或需要消歧时显式填写 `collection.profile: wiki` 和 `collection.id: handbook`。

## 目录与上架

`navigation.tree` 的条目是页面键，省略 `.md`；对象键是目录分组。`route.path` 决定项目路由。目录项和实际文件应保持一致。

Wiki 总列表的上架分组位于 `source/_data/wiki.yml`：

```yaml blog/source/_data/wiki.yml
shelf:
  项目文档: [handbook]
```

当前首页书架按 `shelf` 声明的 ID 顺序展示，不应把 `listing.order` 当成书架自动排序开关。详见[排序规则](/wiki/stellar/reference/behavior/#排序与可见性)。

## 项目首页 Hero

```yaml blog/source/_data/wiki/handbook.yml
name: 使用手册
route:
  path: /wiki/handbook/
navigation:
  tree: [index, install]
hero:
  enabled: true
  background:
    image: /images/wiki-hero.webp
  preview:
    type: terminal
    commands:
      - label: 安装
        codes: npm install your-package
  actions:
    - title: 源码
      url: https://github.com/owner/repo
      icon: default:github
```

Hero 仅适用于 Wiki 项目首页。

### 背景图片

只需要静态背景时，配置 `hero.background.image`：

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    image: /images/wiki-hero.webp
```

图片支持站点相对路径或可访问的完整 URL。项目展示墙中的卡片封面使用根级 `cover`，普通 Wiki 内容页横幅使用 `banner.image`，它们不会替代 Hero 背景。

### 动态效果

当前内置 `ferrofluid`、`light-rays` 和 `galaxy` 三种效果。在 `hero.background.effect.type` 中选择效果，通过同级 `options` 调整参数；省略 `options` 时使用全部默认值。背景图片与动态效果可以同时配置，此时图片显示在动态效果下方。

#### Ferrofluid

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: ferrofluid
      options:
        colors: ['#ffffff', '#06B6D4', '#E0F2FE']
        backgroundColor: '#03010A'
        flowDirection: down
        mouseInteraction: true
```

Ferrofluid 显示流动的磁流体轮廓，可使用最多八种颜色，并在鼠标附近产生磁性扰动。

#### Light Rays

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: light-rays
      options:
        raysOrigin: top-center
        raysColor: '#00ffff'
        raysSpeed: 1.5
        lightSpread: 0.8
        rayLength: 1.2
        followMouse: true
        mouseInfluence: 0.1
        noiseAmount: 0.1
        distortion: 0.05
```

Light Rays 显示从指定方向投射的体积光束，并可跟随鼠标改变方向。

#### Galaxy

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: galaxy
      options:
        starSpeed: 2
        density: 2
        hueShift: 140
        mouseInteraction: true
        mouseRepulsion: true
```

Galaxy 显示具有纵深移动、辉光和鼠标排斥交互的星场。三种效果的全部参数、默认值、运行时策略和图片叠加规则见 [Collection 参考](/wiki/stellar/reference/collection/#Hero-背景效果)。

## 仓库与 README

```yaml blog/source/_data/wiki/handbook.yml
name: 使用手册
source:
  repository: owner/repo
  branch: main
route:
  path: /wiki/handbook/
navigation:
  tree: [index]
```

项目可关联 GitHub 仓库，供仓库统计、贡献者和 README 等能力使用。存在本地首页时优先显示本地内容。使用远程 README 作为首页时，内容能否显示还取决于仓库地址和网络连接。

## 用 Wiki 整理简易笔记

少量页面可以把 `route.path` 设为 `/notes/` 并手工维护目录。标准 Wiki 命名空间外的页面建议显式声明 Collection；不要在已有 Notebook 使用的路由上重复创建 Wiki。

目录链接不正确时，检查 `navigation.tree` 中的页面键与实际文件是否一致。侧栏设置见[布局与导航](/wiki/stellar/guides/layout/)。
