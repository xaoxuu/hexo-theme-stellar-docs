---
date: 2023-12-06 21:55
updated: 2026-08-27 22:49
title: 探索个性化配置
collection:
  profile: wiki
  id: hexo-stellar
---

## 主题色

支持 `HEX` & `HSL` 表示颜色

```yaml blog/_config.stellar.yml
appearance:
  colors:
    primary: 'hsl(192 98% 55%)' # 主色
    accent: 'hsl(14 100% 57%)' # 强调色
    link: 'hsl(207 90% 54%)' # 超链接颜色
```

## 字体

> 请注意使用字体的版权问题！

### 系统字体

```yaml blog/_config.stellar.yml
appearance:
  typography:
    font_size:
      root: 16px # 桌面端字号基准；移动端自动增加 2px
      inline_code: 85% # 14px
      code_block: 0.8125rem # 13px
    font_family:
      body: 'system-ui, "Microsoft Yahei", "Segoe UI", Arial, sans-serif'
      code: 'Menlo, Monaco, Consolas, system-ui, monospace, sans-serif'
```

字号基准由 `root` 统一控制：桌面端使用配置值，移动端在此基础上增加 2px；story 布局在当前页面基准上再增加 2px。页面字号基准使用 `--fs-content-base`，组件字号使用 `--fs-content`。旧的 `style.font-size.body` 字段已移除，不再生效。

### 外部字体

要想引用外部字体，你需要先在 `_config.yml` 中 `inject` 引入

举例，引用 [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC?query=noto+&subset=chinese-simplified) 在 `_config.stellar.yml` 中写入

```yaml blog/_config.stellar.yml
inject:
  head_end: |-
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC&display=swap" rel="stylesheet">
```

并在 `_config.stellar.yml` 中填写你引入的字体名称

```yaml blog/_config.stellar.yml
appearance:
  typography:
    font_family:
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

## 侧栏艺术渐变

主题默认使用不需要图片的 Glass 艺术渐变侧栏。浅色和深色模式各有一套调色板，主题使用它们生成多层径向与锥形色块。默认值等价于：

```yaml blog/_config.stellar.yml
appearance:
  backgrounds:
    leftbar:
      surface: glass
      type: gradient
      image:
      gradient:
        light: ['hsl(210 32% 84%)', 'hsl(188 44% 84%)', 'hsl(12 64% 73%)', 'hsl(35 100% 82%)']
        dark: ['hsl(210 16% 48%)', 'hsl(188 18% 50%)', 'hsl(12 30% 42%)', 'hsl(35 36% 49%)']
      opacity: 1
      backdrop:
        radius: 100px
        overlay: var(--bg-a50)
```

这两套 HSL 保留了旧默认侧栏图片经过模糊和遮罩后的冷灰、青蓝、珊瑚与砂金色关系。如果只想调整一种模式，只覆盖对应调色板即可：

```yaml blog/_config.stellar.yml
appearance:
  backgrounds:
    leftbar:
      gradient:
        dark: ['hsl(220 18% 48%)', 'hsl(170 20% 50%)', 'hsl(330 30% 42%)', 'hsl(45 36% 49%)']
```

`light` 和 `dark` 列表都必须恰好包含四个合法 CSS 颜色，顺序依次为基础色、左上色块、右中色块和左下色块。除了 HSL，也可以使用 Hex、RGB 或 CSS 颜色变量。渐变继续使用 `opacity`、`backdrop.radius` 和 `backdrop.overlay`；`surface: card` 会隐藏装饰背景。

`type` 显式决定背景类型，可选 `gradient`、`image` 或 `color`。使用图片时不需要清空渐变，直接选择图片类型：

```yaml blog/_config.stellar.yml
appearance:
  backgrounds:
    leftbar:
      type: image
      image: /images/sidebar.webp
