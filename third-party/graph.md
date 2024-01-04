---
layout: wiki
wiki: hexo-stellar
title: 使用图表类插件
mermaid: true
---

## mermaid

安装插件：

{% copy npm install --save hexo-filter-mermaid-diagrams %}

使用前需要在 Markdown 文件开头加入：

```md _posts/xxx.md
---
mermaid: true
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

<script src="https://gist.github.xaox.cc/weekdaycare/f7769263a4df46b2d75e32684f4ae873.js"></script>

{% endtabs %}

{% link https://mermaid.js.org/intro/ %}
