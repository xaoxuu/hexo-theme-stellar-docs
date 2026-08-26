---
date: 2024-01-04 13:45
updated: 2026-08-25 00:08
title: 使用图表类插件
render:
  diagrams: mermaid
collection:
  profile: wiki
  id: hexo-stellar
---

## mermaid

安装插件：

{% copy npm install --save hexo-filter-mermaid-diagrams %}

使用前需要在 Markdown 文件开头加入：

```md _posts/xxx.md
---
render:
  diagrams: mermaid
---
```

{% tabs active:1 align:center %}

<!-- tab 演示效果 -->

```mermaid
graph LR
A(Section A) -->|option 1| B(Section A)
B -->|option 2| C(Section C)
```

```mermaid
gitGraph
  commit
  commit
  branch develop
  commit
  commit
  commit
  checkout main
  commit
  commit
```

<!-- tab 代码示例 -->

{% gist weekdaycare/f7769263a4df46b2d75e32684f4ae873 %}

{% endtabs %}

{% link https://mermaid.js.org/intro/ %}

### 样式配置

Mermaid 使用官方样式，可在 provider 参数中选择官方主题：

```yaml
extensions:
  features:
    diagrams:
      provider: mermaid
      providers:
        mermaid:
          theme: neutral
```

页面可以用 `render.diagrams: false` 关闭，或用 `mermaid` / Mermaid 参数对象覆盖。
