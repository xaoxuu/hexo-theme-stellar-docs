---
title: Widget 组件
date: 2023-12-06 21:55
updated: 2026-09-06 02:47
---

目录、文档树、最近更新、仓库信息、自定义文案和动态列表，都可以作为 Widget 放进 Topbar、Leftbar 或 Rightbar。一个 Widget 是否显示，同时取决于实例定义、所在 Region、当前页面上下文和数据是否可用。

Leftbar 的 Brand、菜单、底部操作和设置入口属于固定区域，不放进 `leftbar.widgets`。其中 Brand、菜单和底部操作分别由 `leftbar.brand`、`leftbar.menu`、`leftbar.footer.actions` 配置；本页介绍的是可排列的内容 Widget。

## 两步添加一个 Widget

先在站点的 `source/_data/widgets.yml` 中声明实例：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎
  content: |
    这里记录我的阅读与生活。

    [关于本站](/about/)
```

再在需要的 Region 中引用实例 ID：

```yaml blog/_config.stellar.yml
profiles:
  home:
    leftbar:
      widgets: [welcome, recent]
```

`welcome` 是实例 ID，可以自行命名；`layout: markdown` 选择主题提供的渲染方式。`recent` 是主题已经声明的默认实例，因此可以直接引用。

## 决定显示在哪些页面

Region 可以在四个配置层级设置，后面的层级只影响更具体的页面：

| 配置层级 | 写入位置 | 适合用途 |
| :--- | :--- | :--- |
| 站点全局 | `_config.stellar.yml` 根级 `topbar/leftbar/rightbar` | 每类页面都要使用的组件 |
| Profile | `_config.stellar.yml` 的 `profiles.<profile>` | 文章、Wiki、Notebook 等一类页面的默认布局 |
| Collection | `source/_data/wiki/`、`source/_data/topic/` 或 `source/_data/notebooks/` | 某个 Wiki、专栏或笔记本 |
| Page | Markdown Front Matter | 单篇文章或页面 |

例如为所有文章设置右栏，同时让某一篇文章只显示较浅的目录：

```yaml blog/_config.stellar.yml
profiles:
  post:
    rightbar:
      widgets: [ghrepo, toc]
```

```yaml blog/source/_posts/example.md
---
title: 示例文章
rightbar:
  widgets:
    - override: toc
      max_depth: 3
---
```

级联顺序是“站点全局 → Profile → Collection → Page”。最后一个明确写出的 `widgets` 数组整体替换上层数组，并不会追加：省略表示继承，`widgets: []` 表示清空内容 Widget。`enabled: false` 会关闭整个 Region；对于 Leftbar，单纯清空 `widgets` 不会删除固定 Brand、菜单和设置入口。完整规则见[配置覆盖顺序与空值](/wiki/stellar/reference/behavior/#配置覆盖顺序与空值)。

## 复用、改写和删除实例

Region 的 `widgets` 数组支持三种写法：

```yaml blog/source/about/index.md
rightbar:
  widgets:
    # 直接引用 Catalog 中已有的实例
    - toc

    # 引用已有实例，并只为这次使用覆盖参数
    - override: toc
      max_depth: 3
      collapse: true

    # 不写入 Catalog，只创建一个当前页面使用的匿名实例
    - layout: markdown
      title: 阅读提示
      content: 可以通过目录快速找到章节。
```

`override` 不会改动其它页面使用的原实例。同一个实例 ID 可以在不同 Region 重复引用，每次都会生成独立实例；内联的 `presentations` 不能扩大 layout 原本支持的位置。

站点 `widgets.yml` 会按实例 ID 覆盖主题默认定义。只写需要修改的字段即可；设置为 `null` 可以移除默认实例：

```yaml blog/source/_data/widgets.yml
recent:
  limit: 5

