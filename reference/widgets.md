---
title: Widget 配置
date: 2026-09-05 20:49
updated: 2026-09-06 02:28
---

Widget Catalog 由主题默认的 `_data/widgets.yml` 与站点 `source/_data/widgets.yml` 合并得到。顶部栏和侧栏的 `widgets` 数组可以引用 Catalog 实例，也可以直接声明当前使用位置的参数。完整操作流程见 [Widget 指南](/wiki/stellar/guides/widgets/)。

## Catalog 与实例语法

Catalog 的键是实例 ID，`layout` 决定使用哪个模板：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎
  content: 这是一个自定义 Widget。
```

站点同名对象逐字段覆盖主题默认实例；站点值为 `null` 时移除该实例。Region 中的条目有三种结构：

| 写法 | 语义 |
| :--- | :--- |
| `toc` | 引用 ID 为 toc 的 Catalog 实例 |
| `{ override: toc, max_depth: 3 }` | 引用 toc，并只覆盖当前实例的参数 |
| `{ layout: markdown, content: ... }` | 创建不进入 Catalog 的匿名实例 |

同一 ID 可以多次使用，不自动去重。实例参数中的 `presentations` 不能扩大 layout 的位置能力。

## 支持的放置位置

| Layout | Topbar | Leftbar 内容区 | Rightbar | 用途 |
| :--- | :--- | :--- | :--- | :--- |
| `menu`、`settings` | 支持 | 固定区域管理 | 不支持 | 菜单、设置入口 |
| `spacer` | 支持 | 不支持 | 不支持 | Topbar 弹性占位 |
| `toc` | 支持 | 支持 | 支持 | 当前正文目录 |
| `tree`、`tagtree` | 不支持 | 支持 | 支持 | Wiki 文档树、Notebook 标签树 |
| `recent`、`related` | 不支持 | 支持 | 支持 | 最近内容、集合相关内容 |
| `ghrepo`、`ghissues`、`ghuser` | 不支持 | 支持 | 支持 | GitHub 仓库、Issue、用户 |
| `author`、`tagcloud` | 不支持 | 支持 | 支持 | 作者、标签云 |
| `timeline`、`markdown`、`linklist` | 不支持 | 支持 | 支持 | 动态列表、自定义正文、链接列表 |

移动端会把 Leftbar、Rightbar 内容放进相应抽屉，不需要另配一个 Drawer Region。Leftbar 的 Brand、菜单、Footer Actions 和设置入口是固定区域；`leftbar.widgets` 中的 `brand`、`actions`、`menu`、`settings` 会被跳过。`presentations` 是 layout 能力，不是用户可用来突破位置限制的开关。

## 系统 Widget

系统 Widget 不需要在 `source/_data/widgets.yml` 中声明：

| ID | 数据来源与行为 |
| :--- | :--- |
| `menu` | 渲染目标 Region 的 `menu` 配置和当前菜单状态 |
| `settings` | 渲染外观设置入口；Leftbar 已有固定实例 |
| `spacer` | 只在 Topbar 中生成弹性占位 |

## toc

`toc` 根据当前正文标题生成目录，也提供回到顶部、评论跳转和目录折叠操作。没有标题时目录主体为空；如果页面仍有评论或远程 Markdown，操作区可以继续显示。

| 参数 | 默认值与行为 |
| :--- | :--- |
| `list_number` | false；是否显示标题序号 |
| `min_depth` | 1；纳入目录的最小标题层级 |
| `max_depth` | 6；纳入目录的最大标题层级 |
| `collapse` | false；可设 true / false / auto |

## recent

`recent` 显示当前上下文的最近更新内容：Wiki 页面读取已上架 Wiki 文档，Notebook 页面读取相应笔记，其它页面读取站点文章。

| 参数 | 默认值与行为 |
| :--- | :--- |
| `limit` | 10；最多显示的条目数 |
| `rss` | null；非空时在标题区显示订阅链接 |

## related

`related` 没有用户参数。Topic 中显示当前专栏的文章序列；Wiki 中显示主题根据 Collection 关系生成的相关项目。普通文章、普通页面或没有相关数据时不输出内容。

## tree

`tree` 没有用户参数，只在 Wiki Collection 中显示 `navigation.tree` 生成的文档树，并标记当前页面。空目录树或只有无法形成导航的内容时不输出。

## tagtree

`tagtree` 只在 Notebook 列表页和内容页显示标签树：

| 参数 | 默认值与行为 |
| :--- | :--- |
| `expand_all` | false；展开所有分支 |
| `expand_active` | true；展开当前标签所在分支 |
| `show_tagcon` | true；显示 `notebook.tag_icons` 对应图标 |

## ghrepo

`ghrepo` 从当前页面或 Collection 的 `source.repository` 读取 `owner/repo`，显示描述、Star、Fork 和最新 Tag。API 根地址来自 `services.github.api_url`。没有仓库信息时不输出。

```yaml blog/source/_data/wiki/example.yml
name: Example
source:
  repository: owner/repo
