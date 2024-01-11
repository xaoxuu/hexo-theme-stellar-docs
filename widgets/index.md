---
layout: wiki
wiki: hexo-stellar
title: 自定义小组件的配置与使用（8个）
---

实现并显示一个小组件需要两个步骤：

1. 【配置】在组件库中声明组件
2. 【使用】在需要的位置调用

组件库在 `_data/widgets.yml` 文件中，需要自己创建，内容形如：

```yaml 
'我的小组件1':
  layout: 小组件布局模板
  ...(其它属性)
```

使用的地方有：【主题配置】、【项目配置】、【页面】，后者可以覆盖前者，例如：

```yaml blog/source/_posts/xxx.md
---
sidebar: ['我的小组件1', '我的小组件2']
---
```

## 组件库

在创建组件时，您可以使用以下这些 `layout` 布局：

{% quot el:h3 toc %}

这是文章/文档的目录树组件，显示文章和文档的目录结构：

```yaml blog/source/_data/widgets.yml
toc:
  layout: toc
  list_number: false # 是否显示序号
  min_depth: 2 # 建议不要低于 2 即从 H2 标签开始解析（H1标签用于文章大标题）
  max_depth: 5 # 5 代表最多解析到 H5 标签
  fallback: recent # Use a backup widget when toc does not exist.
  collapse: false # true / false / auto (始终折叠/不折叠/自动折叠)
```

`toc` 的 `fallback` 默认是 `recent`，即一篇文章没有 `TOC` 的时候会显示一个 `recent`

{% quot el:h3 recent %}

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

{% quot el:h3 related %}

相关**文档**组件，用于显示具有相同 `tags` 的其它项目列表，暂不支持自定义内容：

Stellar {% mark 1.12.0 %} 已将 `wiki_more`，更名为 `related`

```yaml blog/source/_data/widgets.yml
related:
  layout: related
```

{% quot el:h3 markdown %}

