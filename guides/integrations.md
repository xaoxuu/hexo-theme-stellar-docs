---
title: 公式、图表与时间线
date: 2024-01-04 13:45
updated: 2026-09-06 02:28
---

公式和图表要经过两步：Hexo 先把 Markdown 变成浏览器认识的标记，Stellar 再负责加载对应的显示工具。动态时间线则从兼容接口读取内容。

## 数学公式

在页面 Front Matter 选择公式渲染工具：

```yaml blog/source/wiki/handbook/formula.md
render:
  math: katex
```

MathJax 使用 `render.math: mathjax`，关闭使用 `false`。全站默认值放在 `features.math.provider`，参数分别位于 `features.math.katex/mathjax`。

正文可以使用当前 Markdown 数学处理器支持的公式语法，例如：

```text
$$\sum_{i=0}^n i^2 = \frac{n(n+1)(2n+1)}{6}$$
```

如果公式字符在生成 HTML 中已被错误转义，应先修正 Markdown 渲染链。

## Mermaid 图表

现有站点可以安装相应 Hexo 处理插件，将 Mermaid 代码块转换为客户端所需的容器：

```sh
npm install hexo-filter-mermaid-diagrams
```

```yaml blog/source/wiki/handbook/diagram.md
render:
  diagrams: mermaid
```

```yaml blog/_config.stellar.yml
features:
  diagrams:
    provider: mermaid
    mermaid:
      theme: neutral
```

支持官方 `default/dark/forest/neutral` 主题。页面 `render.diagrams` 可设为 `false`、`mermaid` 或参数对象。

```text
flowchart LR
  A[写作] --> B[检查]
  B --> C[发布]
```

使用时将以上代码放入语言标记为 `mermaid` 的代码块。

## Memos 与时间线

Memos 时间线使用 `type: memos`。不同版本的 Memos API 可能返回不同的数据格式，需要确认接口响应符合主题支持的格式；旧实例地址不一定适用于新版本。

```yaml blog/source/_data/widgets.yml
my-memos:
  layout: timeline
  title: 近期动态
  type: memos
  api: https://example.com/compatible-memos-feed
  hide: user,footer
```

在 Region 的 `widgets` 中引用 `my-memos`。正文中的时间线用法见[数据标签](/wiki/stellar/reference/tags/data/)。

显示异常时，可分别检查生成 HTML 中的公式或图表标记，以及浏览器中的资源加载。Doctor 能检查配置字段，不能判断第三方脚本和远程接口是否可用。
