---
layout: wiki
wiki: Stellar
order: 104
title: 侧边栏小组件的配置与使用
---

侧边栏组件库在 `_data/widgets.yml` 文件中，配置和使用是两个部分，使用较为简单，即在需要的地方指定组件名：

```yaml _posts/xxx.md
---
sidebar: ['我的小组件1', '我的小组件2']
---
```

也可以在配置文件中指定各个页面默认使用哪些组件：

```yaml _config.yml
sidebar:
  widgets:
    index: [welcome, recent, timeline] # for home/wiki/categories/tags/archives/404 pages
    page: [welcome, toc] # for pages using 'layout:page'
    post: [toc, ghrepo, ghissues] # for pages using 'layout:post'
    wiki: [toc, ghrepo, ghissues, related] # for pages using 'layout:wiki'
```

{% border Stellar 1.11.0 color:red %}
侧边栏组件配置从` _config.yml` 中转移到数据文件 `_data/widgets.yml` 中，且仅支持在数据文件中配置。同时布局由 `sidebar.widgets_layout` 改名为 `sidebar.widgets`
{% endborder %}

各种组件配置方法如下：

## recent（最近更新）

```yaml blog/source/_data/widgets.yml
recent:
  layout: recent
  rss: # /atom.xml # npm i hexo-generator-feed
  limit: 5 # Count of posts
```

在 `wiki` 板块显示的是最近更新的 `wiki` 页面，其余地方显示最近更新的文章。

`hexo` 的覆盖规则是合并而不是替换，所以若不想使用 `recent`，除了在 `_config.stellar.yml` 中删除 `recent` 你还需要将此处的 `recent` 置空，即

```yaml blog/source/_data/widgets.yml
recent:
#  layout: recent
#  rss: # /atom.xml # npm i hexo-generator-feed
#  limit: 5 # Count of posts
```

然后自己需要的地方用自己另建的一个 `my_recent` 组件

```yaml blog/source/_data/widgets.yml
my_recent:
  layout: recent
  ...
```

## toc（目录）

```yaml blog/source/_data/widgets.yml
toc:
  layout: toc
  list_number: false # 是否显示序号
  min_depth: 2
  max_depth: 5
  fallback: recent # Use a backup widget when toc does not exist.
```

`toc` 的 `fallback` 默认是 `recent`，即一篇文章没有 `TOC` 的时候会显示一个 `recent`

## markdown

```yaml
# Sidebar widgets
widgets:
  welcome:
    layout: markdown
    title: 欢迎
    content: |
      欢迎光临小站，这是一个全新的主题，拥有精心设计的样式，保留了 Volantis 的自定义侧边栏，可以写一些公告。
      本站主题还没开发完毕，旧的文章正在逐步迁移至新主题。
```

您可以使用模板创建任何组件，在任何页面的侧边栏显示。推荐将自己的组件配置写在数据文件中：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  content:
    - 这里写的内容会覆盖主题配置文件中的
```

## tagcloud（标签云）

```yaml blog/source/_data/widgets.yml
tagcloud:
  layout: tagcloud
  title: 标签云
  # 标签云配置
  min_font: 12
  max_font: 24
  amount: 100
  orderby: name
  order: 1 # 1, sac 升序；-1, desc 降序
  color: false # 使用颜色
  start_color:  # 开始的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  end_color:  # 结束的颜色。您可使用十六进位值（'#b700ff'），rgba（rgba(183, 0, 255, 1)），hsla（hsla(283, 100%, 50%, 1)）或 颜色关键字。此变量仅在 color 参数开启时才有用。
  show_count: false # 显示每个标签的文章总数
```

## ghuser（用户信息）

```yaml
ghuser:
  layout: ghuser
  api: https://api.github.com # 若有 api.github.com 镜像可填，否则保持默认
  username: github # your github login username
  avatar: true # show avatar or not
  menu: true # show menu or not
```

## ghrepo（仓库信息）

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

## related（相关文章/项目）

{% border Stellar 1.12.0 color:red %}
v1.12.0 已将 `wiki_more`，更名为 `related`
{% endborder %}

```yaml blog/source/_data/widgets
# wiki_more:
#   layout: wiki_more
related:
  layout: related
```

```yaml blog/_config.stellar.yml
# wiki: [toc, ghrepo, wiki_more] # for pages using 'layout:wiki'
wiki: [toc, ghrepo, related] # for pages using 'layout:wiki'
```

## timeline（时间线）

这个功能在 {% mark 1.12.0 color:dark %} 版本后开始支持。

```yaml blog/source/_data/widgets.yml
timeline:
  layout: timeline
  title: 近期动态
  api: https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues # 若你想限制数量，在api链接后面加上?per_page=1指限制为1条
  user: # 是否过滤只显示某个人发布的内容，如果要筛选多人，用英文逗号隔开
  hide: # title,footer # 隐藏标题或底部 # 此功能需要 Stellar v1.13.0
```

现在侧边栏不仅能放置近期动态，还可以放置朋友圈文章，这个功能在 {% mark 1.13.0 color:dark %} 版本后开始支持。

```yaml blog/source/_data/widgets.yml
# 愣着干啥，新建啊
'朋友圈':
  layout: timeline
  title: 近期动态
  api: https://data.json.vlts.cc/v1/xaoxuu/friends-rss-generator # 你的朋友圈数据文件地址
  type: fcircle
  limit: # 可通过这个限制数量
```

然后你可以在`_config.stellar.yml`中设置引用

```yaml blog/_config.stellar.yml
sidebar:
  ...
  widgets:
    index: [welcome, 朋友圈]
```

或者在你需要显示的页面引入

{% note 页面引入＞设置引入 %}

```md blog/source/_posts/xxx.md
---
sidebar: [ghuser, 朋友圈]
---
```