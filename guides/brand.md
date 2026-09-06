---
title: 站点名称与头像
date: 2023-12-06 21:55
updated: 2026-09-06 02:28
---

Brand 是显示名称、标语、头像和链接的区域，可以放在顶部或左侧。博客通常显示站点信息，Wiki 和笔记本则可显示各自的项目名称。

## 设置名称与头像

```yaml blog/_config.stellar.yml
leftbar:
  brand:
    style: regular
    image:
      src: /images/avatar.webp
      variant: avatar
    name: 山间来信
    tagline: 每个人的独立博客
    href: /
```

`image.variant` 支持 `avatar`（圆形头像）、`icon`（完整容纳）和 `plain`（原图）。Topbar 可使用同样的图片、名称、标语与链接字段；`style` 是 Leftbar 的配置。

## 站点来源与集合来源

Wiki 与 Notebook 默认从 Collection 的 `name/tagline/icon/route` 构建 Brand；Topic 默认沿用站点 Brand。Collection 可选择来源：

```yaml blog/source/_data/wiki/handbook.yml
name: 使用手册
leftbar:
  brand:
    source: site
    style: compact
```

要展示 Collection 身份及其返回、搜索入口：

```yaml blog/source/_data/topic/journey.yml
name: 城市漫游
leftbar:
  brand:
    source: collection
    style: regular
    back_button: true
    search: true
```

`source/back_button/search` 是 Collection 的 Leftbar Brand 字段。返回和集合搜索开关只适用于 `source: collection`；固定站点来源不使用这两个开关。

## 覆盖与隐藏

Brand 对象按字段覆盖，具体文字和图片字段的 `null` 表示隐藏该部分；`brand: false` 隐藏整个 Brand。Brand 文字不解析 HTML 或 Markdown 链接，链接写入 `href`。默认固定 Brand 不自动读取 Hexo 标题、头像或副标题。

Collection 未配置图片时使用无图样式或对应图标。仓库统计取自当前 Collection 的 `source.repository`，未配置仓库时隐藏。移动端主内容顶部与左侧栏中的 Brand 分别按各自布局显示。

站点名称与集合名称可以分别配置，字段定义见[主题配置](/wiki/stellar/reference/theme/#布局、Brand-与导航)和 [Collection 参考](/wiki/stellar/reference/collection/)。
