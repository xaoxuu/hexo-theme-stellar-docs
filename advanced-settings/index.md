---
layout: wiki
wiki: Stellar
order: 900
title: 探索个性化选项
---

## 评论


### 共用评论数据

如果您有多个页面需要共用评论数据，可以把它们的 `comment_id` 设为相同的值，例如：

```yaml blog/source/about/index.md
title: 关于
comment_id: '留言板'
```

```yaml blog/source/friends/index.md
title: 友链
comment_id: '留言板'
```

### 使用其它评论数据

如果您有多个页面需要另外一个数据库的评论数据，以 Beaudar 为例，您可以这样：

```yaml blog/source/wiki/stellar/index.md
title: 快速开始您的博客之旅
beaudar:
  repo: xaoxuu/hexo-theme-stellar
  'issue-term': 'Q & A'
```


## 文章自定义

### 是否自动生成封面

根据 `tags` 作为关键词为每一篇文章在线搜索封面：

```yaml blog/_config.stellar.yml
article:
  auto_cover: true
```

### 是否自动生成摘要

建议您通过 `description` 或者 `excerpt` 方式生成摘要，但如果您希望自动从文章内容截取一定字数的文字作为摘要，可以这样设置：

```yaml blog/_config.stellar.yml
article:
  auto_excerpt: 200
```

### 相关文章推荐

要实现相关文章推荐功能，您需要安装插件：

{% copy npm i hexo-related-popular-posts %}

然后在主题配置文件中开启：

```yaml blog/_config.stellar.yml
article:
  # npm i hexo-related-popular-posts
  related_posts:
    enable: true
    title: 您可能感兴趣的文章
```

## 自定义样式

如果要修改样式，您需要删掉主题的样式文件的 CDN 链接，使用本地文件，然后在 `themes/stellar/source/css/_custom.styl` 中进行修改。

### 使用其它 highlight.js 代码高亮主题

Hexo 官方有文档：https://hexo.io/docs/syntax-highlight.html#hljs

> Tip: When line_number is set to false, wrap is set to false and hljs is set to true, you can then use highlight.js theme directly in your site.

以 `atom-one-dark` 主题为例，翻译过来就是 `_config.yml` 找到 `highlight` 并修改为：
```yaml
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: '    '
  wrap: false
  hljs: true
```
然后再找到 `inject` 新增一个 css 链接：
```yaml
inject:
  head:
    - <link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/styles/atom-one-dark.min.css">
```

## 外部文件注入

在站点根目录下的配置文件中进行修改 `inject.head` 以在 `<head>` 标签末尾处注入代码，修改 `inject.script` 以在 `<body>` 标签末尾处注入代码。

```yaml blog/_config.yml
inject:
  head:
    - <meta name="msapplication-TileColor" content="#2d89ef">
    - <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
    - <meta name="theme-color" content="#ffffff">
  script:
    - https://fastly.jsdelivr.net/npm/jquery@3.5/dist/jquery.min.js
```
