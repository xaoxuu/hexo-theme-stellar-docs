---
layout: wiki
wiki: Stellar
order: 950
title: 探索个性化配置
---

## 自定义主页文章检索栏

这个功能在 {% mark 1.13.0 color:dark %} 版本后开始支持。

```yaml blog/_config.stellar.yml
######## Index ########
post-index: # 近期发布 分类 标签 归档 and ...
  '朋友文章': /friends/rss/ # 这里填写的链接要与对应页面一致，否则可能无法正确高亮
```
 
## 文章模板

我一看这文档，每次写一篇新文章都要重新写一遍 `cover`,`desciption`,`categories` 多麻烦，直接让 hexo 替我写了它不香吗

根目录下 `scaffolds` 文件夹中编辑 `post.md` 的 `font-matter`：

```yaml blog/scaffolds/post.md
---
title: {{ title }}
date: {{ date }}
tags: []
categories: []
description: 
cover: 
banner: 
poster: # 海报（可选，全图封面卡片）
  topic: 标题上方的小字 # 可选
  headline: 大标题 # 必选
  caption: 标题下方的小字 # 可选
  color: 标题颜色 # 可选
---
```

## 主题色

```yaml blog/_config.stellar.yml
style:
  ...
  color:
    # 动态颜色（会根据明暗主题重设明度值，只用关心色相和饱和度即可）
    background: 'hsl(212 16% 98%)' # 浅色背景颜色
    block: 'hsl(212 8% 95%)' # 块背景颜色
    code: 'hsl(14 100% 48%)' # 行内代码颜色
    text: 'hsl(0 0% 20%)' # 文本颜色
    # 主题色配置（不会根据明暗动态调整，请设置为通用的颜色）
    theme: 'hsl(192 98% 55%)' # 主题色
    accent: 'hsl(14 100% 57%)' # 强调色
    link: 'hsl(207 90% 54%)' # 超链接颜色
    button: 'hsl(192 98% 55%)' # 按钮颜色
    hover: 'hsl(14 100% 57%)' # 按钮高亮颜色
```

## 字体

### 系统字体

```yaml blog/_config.stellar.yml
style:
  font-size: 16px
  font-family:
    logo: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    body: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    code: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
```

### 外部字体

要想引用外部字体，你需要先在 `_config.yml` 中 `inject` 引入

举例，引用 [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC?query=noto+&subset=chinese-simplified) 在 `_config.yml` 中写入

```yaml blog/_config.yml
inject:
  head:
    - <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" rel="stylesheet">
  script:
```

并在 `_config.stellar.yml` 中填写你引入的字体名称

```yaml blog/_config.stellar.yml
style:
  font-family:
    body: '"Noto Serif SC", "Microsoft Yahei",..., sans-serif'
```

选择在线字体：

{% link https://www.googlefonts.cn/ %}

### 本地字体

若您想引用本地字体，举例，引用得意黑（`SmileySans-Oblique.ttf`）这个字体，先将字体放置于 `blog/source/font/` 目录下，然后改动一下主题文件

```styl Blog/themes/stellar/source/css/_custom.styl
@font-face
   font-family: 'Smiley Sans'
   src: url('/font/SmileySans-Oblique.ttf')
   font-weight: normal
   font-style: normal
```

`font-family` 是你引入的字体家族名，`src` 中填写字体文件相对于 `source` 文件夹的路径

同样，你需要在 `_config.stellar.yml` 中填写你引入的字体名称（`font-family`）

```yaml blog/_config.stellar.yml
style:
  font-family:
    body: '"Smiley Sans", "Microsoft Yahei",..., sans-serif'
```

但是我个人并不推荐引用本地字体，相比于英文字体，中文字体囊括了众多的字符，这也无法避免地导致字体文件体积的增加，拿 `Noto Serif SC` 来说，单个ttf文件就有9mb之大，这对于您的站点而言加载速度可想而知。

## 文本对齐方向

```yaml blog/_config.stellar.yml
style:
  text-align: left # justify/left/center/right
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

{% note color:warning 此效果会和图片懒加载插件冲突，导致部分卡片可能加载不出来 %}

## 图片懒加载

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

## 评论的灵活用法

### 共用评论数据

如果您有多个页面需要共用评论数据，可以在 `front-matter` 中覆盖评论参数，例如：

```yaml blog/source/about/index.md
title: 关于
beaudar:
  'issue-term': '留言板'
```

```yaml blog/source/friends/index.md
title: 友链
beaudar:
  'issue-term': '留言板'
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

## 实现「笔记」页面

创建一个项目，设置为不索引：

```yaml blog/source/_data/widgets.yml
Notes:
  name: 笔记
  title: 笔记
  description: 一个隐藏项目：笔记
  index: false
  # sidebar: [toc]
  tags: 知识库
  sections:
    '日常问题解决方案': [100, 199]
    '移动端开发笔记': [200, 299]
    '前端学习笔记': [300, 399]
    '在线工具': [400, 499]
```

然后笔记页面的 `front-matter` 中指定要高亮的 `menu_id`：

```yaml blog/source/notes/index.md
---
layout: wiki
wiki: Notes
menu_id: notes
---
```

这样就可以啦～
