---
layout: wiki
wiki: hexo-stellar
title: 探索个性化配置
---

## 主题色

支持 `HEX` & `HSL` 表示颜色

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
  font-size:
    root: 16px
    body: .9375rem # 15px
    code: 85% # 14px
    codeblock: 0.8125rem # 13px
  font-family:
    logo: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    body: 'system-ui, "Microsoft Yahei", "Segoe UI", -apple-system, Roboto, Ubuntu, "Helvetica Neue", Arial, "WenQuanYi Micro Hei", sans-serif'
    code: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
    codeblock: 'Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif'
```

### 外部字体

要想引用外部字体，你需要先在 `_config.yml` 中 `inject` 引入

举例，引用 [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC?query=noto+&subset=chinese-simplified) 在 `_config.stellar.yml` 中写入

```yaml blog/_config.stellar.yml
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
  ...
  text-align: left # justify/left/center/right
```

## 代码块复制

```yaml blog/_config.stellar.yml
copycode:
  enable: true
  js: /js/plugins/copycode.js
  default_text: 'Copy' # 按钮显示文字
  success_text: 'Copied' # 复制成功信息
```

## 链接下划线

```yaml blog/_config.stellar.yml
link:
  underline: true # true / false
```

## 圆角大小

这个功能在 {% mark 1.18.1 color:dark %} 版本后开始支持。

```yaml blog/_config.stellar.yml
style:
  ...
  border-radius:
    card: 12px # 卡片圆角
    block: 12px # 块圆角
    bar: 6px # 导航栏圆角
    image: 6px # 图片圆角
```

## 页面缓入效果

```yaml blog/_config.stellar.yml
# 默认关闭
scrollreveal:
  enable: false
  js: https://gcore.jsdelivr.net/npm/scrollreveal@4.0.9/dist/scrollreveal.min.js
  distance: 4px # 执行距离
  duration: 400 # ms # 执行时长
  interval: 100 # ms # 执行间隔（时间）
  scale: 0.1 # 0.1~1 # 执行方式（缩放）
```

{% note color:warning 此效果会和图片懒加载插件冲突，导致部分卡片和footer可能加载不出来 %}

## 图片懒加载

```yaml blog/_config.stellar.yml
# 默认打开
lazyload:
  enable: true # [hexo clean && hexo s] is required after changing this value.
  js: https://gcore.jsdelivr.net/npm/vanilla-lazyload@17.3.1/dist/lazyload.min.js
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

## 渐变色

这个功能在 {% mark 1.18.2 color:dark %} 版本后开始支持。

您可以在搜索框与 `wiki` 项目的封面开始按钮处设置渐变色 CSS 代码

```yaml blog/_config.stellar.yml
style:
  ...
  gradient: # https://webgradients.com/
    start: 'linear-gradient(to right, #92fe9d 0%, #00c9ff 50%, #92fe9d 100%)'
    search: 'linear-gradient(to right, #04F3FF, #08FFC6, #DDF730, #FFBD19, #FF1FE0, #C418FF, #04F3FF)'
```

当然，如果只想设置纯色的话可以直接设置单色，支持 HEX 和 HSL，例如 `search: 'hsl(212 16% 98%)'`

## 顶部 tab 栏

这个功能在 {% mark 1.25.0 color:dark %} 版本重构。

```yaml blog/_config.stellar.yml
site_tree:
  blog:
    nav_tabs: # 近期发布 分类 标签 归档 and ...
      '朋友文章': /friends/rss/ # 这里填写的链接要与对应页面一致，否则可能无法正确高亮
```

## 站点地图

页面底部的站点导航，你也可以在 `content` 中自定义一些文字信息，支持 Markdown 格式。

```yaml
  sitemap:
    '博客':
      - '[近期](/)'
      - '[分类](/categories/)'
      - '[标签](/tags/)'
      - '[归档](/archives/)'
    '项目':
  #    - '[开源库](/)'
    '社交':
  #    - '[友链](/)'
  #    - '[留言板](/)'
    '更多':
  #    - '[关于本站](/)'
  #    - '[GitHub](/)'
  content: | # 支持 Markdown 格式
    本站由 [@anonymity](/) 使用 [Stellar](https://github.com/xaoxuu/hexo-theme-stellar) 主题创建。
    本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。
  # 主题用户越多，开发者维护和更新的积极性就越高，如果您喜欢本主题，请在适当的位置显示主题信息和仓库链接以表支持。
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

```yaml blog/_config.stellar.yml
inject:
  head:
    - <link rel="stylesheet" href="https://gcore.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/styles/atom-one-dark.min.css">
```

## 外部文件注入

在主题配置文件中进行修改 `inject.head` 以在 `<head>` 标签末尾处注入代码，修改 `inject.script` 以在 `<body>` 标签末尾处注入代码。

```yaml blog/_config.stellar.yml
inject:
  head:
    - <meta name="msapplication-TileColor" content="#2d89ef">
    - <meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
    - <meta name="theme-color" content="#ffffff">
  script:
    - <script async src="https://gcore.jsdelivr.net/npm/jquery@3.5/dist/jquery.min.js"></script>
```

### 不蒜子统计插件

直接贴到要显示的地方（支持 `markdown` 的组件）就行：

```yaml blog/_config.stellar.yml
footer:
  content: |
    <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
    <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
