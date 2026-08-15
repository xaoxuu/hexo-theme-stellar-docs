---
date: 2023-12-06 21:55
updated: 2026-08-15 19:20
wiki: hexo-stellar
title: 探索个性化配置
---

## 主题色

支持 `HEX` & `HSL` 表示颜色

```yaml blog/_config.stellar.yml
style:
  ...
  color:
    theme: 'hsl(192 98% 55%)' # 主题色
    accent: 'hsl(14 100% 57%)' # 强调色
    link: 'hsl(207 90% 54%)' # 超链接颜色
```

## 字体

> 请注意使用字体的版权问题！

### 系统字体

```yaml blog/_config.stellar.yml
style:
  font-size:
    root: 16px
    body: .9375rem # 15px
    code: 85% # 14px
    codeblock: 0.8125rem # 13px
  font-family:
    body: 'system-ui, "Microsoft Yahei", "Segoe UI", Arial, sans-serif'
    code: 'Menlo, Monaco, Consolas, system-ui, monospace, sans-serif'
    codeblock: 'Menlo, Monaco, Consolas, system-ui, monospace, sans-serif'
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

但是我个人并不推荐引用本地字体，相比于英文字体，中文字体囊括了众多的字符，这也无法避免地导致字体文件体积的增加，如果你想使用自己的字体而找不到在线的字体引入链接，可以自行制作字体的 `woff2` 切片来减少对网页加载速度的影响。

## 背景图片

此功能在 {% mark 1.26.4 %} 中支持，可以设置：纯色/渐变色/图片作为背景。未完全适配，慎用！

```yaml blog/_config.stellar.yml
style:
  ...
  site:
    background-image: #'url(https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.14/image/site-bg1@small.webp)'
    blur-px: 100px # 模糊半径
    blur-bg: var(--bg-a75) # 模糊颜色
```

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

## 圆角大小

这个功能在 {% mark 1.18.1 color:dark %} 版本后开始支持。

```yaml blog/_config.stellar.yml
style:
  ...
  border-radius:
    card: 12px # 卡片圆角
    block: 12px # 块圆角
    bar: 12px # 横条类元素圆角（navbar top、float-panel、分页器等）
    image: 6px # 图片圆角
```

### 连续曲率圆角（squircle）

默认开启，将圆角从普通圆弧升级为曲率连续的 squircle 曲线（`superellipse(1.25)`，介于圆弧与完整 squircle 之间），且自动适配任意容器宽高、响应式尺寸与胶囊形按钮。该效果仅 Chromium 139+ 原生支持，其余浏览器自动回退为普通圆角，不影响显示。

```yaml blog/_config.stellar.yml
style:
  ...
  corner-shape: superellipse(1.25) # superellipse(1.25) 开启，round 关闭；可改 superellipse(2) 增强为完整 squircle
```

> 头像、圆点等需要保持正圆的元素不受此配置影响，仍为圆形。
> 文章卡片与横幅的渐变模糊层采用「同图模糊层」（filter + mask）实现，以兼容连续曲率圆角（Chromium 的 corner-shape 裁剪与 backdrop-filter 不兼容）；hover 位移动画由卡片外层容器承载。

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
# 基础依赖
dependencies:
  ...
  lazyload:
    js: https://gcore.jsdelivr.net/npm/vanilla-lazyload@19.1/dist/lazyload.min.js
    transition: fade # blur, fade
    fix_ratio: true # true / false
```

开启 `fix_ratio` 时，使用 `{% image %}` 标签的图片会被固定长宽比，防止懒加载时页面高度发生跳变。需要至少先本地运行一次 `hexo s` 以完成图片比例数据填充。

JS 动态插入的图片（例如置顶内容轮播）会被自动注册到懒加载，无需手动调用更新。

## 按需加载

主题的资源按需加载，无需额外配置：swiper、fancybox、mermaid 与评论系统的样式/脚本只在页面出现对应元素时加载，`main.css` 仅包含基础与防闪烁样式；`utils`、主题切换、数据服务等脚本外置为独立文件并被浏览器缓存，减少每个页面的 HTML 体积。

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

您可以在 `wiki` 项目的封面开始按钮处设置渐变色 CSS 代码

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

## 置顶内容轮播

置顶内容的展示样式由 `article.pin_style` 控制，默认 `carousel`（轮播），可切换为 `flat`（平铺）。

- `carousel`（默认）：所有带顶部 tab 栏的博客类列表页（首页/归档/标签/分类/专栏等）上方自动展示置顶文章轮播，无需开关配置；只要有置顶内容即渲染，自动轮播间隔固定 5000ms，首页第一页列表不再重复展示置顶文章。
- `flat`（平铺）：博客类列表页不渲染文章轮播；首页第一页文章列表顶部按轮播同款规则展示全部置顶文章（含超出单页切片的老文章），同页不重复；归档/分类/标签/首页第二页起的列表中置顶文章按日期正常出现。

置顶文章判定与排序（两种样式通用）：在文章 `front-matter` 中设置 `pin: true|number`（兼容 `sticky` 别名，设置即置顶，数字越大越靠前，`true` 视作 1，0/负数同样参与，非数字视作 0，权重相同保持原顺序）。

