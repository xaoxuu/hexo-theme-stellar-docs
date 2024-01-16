---
layout: wiki
wiki: hexo-stellar
title: 一站多作者配置
---

支持多个作者在一个站点发布文章，需要先配置作者信息：

```yaml blog/source/_data/authors.yml
# 作者 1 （默认）
xaoxuu:
  name: 'Mr. X'
  avatar: /assets/xaoxuu/avatar/rect-256@2x.png
  banner: /assets/banner/friends.jpg
  description: 如果宇宙中真有什么终极的逻辑，那就是我们终有一天会在舰桥上重逢，直到生命终结。
# 作者 2
author2:
  name: xxx
  ...
```

配置了作者信息之后，第一个作者就是默认作者，在文章卡片和面包屑导航会显示作者名。对于不是默认作者的文章，需要在 front-matter 中指定本文的作者：

```yaml blog/source/_posts/xxx.md
---
author: author2
---
```

{% quot 作者资料页 %}

文章面包屑导航处点击作者链接会进入自动生成的作者个人资料页，目前内容是一个横幅加作者的文章列表。如果你有什么好的布局想法，请留言讨论～

默认的个人资料页是： `/author/id/index.html`，可以在这里修改：

```yaml blog/_config.stellar.yml
site_tree:
  author:
    base_dir: author
```