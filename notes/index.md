---
layout: wiki
wiki: Stellar
order: 955
title: 实现「笔记」页面
---

创建一个项目，设置为不索引：

```yaml blog/source/_data/widgets.yml
Notes:
  name: 笔记
  title: 笔记
  description: 一个隐藏项目：笔记
  index: false
  # sidebar: [toc]
  tags: 知识库
  sections:
    '日常问题解决方案': [100, 199]
    '移动端开发笔记': [200, 299]
    '前端学习笔记': [300, 399]
    '在线工具': [400, 499]
```

然后笔记页面的 `front-matter` 中指定要高亮的 `menu_id`：

```yaml blog/source/notes/index.md
---
layout: wiki
wiki: Notes
menu_id: notes
---
```

这样就可以啦～