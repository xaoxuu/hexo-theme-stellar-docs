---
layout: wiki
wiki: hexo-stellar
title: 实现博客专栏/专题
---

如果你使用过 Stellar 的 wiki 系统，那么专栏就非常容易了，相当于一个简化版的 wiki 系统，区别是：

- 无需「上架」动作
- 文章创建于 `blog/source/_posts` 文件夹内
- 按照时间排序，默认最新的排最上面
- 页面布局类似于普通文章

## 基本流程

{% timeline %}
<!-- node 1/2 创建描述文件 -->
在 `blog/source/_data/` 文件夹中创建一个 `topic` 文件夹，在其中放入各个专栏的描述文件。以「博客教程」为例，文件名就是项目的 `id`：
```yaml blog/source/_data/topic/blog.yml
name: 博客教程 # 在面包屑导航上会显示较短的名字
title: 博客教程 # 在列表页会显示完整的专栏标题
description: 关于搭建独立博客相关的知识和经验分享，以及 Stellar 的高级用法、版本更新相关的注意事项。
icon: /assets/wiki/stellar/icon.svg
order_by: -date # 默认是按发布日期倒序排序
```

<!-- node 2/2 设置布局模板和专栏ID -->
在此专栏文章的 `md` 文件的 `front-matter` 部分设置布局模板为 `topic` 并且指定所属的专栏 `id` （即上一步创建的文件名 `id.yml`）
```yaml blog/source/_posts/20240114.md
---
layout: topic  # 使用topic布局模板
topic: blog # 这是专栏id，对应 /data/topic/blog.yml
title: 这是文章标题
---
```

{% endtimeline %}

## 这个功能的定位是什么？

相比分类功能，它更偏向于一个更加有前后关系的文章集合，类似于文档的分页，但是相比文档，它又像文章一样持续增加新页面，一般以时间为排序依据。比分类更加结构化，比文档更加自动化，可以根据自己的需求选择使用不同的功能。