```

选择 `color` 时使用 `color.light/dark`。主题只消费选中类型的参数，不会因为渐变调色板非空而覆盖图片。如果希望图片保留旧默认观感，可另外显式设置 `opacity: 0.8` 和 `backdrop.overlay: var(--bg-a60)`。不支持 CSS gradient 的浏览器会显示当前模式调色板的第一个基础色。

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
> Glass 侧栏的背景层、容器、玻璃高光和遮罩层会共享同一连续曲率；无论是否配置背景图片，四角都不会因覆盖层曲率不一致而出现亮沿。
> 文章列表封面、置顶轮播、页面顶部横幅与 `{% banner %}` 标签的背景图覆盖层统一采用「同图模糊层」（filter + mask）实现，以兼容连续曲率圆角（Chromium 的 corner-shape 裁剪与 backdrop-filter 不兼容），并在文字所在边缘常驻黑色渐变蒙版（边缘不透明度约 0.25，垂直中线为 0）；hover 时背景图与模糊层同步缓慢放大（scale 1.05）并整体变暗（亮度 75%、饱和度 120%）。
> 封面/轮播/横幅的图片角落同样跟随该配置：图片 URL 由容器自身背景承载（Chromium 的 `corner-shape` 只作用于元素自身背景绘制，不会传递给子图片的 overflow 裁剪），因此角落与其它元素观感一致；Safari/Firefox 不支持 `corner-shape`，自动回退普通圆角。

## 卡片鼠标光效与倾斜

Stellar 可以为文章、笔记、笔记本、Wiki 项目、置顶轮播、专栏列表的最新文章、`{% link %}` 链接卡片和 `{% grid bg:card %}` 单元格启用鼠标跟随光斑与轻量 3D 倾斜；Wiki Hero 操作按钮、搜索结果链接及菜单、摘要列表、文档树、链接网格和 dropdown 等标准 UI Collection 条目只启用光斑，不会倾斜。默认关闭：

```yaml blog/_config.stellar.yml
extensions:
  features:
    card_hover:
      enabled: false
```

光斑颜色与最大倾斜角由主题内部维护，不作为公开配置。

单个自定义组件也可以复用同一能力：

```html
<div class="card-hover card-hover--spotlight card-hover--tilt">
  ...
</div>
```

其中 `.card-hover` 接入通用生命周期，两个修饰类可以按需单独使用；光斑颜色可在组件上用 `--card-hover-spotlight-color` 覆盖。动态插入组件后可调用 `stellar.cardHover.mountAll(root)`，移除动态容器前可调用 `stellar.cardHover.unmountAll(root)`，销毁全部实例时调用 `stellar.cardHover.destroy()`。

鼠标离开时，倾斜会立即回正，光斑则停在最后指针位置淡出，不会先闪回卡片中心；完全透明后才会无感复位。键盘聚焦时只显示居中光斑。触屏、非精细指针和系统“减少动态效果”模式下会自动停用动态效果；插件关闭或脚本加载失败时，组合类不会影响链接点击与原有卡片样式。搜索结果仅可点击的章节/摘要链接参与光效，不会倾斜或上浮，链接外的页面标题保持静止。轮播内部切换轨道、专栏标题/描述/归档式文章条目、非 Collection 的侧栏组件、TOC、sites、albums、posters 与 chat 内嵌链接不参与倾斜效果。

## 页面缓入效果

```yaml blog/_config.stellar.yml
extensions:
  features:
    reveal:
      enabled: true
```

Reveal 使用浏览器原生 `IntersectionObserver` 和 Web Animations API，不加载第三方动画脚本。只提供 `enabled` 开关，动画距离、时长、错峰和缩放由主题统一维护。页面首次显示时已经位于视口内的内容直接显示，之后滚入视口的内容才播放动画。页面内容默认可见；浏览器不支持相关 API、系统开启“减少动态效果”或运行时初始化失败时会直接显示内容，不会因动画失效而留下空白区域。

## 图片懒加载

```yaml blog/_config.stellar.yml
extensions:
  features:
    lazy_loading:
      transition: fade # blur / fade
      auto_aspect_ratio: true
```

开启 `auto_aspect_ratio` 时，Hexo server 开发模式会扫描 `{% image %}` 标签并把 `ratio:W/H` 写回 Markdown，防止懒加载时页面高度跳变；生产构建不会改写源文件。

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
  index_blog:
    navigation:
      tabs: # 近期发布 分类 标签 归档 and ...
        '朋友文章': /friends/rss/ # 链接需与对应页面一致
```

