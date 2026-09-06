---
title: 专栏
date: 2024-01-14 17:47
updated: 2026-09-06 02:28
---

几篇已经发布在博客里的文章，如果存在明确的阅读顺序，可以把它们整理成专栏（Topic）。文章仍然留在 `source/_posts/`，保留原来的分类、标签和发布时间。

## 建一个“城市漫游”专栏

```yaml blog/source/_data/topic/journey.yml
name: 城市漫游
tagline: 用脚步认识一座城
route:
  path: /topic/journey/
listing:
  sort:
    field: date
    direction: asc
```

```yaml blog/source/_posts/第一站.md
title: 第一站
collection:
  profile: topic
  id: journey
```

通常显式填写 Topic 归属。`route.start` 可指定入口文章，使该文章在唯一匹配时推导归属；不能用它替代其余成员的声明。

## 入口与发布列表

`route.path` 设置专栏路径；`source/_data/topic.yml` 的 `publish_list` 可限定公开列表中的专栏：

```yaml blog/source/_data/topic.yml
publish_list: [journey]
```

专栏入口会从成员内容构建。`listing.sort.field` 可填写 date、updated、title，但当前系列导航和相应索引只按 date 排序，填写其它字段时保留输入顺序。需要确定的阅读顺序时使用 date asc/desc；专栏总列表按各系列首项日期降序展示。

## 封面与 Brand

专栏 `cover` 与文章 `cover` 独立，文章未提供封面时不会继承专栏封面。Topic 默认继续使用站点 Brand；需要切换为 Collection 来源时见 [Brand 指南](/wiki/stellar/guides/brand/)。

置顶通过成员文章的 `listing.priority` 设置。Topic 集合本身不支持 Wiki 集合的 `listing.priority/order`。