rightbar:
  widgets: [ghrepo, toc]
```

## ghissues

`ghissues` 使用与 `ghrepo` 相同的 `source.repository`，通过 GitHub Issue API 渲染时间线。

| 参数 | 默认值与行为 |
| :--- | :--- |
| `title` | null；标题为空时不显示标题栏 |
| `limit` | 3；写入 API 的 `per_page` |
| `labels` | null；传给 GitHub API 的标签筛选值 |

## ghuser

`ghuser` 显示 GitHub 用户头像、简介和统计信息：

| 参数 | 默认值与行为 |
| :--- | :--- |
| `username` | 必填；GitHub 登录名，缺失时不输出 |
| `avatar` | true；是否显示头像 |
| `header` | false；是否显示 `github/<username>` 标题链接 |
| `follow` | true；是否显示 Follow 链接 |

## author

`author` 从 `source/_data/authors.yml` 读取当前文章或专栏的 `article.author`；未指定时使用站点默认作者。`avatar` 默认为 true。没有可用作者数据时不输出。

## tagcloud

`tagcloud` 把下列参数传给 Hexo 标签云 helper；站点没有标签时不输出：

| 参数 | 默认值 |
| :--- | :--- |
| `title` | 标签云 |
| `min_font` / `max_font` | 12 / 24 |
| `amount` | 100 |
| `orderby` / `order` | name / 1；order 为 1 升序、-1 降序 |
| `color` | false |
| `start_color` / `end_color` | null；仅在 color 为 true 时使用 |
| `show_count` | false |

## markdown

`markdown` 至少需要 `content` 或 `src`，否则不输出：

| 参数 | 行为 |
| :--- | :--- |
| `title` | 可选标题 |
| `content` | 使用主题 Markdown 渲染器渲染的字符串 |
| `src` | 远程 Markdown 地址，由浏览器按需获取 |
| `linklist` | 可选的内嵌链接列表，结构与 linklist layout 相同 |

`content` 与 `src` 同时存在时会依次显示。远程内容加载完成后，页面会尝试重建对应的 TOC。

## linklist

`linklist` 显示链接列表或网格：

| 参数 | 默认值与行为 |
| :--- | :--- |
| `title` | 可选的 Widget 标题 |
| `view` | list；可设 list / grid |
| `columns` | grid 中默认为 2，表示最大列数；空间不足时自动减少 |
| `show_title` | true；false 时只显示图标 |
| `items` | 链接数组；每项使用 `title/url/icon` |

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

缺少 `title` 或 `url` 的条目不会渲染。链接指向当前页面时，列表模式显示激活圆点，网格模式使用背景、文字和图标高亮。

## timeline

`timeline` 需要 `api`，并以 `type` 选择浏览器数据适配器。没有 `api` 时不输出。

| 参数 | 行为 |
| :--- | :--- |
| `title` | 可选标题 |
| `api` | 必填的数据地址 |
| `type` | 省略时为 timeline；也可按数据使用 rss、weibo、memos、twikoo、waline、artalk、giscus 等适配器 |
| `user` | timeline / memos 的用户筛选，多个值用英文逗号分隔 |
| `hide` | 适配器支持的隐藏项；timeline 支持 user、title、footer |
| `limit` | rss、weibo、memos 和最新评论等适配器使用；默认 timeline 应在 API 查询中限制条数 |
| `content_type` | rss 使用 content / summary |
| `show_title` / `show_content` | rss 使用，false 隐藏相应部分 |
| `avatar` | weibo / memos 的备用头像 |

主题的 `latest_comment` 是一个预定义实例，默认 `layout: timeline`、`limit: 16`，但 `api` 与 `type` 为空。站点需要根据实际评论服务补齐：

```yaml blog/source/_data/widgets.yml
latest_comment:
  api: https://comments.example.com
  type: waline
  limit: 10
```

适配器不会互相转换数据。API 返回格式、跨域策略或评论服务地址不匹配时，组件无法加载；Doctor 只检查本地配置，不验证远程响应。

## 警告与空内容

未知实例、固定区域内容误放或位置不支持时会跳过该项。Doctor warning 提供 `widget`、`layout`、目标 `region` 和 `supported` 列表；只有 warning 时 `ok` 仍为 true。

位置正确也不保证一定输出 DOM。上下文型 Widget 会在缺少 Wiki、Notebook、仓库、作者、标签或相关文章数据时返回空内容；动态 Widget 则还要在浏览器中核对请求与响应。排查步骤见 [Widget 没有显示](/wiki/stellar/guides/widgets/#Widget-没有显示)。