顶部 tab 栏（navbar top）的背景条在页面顶部未滚动/未吸顶时为卡片样式（`var(--card)` 底色 + 文章卡片同款阴影），页面滚动 2px 后吸顶恢复玻璃效果；回到顶部恢复卡片样式。

## 置顶内容轮播

置顶内容的展示样式由 `article.pin_style` 控制，默认 `carousel`（轮播），可切换为 `flat`（平铺）。

- `carousel`（默认）：所有带顶部 tab 栏的博客类列表页（首页/归档/标签/分类/专栏等）上方自动展示置顶文章轮播，无需开关配置；只要有置顶内容即渲染，自动轮播间隔固定 5000ms，首页第一页列表不再重复展示置顶文章。
- `flat`（平铺）：博客类列表页不渲染文章轮播；首页第一页文章列表顶部按轮播同款规则展示全部置顶文章（含超出单页切片的老文章），同页不重复；归档/分类/标签/首页第二页起的列表中置顶文章按日期正常出现。

置顶文章在 `front-matter` 中设置 `listing.priority`：必须是大于 `0` 的有限数字，数字越大越靠前，权重相同保持原顺序。

```yaml
listing:
  priority: 10
```

- Wiki 列表页展示置顶项目：在 `source/_data/wiki/*.yml` 中设置 `listing.priority`，规则同上。
- wiki 置顶项目始终以轮播展示，不受 `article.pin_style` 影响。
- 轮播区宽高比与非置顶文章统一，由 `article.cover_ratio` 控制（修改该值即可整体调整）。
- 置顶文章卡片的标题取 `title`，小字取 `card.tagline` > `description` > excerpt，封面只取 `card.cover`。
- 鼠标悬停轮播区时左右两侧显示翻页按钮（样式同 swiper 导航按钮），点击切换上一张/下一张。
- 没有置顶内容时不渲染；置顶文章卡片不再显示置顶图标（由轮播展示）。

## 阅读信息与文章标签

文章页顶部横幅第一行右侧可以显示字数和预计阅读时长（默认关闭）；文章卡片可以在时间/分类那行小字旁显示标签（标签前缀为 hashtag 图标，最多 5 个，默认关闭）；文章页正文结束后、页脚（`article-footer`）之前默认显示一行本文标签（胶囊样式，点击进入对应标签页）：

```yaml
content:
  article:
    show_reading_time: false
    listing:
      show_tags: false
    footer:
      show_tags: true
```

三个配置可以独立开关。

## AI 成分标签

文章可以在 front matter 或 Collection 中用 `article.ai_label` 标记 AI 成分：`manual`、`reviewed`、`polished`、`generated`。未设置时不显示。

```yaml
article:
  ai_label: reviewed
```

文案由多语言系统提供（`languages/*.yml` 的 `meta.ai_label.*`，随站点语言切换；缺失翻译时标签不渲染），颜色与图标由主题内部固定，不提供全局样式配置。

自定义文案需修改主题语言文件（`languages/*.yml`）。

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
    links:
      type: dropdown
      icon: default:documents
      title: 更多链接
      items:
        - icon: default:documents
          title: 文档
          url: /wiki/
        - icon: default:github
          title: GitHub
          url: https://github.com/
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

然后配置 `highlight_stylesheet`：

```yaml blog/_config.stellar.yml
appearance:
  code_block:
    highlight_stylesheet: https://gcore.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/atom-one-dark.min.css
```

## 外部文件注入

在主题配置文件中修改 `inject.head_end` 以在 `<head>` 标签末尾注入原文，修改 `inject.body_end` 以在 `<body>` 标签末尾注入原文。两项都只接受字符串，不接受数组。

```yaml blog/_config.stellar.yml
inject:
  head_end: |-
    <meta name="msapplication-TileColor" content="#2d89ef">
    <meta name="msapplication-config" content="https://gcore.jsdelivr.net/gh/cdn-x/xaoxuu@main/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
  body_end: |-
    <script async src="https://gcore.jsdelivr.net/npm/jquery@3.5/dist/jquery.min.js"></script>
```

### 不蒜子统计插件

直接贴到要显示的地方（支持 `markdown` 的组件）就行：

```yaml blog/_config.stellar.yml
site:
  footer:
    content: |
      <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
      <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
