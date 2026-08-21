---
date: 2024-01-04 13:45
updated: 2025-07-01 21:17
title: 使用「katex」插件
katex: true
collection:
  type: wiki
  id: hexo-stellar
---

使用前需要在 Markdown 文件开头加入

```md _posts/xxx.md
---
katex: true
---
```


{% tabs active:1 align:center %}

<!-- tab 演示效果 -->

$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$

<!-- tab 代码示例 -->

```math _posts/xxx.md
$$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$$
```

{% endtabs %}
