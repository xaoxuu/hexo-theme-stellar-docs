---
date: 2024-01-04 13:45
updated: 2026-09-05 00:05
title: 用文档系统制作一本简易笔记
---

页面数量较少、需要手动维护目录顺序时，可以直接把 Wiki 项目作为一本简易笔记。

## 创建描述文件

```yaml blog/source/_data/wiki/notes.yml
name: 备忘录
headline: 备忘录
tagline: 随手记录的知识
icon: https://example.com/icon.svg
cover: https://example.com/card.webp
hero:
  enabled: true
  background:
    image: https://example.com/hero.webp
active_menu: notes
comments:
  enabled: true
  provider: giscus
  options:
    data-term: '23'
    data-mapping: number
route:
  path: /notes/
navigation:
  tree:
    日常问题解决方案:
      - mac
    移动端开发笔记:
      - ios
      - flutter
    前端学习笔记:
      - nodejs
      - server
```

## 关联页面

```yaml blog/source/notes/index.md
---
title: 备忘录
collection:
  profile: wiki
  id: notes
---
```

集合根级 `active_menu` 已经可以为所有页面设置菜单高亮；只有单页需要不同行为时，才在页面 Front-matter 中用同名字段覆盖。这个示例页面位于 Wiki 标准命名空间外，因此保留显式 `collection` 消歧。

如果页面数量会持续增长、希望自动按更新时间和标签树管理，请改用独立的笔记本系统。
