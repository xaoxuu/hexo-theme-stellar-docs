---
layout: wiki
wiki: hexo-stellar
title: 侧边栏配置
---

## Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
```

设置鼠标指上 `subtitle` 后翻转另一行字（您可以将鼠标移至左上角的Stellar查看效果）

```yaml blog/_config.stellar.yml
logo:
  subtitle: '' # '文字1 | 文字2' (鼠标放上去会切换到文字2)
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo 中设置：

```yaml blog/_config.stellar.yml
logo:
  avatar: '[config.avatar](/about/)' # you can set avatar link in _config.yml or '[https://xxx.png](/about/)'
  title: '[config.title](/)' # you can set html tag like: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

## Navbar（主导航栏）

自己可以增加任意的键值对，键：就是 menu_id，后面需要用到，值：就是显示的 md 链接，方括号内支持文字和图片标签

```yaml blog/_config.stellar.yml
menu:
  # post: '[btn.blog](/)'
  # wiki: '[btn.wiki](/wiki/)'
  # friends: '[友链](/friends/)'
  # about: '[关于](/about/)'
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

## Search（搜索）

{% tabs align:left %}

<!-- tab local_search -->

{% box %}
在 {% mark 1.17.1 color:dark %} 版本后开始支持，无需安装插件，默认开启。
{% endbox %}

```yaml blog/_config.stellar.yml
# 文章搜索
search:
  service: local_search # local_search, todo...
  local_search: # 在 front-matter 中设置 indexing:false 来避免被搜索索引
    field: all # post, page, all
    path: /search.json # 搜索文件存放位置
    content: true # 是否搜索内容
    codeblock: true # 是否搜索代码块（需要content: true)
```

<!-- tab others -->

请提交PR...

{% endtabs %}

在 `_config.stellar.yml` 中设置搜索选项并配置你想在侧边栏中[显示的位置](https://xaoxuu.com/wiki/stellar/widgets/)。

然后在 `widgets.yml` 文件中配置侧边栏搜索组件

```yaml blog/source/_data/widgets.yml
search:
  layout: search
  filter: auto # auto or '/path'
  placeholder: 文章搜索 # 搜索框处显示的文字

search_blog:
  layout: search
  filter: /blog/ # or /posts/ ...
  placeholder: 文章搜索

search_docs:
  layout: search
  filter: /wiki/
  placeholder: 文档搜索
```

您可以设置 `filter` 按地址过滤搜索结果，默认 `auto` 是智能选择，规则如下：
- `layout: wiki`：只在 `/wiki/当前项目` 中搜索
- 其它：站内搜索

你可以在某些页面中通过覆盖 search 组件的 filter 参数来定制化搜索范围，例如 `wiki` 或 `笔记` 页面的配置中:

```yaml blog/source/_data/wiki/xxx.yml
sidebar:
  - toc
  - layout: search
    override: search
    filter: /path/
    placeholder: 搜索...
```

如果想始终进行不加过滤的站内搜索，那么设置为 `filter: ''` 即可。


## Footer（页脚）

```yaml blog/_config.stellar.yml
footer:
  social:
    github:
      icon: '<img src="/assets/placeholder/social/08a41b181ce68.svg"/>'
      url: https://
    music:
      icon: '<img src="/assets/placeholder/social/3845874.svg"/>'
      url: https://
    unsplash:
      icon: '<img src="/assets/placeholder/social/3616429.svg"/>'
      url: https://
    comments:
      icon: '<img src="/assets/placeholder/social/942ebbf1a4b91.svg"/>'
      url: https://
```

## 自定义组件

Stellar 支持丰富的自定义小组件，详见这篇文档：

{% link https://xaoxuu.com/wiki/stellar/widgets/ desc:true %}