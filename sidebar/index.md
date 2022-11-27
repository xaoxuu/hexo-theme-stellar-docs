---
layout: wiki
wiki: Stellar
order: 103
title: 侧边栏配置
---

{% border Stellar 1.11.0 color:red %}
侧边栏组件配置从` _config.yml` 中转移到数据文件 `_data/widgets.yml` 中，且仅支持在数据文件中配置。同时布局由 `sidebar.widgets_layout` 改名为 `sidebar.widgets`
{% endborder %}

## Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
```

设置鼠标指上 `subtitle` 后翻转另一行字（您可以将鼠标移至左上角的Stellar查看效果）

```yaml blog/_config.yml
subtitle:  标题1 | 标题2
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo.title 中设置：

```yaml blog/_config.stellar.yml
sidebar:
  logo:
    title: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

## Navbar（主导航栏）

```yaml blog/_config.stellar.yml
sidebar:
  menu:
    post: '[btn.blog](/)'
    wiki: '[btn.wiki](/wiki/)'
    notes: '[笔记](/notes/)'
    more: '[更多](/more/)'
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

## Search（搜索）

首先请将您的 Stellar 更新到最新版本。

目前仅支持用 `hexo-generator-search` 插件实现本地搜索，后续会添加更多搜索方式。

{% copy npm i hexo-generator-search %}

在 `_config.stellar.yml` 中设置搜索选项并配置你想在侧边栏中显示的位置。

```yaml blog/_config.stellar.yml
# Sidebar widgets
widgets:
  index: welcome, search, recent, timeline 
  page: welcome, toc 
  post: toc, ghrepo, search, ghissues 
  wiki: search, ghrepo, toc, ghissues, related 

...

# 文章搜索
search:
  service: local_search # hexo, todo...
  local_search: # npm i hexo-generator-search
```

然后在 `widgets.yml` 文件中配置侧边栏搜索组件

```yaml blog/source/_data/widgets.yml
search:
  layout: search
  filter: auto # auto or 'path'
```

您可以设置 `filter` 过滤搜索，默认 `auto` 是全站搜索。那我不想全站搜索，只想搜索 `wiki` 或者某个项目中的内容，就在 `filter` 处设置为 `wiki` 则表示只搜索路径为 `/wiki` 下的内容，同理设置为项目路径即可仅搜索该项目下的内容。

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

## 个性化组件

{% link https://xaoxuu.com/wiki/stellar/widgets/ %}