tagcloud: null
```

移除后仍在 Region 中引用该 ID，会得到未知实例警告并跳过渲染。

## 按用途选择组件

主题内置 13 个内容 layout，完整清单如下；`latest_comment` 是基于 `timeline` 的内置 Catalog 实例。具体参数和位置能力见[Widget 配置参考](/wiki/stellar/reference/widgets/)。

| 用途 | Layout／实例 | 显示条件 |
| :--- | :--- | :--- |
| 当前正文导航 | `toc` | 根据正文标题生成；也负责回到顶部和评论入口 |
| Wiki 文档导航 | `tree` | 只在 Wiki Collection 中生成文档树 |
| Notebook 标签导航 | `tagtree` | 只在 Notebook 列表页或内容页生成标签树 |
| 最近内容 | `recent` | Wiki 显示最近更新文档，Notebook 显示相应笔记，其它页面显示文章 |
| 集合相关内容 | `related` | Topic 显示同专栏文章；Wiki 显示相关项目；普通文章不会生成内容 |
| GitHub 数据 | `ghrepo`、`ghissues`、`ghuser` | 前两者需要当前页面或 Collection 提供仓库，用户卡片需要用户名 |
| 作者与标签 | `author`、`tagcloud` | 作者来自 `authors.yml`；标签云来自站点标签数据 |
| 自定义内容 | `markdown`、`linklist` | 显示本地或远程 Markdown、链接列表或网格 |
| 动态列表 | `timeline`、`latest_comment` | 需要浏览器能访问对应 API；`latest_comment` 是预定义的 timeline 实例 |

Topbar 还支持 3 个不需要写进 `widgets.yml` 的系统 Widget：`menu`、`settings` 和 `spacer`；内容 layout `toc` 也支持放在 Topbar。例如：

```yaml blog/_config.stellar.yml
topbar:
  enabled: true
  menu:
    - id: post
      title: menu.blog
      url: /
  widgets: [spacer, menu, settings]
```

`menu` 使用当前 Topbar 的 `menu` 数据，`spacer` 占据剩余横向空间，`settings` 打开设置页。Leftbar 已有固定菜单和设置入口，不要把 `menu` 或 `settings` 写进 `leftbar.widgets`。

## 仓库和 GitHub 组件

`ghrepo` 与 `ghissues` 从当前内容的 `source.repository` 读取 `owner/repo`。文章可在 Front Matter 中声明，Wiki、Topic 或 Notebook 也可以在 Collection 文件中统一声明：

```yaml blog/source/_posts/example.md
---
title: Stellar 使用记录
source:
  repository: xaoxuu/hexo-theme-stellar
rightbar:
  widgets:
    - ghrepo
    - override: ghissues
      title: 最近 Issue
      limit: 5
      labels: help wanted
---
```

GitHub API 地址由 `services.github.api_url` 设置。没有 `source.repository` 时，这两个 Widget 不输出内容；请求失败、限流或被网络策略拦截时，静态页面仍可阅读，但动态仓库数据不会补全。

## 自定义链接和 Markdown

`linklist` 适合制作一组固定入口：

```yaml blog/source/_data/widgets.yml
reading:
  layout: linklist
  title: 阅读入口
  view: grid
  columns: 2
  items:
    - title: 文章
      url: /blog/
      icon: default:documents
    - title: 文档
      url: /wiki/
      icon: default:documents
```

`markdown` 除了 `content`，还可以通过 `src` 加载远程 Markdown，并可嵌套一份 `linklist`。远程内容在浏览器中加载，需要目标地址允许访问；仅显示本地说明时优先使用 `content`。

## 时间线、订阅和最新评论

`timeline` 根据 `type` 选择数据适配器。未设置 `type` 时按 GitHub Issue、Release 等兼容数据渲染；例如：

```yaml blog/source/_data/widgets.yml
releases:
  layout: timeline
  title: 版本动态
  api: https://api.github.com/repos/owner/repo/releases?per_page=5
  hide: user

feed:
  layout: timeline
  title: 最近订阅
  type: rss
  api: https://example.com/atom.xml
  limit: 10
  content_type: summary
```

`type` 还可按实际数据使用 `weibo`、`memos`，以及 `twikoo`、`waline`、`artalk`、`giscus` 等最新评论适配器。主题默认的 `latest_comment` 只提供 layout 和数量，需要在站点 `widgets.yml` 中补上与评论服务匹配的 `api` 和 `type`：

```yaml blog/source/_data/widgets.yml
latest_comment:
  api: https://comments.example.com
  type: waline
```

不同适配器要求的数据结构并不相同，`limit`、`hide`、`content_type` 等选项也只在相应适配器中生效。先验证 API 返回和跨域策略，再把实例放入 Region；参数见[动态 Widget](/wiki/stellar/reference/widgets/#timeline)。

## Widget 没有显示

按以下顺序检查：

1. 查看最终生效层级的 `widgets` 数组，确认没有被更具体的 Profile、Collection 或 Page 整体替换。
2. 核对 layout 是否支持目标 Region；不支持的实例会被跳过。
3. 核对上下文条件，例如 `tree` 需要 Wiki、`tagtree` 需要 Notebook、`ghrepo` 需要 `source.repository`。
4. 对动态组件检查 `api`、浏览器网络请求、跨域设置和返回数据结构。
5. 在博客根目录运行 `npx hexo stellar doctor`，查看 `unknown_widget`、`fixed_leftbar_widget` 或位置能力 warning。

Doctor 只有 warning 时仍会通过，因此还要打开实际页面确认组件内容。需要查看每个 layout 的空内容条件和参数时，继续阅读[Widget 配置参考](/wiki/stellar/reference/widgets/)。