- wiki 列表页展示置顶的 wiki 项目：在项目数据文件（`source/_data/wiki/*.yml`）中设置 `pin: true|number`，规则同上。
- wiki 置顶项目始终以轮播展示，不受 `article.pin_style` 影响。
- 轮播区宽高比与非置顶文章统一，由 `article.cover_ratio` 控制（修改该值即可整体调整）。
- 置顶文章卡片为固定「标题 + 一行小字」结构：标题取 `poster.headline` > `title`，小字取 `poster.caption` > `description` > excerpt（截断 50 字）；文字区采用与 poster 卡片同款渐变模糊层与底部渐变背景（盒模型为 padding 1rem、宽度铺满）；有封面时封面铺满，无封面时为纯白卡片（文字按普通文章颜色）。
- 鼠标悬停轮播区时左右两侧显示翻页按钮（样式同 swiper 导航按钮），点击切换上一张/下一张。
- 没有置顶内容时不渲染；置顶文章卡片不再显示置顶图标（由轮播展示）。

## 阅读信息与文章标签

文章页顶部面包屑行右侧可以显示字数和预计阅读时长（默认关闭）；文章卡片可以在时间/分类那行小字旁显示标签（纯文字，最多 5 个，默认关闭）；文章页正文结束后、页脚（`article-footer`）之前默认显示一行本文标签（胶囊样式，点击进入对应标签页）：

```yaml
article:
  reading_time: false # 文章页显示字数与预计阅读时长（默认关闭）
  card_tags: false    # 文章卡片显示标签（最多 5 个，默认关闭）
  tags: true          # 文章页末尾显示本文标签，链接到标签页（默认开启）
```

三个配置可以独立开关。

## AI 成分标签

文章可以在 front-matter 中用 `ai_label` 字段标记 AI 成分：`manual`（本文完全由人类完成）、`reviewed`（已 AI 审核）、`polished`（已 AI 润色）、`generated`（由 AI 生成）。未设置 `ai_label` 时取 `article.ai_label.default`：为空则不显示，非空（如 `manual`）则按该档渲染。文章页显示在顶部面包屑行最右（阅读时长右侧），为彩色文字（无底色）；当文章 banner 含图片时，标签文字使用默认颜色。文章列表卡片不显示该标签。

文案由多语言系统提供（`languages/*.yml` 的 `meta.ai_label.*`，随站点语言切换；缺失翻译时标签不渲染），颜色与图标由 `article.ai_label` 配置，主题提供默认值，可按需覆盖：

```yaml
article:
  ai_label:
    default: # 未设置 ai_label 时取此值；为空则不显示
    manual:
      color: '#03a9f4'
      icon: solar:shield-user-bold-duotone
    reviewed:
      color: '#4caf50'
      icon: solar:shield-check-bold-duotone
    polished:
      color: '#4caf50'
      icon: solar:shield-up-bold-duotone
    generated:
      color: '#ff9800'
      icon: solar:shield-warning-bold-duotone
```

每档可选配 `icon`（取值同站内图标系统，如 `solar:...`），渲染在标签文案前。自定义文案需修改主题语言文件（`languages/*.yml`）。

## 站点地图

页面底部的站点导航，你也可以在 `content` 中自定义一些文字信息，支持 Markdown 格式。

```yaml
footer:
  social:
    github:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/social/08a41b181ce68.svg"/>'
      url: /
    music:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/social/3845874.svg"/>'
      url: /
    unsplash:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/social/3616429.svg"/>'
      url: /
    comments:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.12/social/942ebbf1a4b91.svg"/>'
      url: /about/#comments
  sitemap:
    - title: 博客
      items:
        - '[近期发布](/)'
        - '[分类](/blog/categories/)'
        - '[标签](/blog/tags/)'
        - '[归档](/blog/archives/)'
    - title: 项目
      items:
        - '[开源项目](/wiki/tags/开源项目/)'
        - '[实用工具](/wiki/tags/实用工具/)'
        - '[应用程序](/wiki/tags/应用程序/)'
        - '[知识库](/wiki/tags/知识库/)'
  content: | # 支持 Markdown 格式
    本站由 [{author.name}](/) 使用 [{theme.name} {theme.version}]({theme.tree}) 主题创建。
    本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。
    <span class="jinrishici-sentence"></span>
    <script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
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

然后再找到 `highlightjs_theme` 修改 css 链接：

```yaml blog/_config.stellar.yml
style:
  codeblock:
    highlightjs_theme: https://gcore.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css
```

## 外部文件注入

在主题配置文件中进行修改 `inject.head` 以在 `<head>` 标签末尾处注入代码，修改 `inject.script` 以在 `<body>` 标签末尾处注入代码。

```yaml blog/_config.stellar.yml
inject:
  head:
    - <meta name="msapplication-TileColor" content="#2d89ef">
    - <meta name="msapplication-config" content="https://gcore.jsdelivr.net/gh/cdn-x/xaoxuu@main/favicon/browserconfig.xml">
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
