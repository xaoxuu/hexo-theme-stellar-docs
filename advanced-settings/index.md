---
layout: wiki
wiki: Stellar
order: 900
title: 探索个性化选项
---

## 主题色 & 字体

{% note 自定义主题色于1.11.0版本支持 color:orange %}

```yaml blog/_config.stellar.yml
style:
  font-size: 16px
  font-family:
    logo: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    body: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    code: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
  color:
    common:
      theme: '#1BCDFC' # 主题色
      accent: '#ff5722' # 强调色
      link: '#2196f3' # 超链接颜色
      button: '#1BCDFC' # 按钮颜色
      hover: '#ff5722' # 按钮高亮颜色
    light:
      background: '#f8f8f8' # 浅色背景颜色
      block: '#f2f2f2' # 块背景颜色
      card: white # 卡片背景颜色
      title: '#000' # 标题文本颜色
      text: '#333' # 正文文本颜色
      code: '#111' # 行内代码颜色
    dark:
      background: '#313438' # 深色背景颜色
      background-mobile: black # 移动端深色背景（OLED调成纯黑可以省电）
      block: '#2B2F33' # 块背景颜色
      card: '#464D57' # 卡片背景颜色
      title: '#fff' # 标题文本颜色
      text: '#eee' # 正文文本颜色
      code: '#ff7043' # 行内代码颜色
```

引入外部字体，在 `_config.yml` 中写入

```yaml blog/_config.yml
inject:
  head:
    - <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" rel="stylesheet">
  script:
```

选择在线字体：

{% link https://www.googlefonts.cn/ Google&nbsp;Fonts %}

## 文本对齐方向

此功能尚在测试中，谨慎更改

```yaml blog/_config.stellar.yml
style:
  # 默认为left
  text-align: left # center,right
```

## 页面缓入效果

```yaml blog/_config.stellar.yml
# 默认关闭，目前已知scrollreveal与lazyload同时打开时会有footer不显示的bug
scrollreveal:
  enable: false
  js: https://fastly.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js
  distance: 4px # 执行距离
  duration: 400 # ms # 执行时长
  interval: 100 # ms # 执行间隔（时间）
  scale: 0.1 # 0.1~1 # 执行方式（缩放）
```

## 延迟加载

```yaml blog/_config.stellar.yml
# 默认打开
lazyload:
  enable: true # [hexo clean && hexo s] is required after changing this value.
  js: https://fastly.jsdelivr.net/npm/vanilla-lazyload@17.3.1/dist/lazyload.min.js
  transition: blur # blur, fade
```

## 加载提示

加载动态时间线、动态友链等显示提示

```yaml blog/_config.stellar.yml
# 默认打开
loading:
  loading: 正在加载
  error: 加载失败，请稍后重试。
```

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
