---
title: Wiki 文档
date: 2023-12-06 21:55
updated: 2026-09-30 15:49
---

Wiki 通过目录组织一组页面，适合产品手册、项目文档和长期维护的专题。目录顺序由你指定，可以按阅读需要分组。

如果你更想按标签自动整理内容、无需手工维护目录，可以改用[笔记本](/wiki/stellar/guides/notebook/)。

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

图片支持站点相对路径或可访问的完整 URL。项目展示墙中的卡片封面使用根级 `cover`，普通 Wiki 内容页横幅使用页面自身的 `cover`，它们不会替代 Hero 背景。

### 视频与动态效果

除静态图片外，`hero.background` 还支持视频和 `ferrofluid`、`light-rays`、`galaxy`、`strands` 四种动态效果。

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    image: /images/wiki-poster.webp
    video: /videos/wiki-hero.mp4
    parallax: 0.2
```

`video` 接受站点资源路径或完整 URL，以静音、循环、自动播放和行内播放方式显示，并优先于动态效果；作为 poster 的 `image` 同时用作底图。`parallax` 默认 0.2，范围 0–1，设为 0 关闭滚动位移。动态效果在 `hero.background.effect.type` 中选择，`options` 调整参数，省略时使用默认值；图片可与效果叠加，显示在效果下方。效果的全部参数、默认值、运行时策略和图片叠加规则见 [Collection 参考](/wiki/stellar/reference/collection/#Hero-背景效果)。

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
