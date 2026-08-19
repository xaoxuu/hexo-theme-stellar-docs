---
date: 2023-12-06 21:55
updated: 2026-08-20 00:11
wiki: hexo-stellar
title: 侧边栏组件的配置与使用（9个）
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
leftbar: ['我的小组件1', '我的小组件2']
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

toc 组件底部的操作按钮按页面内容显示：「回到顶部」「参与讨论」仅在页面存在目录或渲染评论区时出现；其中「参与讨论」只在页面实际渲染评论区时显示（页面或所属 Wiki 项目设置 `comments: false` 时隐藏）。

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

{% quot el:h3 linklist %}

`view` 显式选择 `list` 或 `grid`。用户配置的 linklist 使用集合默认密度；网格模式下 `columns` 表示最大列数，组件会按可用宽度自动减少列数；`show_title` 控制是否显示标题，不再根据列数隐式隐藏。链接指向当前页面时，列表模式在右侧显示激活圆点，网格模式仅使用背景、文字和图标高亮，不显示圆点。

```yaml blog/source/_data/widgets.yml
linklist:
  layout: linklist
  view: grid
  columns: 2
  show_title: true
  items:
    - icon: '<svg...></svg>' # 或者 icons.yml 中设置的 icon 名称
      title: 关于
      url: /about/
```

{% quot el:h3 markdown %}

这是一个自由度很高的标签，可以显示 [markdown](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) 文本内容：

```yaml blog/source/_data/widgets.yml
welcome:
  layout: markdown
  title: 欢迎欢迎
  linklist: # 与 linklist 组件写法相同
    view: list
    show_title: true
    items:
      - icon:
        title: 
        url:
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

`linklist` 显示为嵌套在 md 组件中，效果参考

{% link https://xaoxuu.com %}

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

如果需要显示在 `wiki` 项目中，则在 `_data/wiki/projects.yml` 中填写到对应项目的信息中：

```yaml blog/source/_data/wiki/projects.yml
name: Stellar
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
  api: https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/issues # 若你想限制数量，在api链接后面加上?per_page=1指限制为1条
  user: # 是否过滤只显示某个人发布的内容，如果要筛选多人，用英文逗号隔开
  hide: # title,footer # 隐藏标题或底部 # 此功能需要 Stellar v1.13.0
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

<!-- tab RSS 订阅 -->

这个功能在 {% mark 1.34.0 color:dark %} 版本后开始支持，动态数据直接拉取 RSS / Atom / JSON Feed 订阅源（可配合 [RSSHub](https://docs.rsshub.app/) 聚合各类平台动态）：

```yaml blog/source/_data/widgets.yml
rss:
  layout: timeline
  title: 订阅动态
  api: https://rsshub.app/bilibili/user/dynamic/你的uid # RSS / Atom / JSON Feed 地址
  type: rss
  limit: 10
  content_type: content # content 或 summary
```

{% endtabs %}

无论是哪种动态数据，你都可以在 `_config.stellar.yml` 中的 `site_tree` 中设置引用

```yaml blog/_config.stellar.yml
site_tree:
  ...:
    leftbar: welcome, recent, 朋友圈, weibo
```

或者在你需要显示的页面引入，页面内引入优先于配置文件引入：

```yaml blog/source/_posts/xxx.md
---
leftbar: [ghuser, 朋友圈]
---
```

## 配置默认布局

在 {% mark 1.26.0 color:dark %} 版本中，站点主结构树有较大的变化，支持自定义每种页面的组件显示情况，侧边栏会按照指定的顺序从组件库中读取组件并显示：

### 列表类页面

列表类页面是指博客文章列表、专栏列表、wiki 项目列表等页面的配置。

这里解释一下 `base_dir` 是什么意思，比如说当我创建一个 wiki 项目或者笔记页面时，会自动生成一个总项目列表，该页面的默认路径是 `/wiki` ，你可以 [点此查看](https://xaoxuu.com/wiki/) 该页面，改变 `base_dir` 即改变该路径。

```yaml blog/_config.stellar.yml
# 站点主结构树
site_tree:
  # -- 列表类页面 -- #
  # 主页配置
  home:
    leftbar: welcome, recent
    rightbar: timeline
  # 博客列表页配置
  index_blog:
    base_dir: blog # 只影响自动生成的页面路径
    menu_id: post # 未在 front-matter 中指定 menu_id 时，layout 为 post 的页面默认使用这里配置的 menu_id
    leftbar: welcome, recent # for categories/tags/archives
    rightbar: timeline
    nav_tabs:  # 近期发布 分类 标签 专栏 归档 and ...
      # '朋友文章': /friends/rss/
  # 博客专栏列表页配置
  index_topic:
    base_dir: topic # 只影响自动生成的页面路径
    menu_id: post # 未在 front-matter 中指定 menu_id 时，layout 为 topic 的页面默认使用这里配置的 menu_id
  # 文档列表页配置
  index_wiki:
    base_dir: wiki # 只影响自动生成的页面路径
    menu_id: wiki # 未在 front-matter 中指定 menu_id 时，layout 为 wiki 的页面默认使用这里配置的 menu_id
    leftbar: ghissues, related, recent # for wiki
    rightbar: timeline
    nav_tabs:
      # 'more': https://github.com/xaoxuu
```

### 内容类页面

是指具体到文章页面，文档页面和专栏文章等的具体配置

```yaml blog/_config.stellar.yml
# 站点主结构树
site_tree:
  # -- 内容类页面 -- #
  # 博客文章内页配置
  post:
    menu_id: post # 未在 front-matter 中指定 menu_id 时，layout 为 post 的页面默认使用这里配置的 menu_id
    leftbar: related, ghrepo, ghissues, recent # for pages using 'layout:post'
    rightbar: ghrepo, toc
  # 博客专栏文章内页配置
  topic:
    menu_id: post
  # 文档内页配置
  wiki:
    menu_id: wiki # 未在 front-matter 中指定 menu_id 时，layout 为 wiki 的页面默认使用这里配置的 menu_id
    leftbar: tree, ghissues, related, recent # for wiki
    rightbar: ghrepo, toc
  # 作者信息配置
  author: 
    base_dir: author # 只影响自动生成的页面路径
    menu_id: post
    leftbar: recent
    rightbar:
  # 错误页配置
  error_page:
    menu_id: post
    '404': '/404.html'
    leftbar: recent
    rightbar:
  # 其它自定义页面配置 layout: page
  page:
    leftbar: recent
    rightbar: timeline, toc
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
leftbar:
  - welcome # 只写一个字符串代表引用对应的通用组件
  - override: my_timeline_lite
    api: https://xxx
---
```

### 匿名组件：仅在使用时创建

适合仅在一个页面或项目中才需要用到的组件，例如在某个页面的侧边栏放一个公告：

```yaml blog/source/_posts/xxx.md
---
title: 某一篇文章
leftbar:
  - welcome # 只写一个字符串代表引用对应的通用组件
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
  leftbar: 
    - layout: timeline
      title: 最近更新
      api: https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=1
      hide: footer
  ...
```
