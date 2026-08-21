---
date: 2023-12-06 21:55
updated: 2026-08-22 00:56
title: 侧边栏配置
collection:
  type: wiki
  id: hexo-stellar
---

Stellar v2 统一使用 `sidebar.left` 和 `sidebar.right`：

- `sidebar.left` 是页面左侧主导航栏，通常放 Brand、菜单、搜索和内容导航组件。
- `sidebar.right` 是正文右侧辅助栏，通常放目录、仓库信息等与当前内容相关的组件。

`list`、`content` 只能描述内容类型，无法说明实际位置，因此不作为配置名。

## 站点默认侧边栏

各页面类型的默认组件在 `_config.stellar.yml` 的 `site_tree` 中配置：

```yaml blog/_config.stellar.yml
site_tree:
  home:
    sidebar:
      left:
        widgets: [welcome, recent]
      right:
        widgets: []
  post:
    navigation:
      menu: post
    sidebar:
      left:
        widgets: [recent]
      right:
        widgets: [toc]
  wiki:
    navigation:
      menu: wiki
    sidebar:
      left:
        widgets: [tree, related]
      right:
        widgets: [toc]
  page:
    sidebar:
      left:
        widgets: [recent]
      right:
        widgets: [toc]
```

`widgets` 必须是数组。即使只有一个组件也写成 `[toc]`，清空则写 `[]`。

## 页面覆盖

页面 Front-matter 可以覆盖默认侧边栏：

```yaml
sidebar:
  left:
    widgets: [recent]
    search: false
    menu: true
    wiki_home: true
  right:
    widgets: [toc]
```

`search` 可以是布尔值，也可以配置当前页面的搜索范围：

```yaml
sidebar:
  left:
    search:
      filter: /wiki/stellar/
      placeholder: 在 Stellar 中搜索
```

`menu` 控制左侧主菜单，`wiki_home` 控制 Wiki 项目中的“全部文档”返回入口。

## 集合覆盖

Wiki、专栏和笔记本的 YAML 也使用相同结构，作用于集合内所有页面：

```yaml
sidebar:
  left:
    widgets: [tree, related]
    search:
      filter: /wiki/stellar/
      placeholder: 在 Stellar 中搜索
  right:
    widgets: [ghrepo, toc]
```

优先级从高到低为：页面 Front-matter、集合 YAML、`site_tree` 页面类型默认值。

## 左侧 Brand

站点全局使用主题根级 `brand`。页面或集合需要覆盖时，使用 `sidebar.left.brand`：

```yaml
sidebar:
  left:
    brand:
      image:
        src: https://example.com/icon.svg
        style: icon
      name: Stellar
      tagline: 每个人的独立博客
      url: /wiki/stellar/
```

`image.style` 有三种明确语义：

- `avatar`：正圆裁剪并填满，可继续使用头像旋转背景效果。
- `icon`：圆角矩形、完整容纳图片。
- `plain`：不裁剪、不设圆角、不填背景，适合透明底品牌图。

图片背景默认透明，只有 `avatar` 和 `icon` 可以通过 `image.background` 显式配置。`image.url` 控制图片链接，Brand 根级 `url` 控制名称链接。

`image` 是原子对象：只要覆盖就必须同时写 `src` 与 `style`，不会继承上级图片的其它字段。名称允许受信任的内联 HTML，但不再解析 Markdown 链接。

Wiki 与 Notebook 未显式配置 Brand 时，会从 `identity.icon`、`name`、`tagline` 和集合首页自动生成；图标缺失时使用主题默认项目图，不会用 `card.cover` 等其它图片代替。Topic 默认完整继承站点 Brand；只有主动配置 `sidebar.left.brand` 时才覆盖。

## 常用组件

左侧常见组件：

- `recent`：近期文章或页面。
- `tree`：Wiki 目录树。
- `tagtree`：笔记本标签树。
- `related`：按共享标签分组显示相关 Wiki 项目，每个条目包含项目名称和说明。
- 自定义 widget id。

右侧常见组件：

- `toc`：当前页面目录。
- `ghrepo`：GitHub 仓库信息。
- `ghissues`：GitHub Issues。

组件自身的参数在主题 `widgets` 配置中维护，详见《侧边栏组件的配置与使用》。

## 移动端 Brand 栏

手机端 Brand 由页面类型自动显示：

- 显示：主页、分类/标签页面与索引、专栏/Wiki/笔记本索引、笔记列表。
- 隐藏：文章、普通页面、Wiki/Topic/Notebook 内容页、归档、作者页和 404。

不提供页面或集合级开关。
