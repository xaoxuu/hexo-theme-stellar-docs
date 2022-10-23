---
layout: wiki
wiki: Stellar
order: 104
title: 侧边栏配置
---

## Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo.title 中设置：

```yaml blog/_config.stellar.yml
sidebar:
  logo:
    title: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

## 主导航栏

```yaml blog/_config.stellar.yml
sidebar:
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    notes: '[笔记](/notes/)'
    more: '[更多](/more/)'
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

## 个性化组件

侧边栏组件库在 `_data/widgets.yml` 文件中。

### recent（最近更新）

在 `wiki` 板块显示的是最近更新的 `wiki` 页面，其余地方显示最近更新的文章。

### toc（目录）

- `list_number`: 是否显示序号

### markdown（富文本）

Stellar 和 Volantis 同样支持强大的自定义组件功能，默认提供的组件在主题配置文件中已经列出：

```yaml
# Sidebar widgets
widgets:
  # Recent update
  recent:
    layout: recent
    rss: /atom.xml # npm i hexo-generator-feed
    limit: 5 # Count of posts
  # TOC (valid only in layout:post/wiki)
  toc:
    layout: toc
    list_number: false
    min_depth: 2
    max_depth: 5
  # welcome
  welcome:
    layout: markdown
    title: 欢迎
    content: |
      欢迎光临小站，这是一个全新的主题，拥有精心设计的样式，保留了 Volantis 的自定义侧边栏，可以写一些公告。
      本站主题还没开发完毕，旧的文章正在逐步迁移至新主题。
```

在 `front-matter` 中写上它们的名字，侧边栏就会按顺序显示这些小组件：

```yaml blog/source/xxx.md
sidebar: [welcome, toc]
```

和 Volantis 一样，您可以使用模板创建任何组件，在任何页面的侧边栏显示。推荐将自己的组件配置写在数据文件中：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  content:
    - 这里写的内容会覆盖主题配置文件中的
```

目前支持的布局模板有：`markdown`，后续将会加入列表、网格等布局模板。

{% grid Q & A %}

Q: 如果不想显示默认的 welcome 组件怎么办？
A: 删掉它就可以啦。

Q: 如果想在 welcome 那个位置显示成其它布局的组件？
A: 把 welcome 组件的属性都改成你想要的那个组件的就可以啦。

{% endgrid %}

### ghuser（用户信息）

```yaml
ghuser:
  layout: ghuser
  api: https://api.github.com
  username: github # your github login username
  avatar: true # show avatar or not
  menu: true # show menu or not
```

### ghrepo（仓库信息）

```yaml
ghrepo:
  layout: ghrepo
```

默认显示，需要在需要显示的文章页面的 `front-matter` 中按照如下格式写上仓库持有者和仓库名：

```yaml
---
repo: xaoxuu/hexo-theme-stellar
---
```

如果需要显示在 `wiki` 项目中，则在 `_data/projects.yml` 中填写到对应项目的信息中：

```yaml
Stellar:
  title: Stellar
  subtitle: '每个人的独立博客 | Designed by xaoxuu'
  repo: xaoxuu/hexo-theme-stellar
  ...
```


### timeline（时间线）

```yaml
timeline:
  layout: timeline
  title: 近期动态
  api: https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues
  user: # 是否过滤只显示某个人发布的内容，如果要筛选多人，用英文逗号隔开
```