这是一个自由度很高的标签，可以显示 [markdown](https://docs.github.com/cn/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 文本内容：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  content: |
    欢迎使用 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar/) 主题，下面是您的入门指南，祝您使用愉快！
    <br>
    **第一步**
    创建 `blog/_config.stellar.yml` 文件，在此文件中填写需要自定义的主题配置。
    <br>
    **第二步**
    创建 `blog/source/_data/widgets.yml` 文件，此文件中填写需要自定义的侧边栏组件，例如 `welcome` 组件。
    <br>
    如果有任何疑问，请先查阅 [文档](https://xaoxuu.com/wiki/stellar/)，如果文档中没有提供，请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues/) 向开发者询问。
  src: # 可以设置外部 md 文件链接
```

{% quot el:h3 tagcloud %}

标签云组件：

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

{% quot el:h3 ghuser %}

显示 GitHub 用户基础信息卡片：

```yaml blog/source/_data/widgets.yml
ghuser:
  layout: ghuser
  username: github # your github login username
  avatar: true # show avatar or not
  menu: true # show menu or not
```

因为它和侧边栏左上角默认的 `header` 功能存在重复，所以建议隐藏默认的 `header` 组件：


```yaml blog/source/_posts/xxx.md
---
title: 某一篇文章
sidebar: [ghuser, ...]
header: false # 不显示左上角的 logo 和 menu
---
```

{% quot el:h3 ghrepo %}

显示 GitHub 仓库基础信息，需要搭配 `repo` 一起使用：

```yaml blog/source/_data/widgets.yml
ghrepo:
  layout: ghrepo
```

需要在需要显示的文章页面的 `front-matter` 中按照如下格式写上仓库持有者和仓库名：

```yaml blog/source/_posts/xxx.md
---
repo: xaoxuu/hexo-theme-stellar
---
```

如果需要显示在 `wiki` 项目中，则在 `_data/projects.yml` 中填写到对应项目的信息中：

```yaml blog/source/_data/projects.yml
Stellar:
  title: Stellar
  subtitle: '每个人的独立博客 | Designed by xaoxuu'
  repo: xaoxuu/hexo-theme-stellar
  ...
```

{% quot el:h3 timeline %}

{% tabs active:1 align:center %}

<!-- tab 动态说说 -->

时间线组件，这个功能在 {% mark 1.12.0 color:dark %} 版本后开始支持：

动态数据是从 GitHub Issues 中拉取的，使用方法为：

在 `widgets.yml` 中新建配置

```yaml blog/source/_data/widgets.yml
timeline:
  layout: timeline
  title: 近期动态
  api: https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues # 若你想限制数量，在api链接后面加上?per_page=1指限制为1条
  user: # 是否过滤只显示某个人发布的内容，如果要筛选多人，用英文逗号隔开
  hide: # title,footer # 隐藏标题或底部 # 此功能需要 Stellar v1.13.0
```

<!-- tab 朋友圈 -->

这个功能在 {% mark 1.13.0 color:dark %} 版本后开始支持。

{% link https://xaoxuu.com/wiki/stellar/third-party/fcircle/ %}

```yaml blog/source/_data/widgets.yml
# 愣着干啥，新建啊
'朋友圈':
  layout: timeline
  title: 近期动态
  api: https://api.vlts.cc/output_data/v1/xaoxuu/friends-rss-generator # 你的朋友圈数据文件地址
  type: fcircle
  limit: # 可通过这个限制最大数量
```

<!-- tab 微博动态 -->

这个功能在 {% mark 1.18.0 color:dark %} 版本后开始支持：

```yaml blog/source/_data/widgets.yml
weibo:
  layout: timeline
  title: 微博动态
  api: https://raw.githubusercontent.com/GitHub用户名/仓库名/output/output/tweets.json # 你的微博爬取数据文件地址
  type: weibo
  limit: 20
```

{% endtabs %}

无论是哪种动态数据，你都可以在 `_config.stellar.yml` 中设置引用

```yaml blog/_config.stellar.yml
sidebar:
  ...
  widgets:
    home: welcome, recent, 朋友圈, weibo
```

或者在你需要显示的页面引入，页面内引入优先于配置文件引入：

```yaml blog/source/_posts/xxx.md
---
sidebar: [ghuser, search, 朋友圈]
---
```

## 配置默认布局

主题配置中可以配置默认布局顺序，在这些页面中，侧边栏会按照指定的顺序从组件库中读取组件并显示：

```yaml blog/_config.stellar.yml
sidebar:
  ...
  widgets:
    #### 自动生成的页面 ####
    # 主页
    home: search, welcome, recent, timeline # for home
    # 博客索引页
    blog_index: search_blog, recent, timeline # for categories/tags/archives
    # 文档索引页
    wiki_index: search_docs, recent, timeline # for wiki
    # 其它（404）
    others: search, welcome, recent, timeline # for 404 and ...
    #### 手动创建的页面 ####
    # 文章内页
    post: toc, ghrepo, search, ghissues # for pages using 'layout:post'
    # 文档内页
    wiki: search, ghrepo, toc, ghissues, related # for pages using 'layout:wiki'
    # 其它 layout:page 的页面
    page: welcome, toc, search # for custom pages using 'layout:page'
```


## 灵活用法

### 继承（覆盖）组件

适合有多个相似组件的情况，例如有多个时间线组件，显示规则相同，仅 `api` 地址不同：

```yaml blog/source/_data/widgets.yml
my_timeline_lite:
  layout: timeline
  title: 近期动态
  user: xaoxuu
  hide: title,footer
  api:
```

在不同的页面设置不同的 `api` 地址：

```yaml blog/source/_posts/xxx.md
---
title: 某一篇文章
sidebar:
  - toc # 只写一个字符串代表引用对应的通用组件
  - override: my_timeline_lite
    api: https://xxx
---
```

### 匿名组件：仅在使用时创建

适合仅在一个页面或项目中才需要用到的组件，例如在某个页面的侧边栏放一个公告：

```yaml blog/source/_posts/xxx.md
---
title: 某一篇文章
sidebar:
  - toc # 只写一个字符串代表引用对应的通用组件
  - layout: markdown
    title: '重要通知 [NOTE.2022-09]'
    content: |
      请不要原封不动的把本站内容复制到贵站中使用，这样一方面不尊重原作者，另一方面也会因为存在大量重复内容影响贵站收录甚至降权。

      从2022年9月起本站已不再开源，已经持有源码副本或`fork`的朋友请及时删除以防止被他人恶意搬运的情况继续发生。
      
      [> 了解详情](https://github.com/xaoxuu/xaoxuu.github.io#readme)
    src: # 可以设置外部 md 文件链接
---
```

又或者在项目的配置文件中创建专属于这个项目的组件：

```yaml blog/_data/projects.yml
Stellar:
  name: Stellar
  title: Stellar - 每个人的独立博客
  subtitle: '每个人的独立博客 | Designed by xaoxuu'
  sidebar: 
    - search
    - toc
    - ghrepo
    - layout: timeline
      title: 最近更新
      api: https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=1
      hide: footer
  ...
```