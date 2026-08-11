---
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

如果您想用一个图片作为 logo，可以直接在主题配置文件 logo 中设置：

```yaml blog/_config.stellar.yml
logo:
  avatar: '[{config.avatar}](/about/)' # you can set avatar link in _config.yml or '[https://xxx.png](/about/)'
  title: '[{config.title}](/)' # you can set html tag like: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

### 动态头像

头像 hover 时会出现一个旋转的彩虹光环（`animate: always` 时持续旋转），为纯 CSS 锥形渐变实现，不依赖图片，默认配色与搜索条激活时的底部渐变一致：

```yaml blog/_config.stellar.yml
style:
  gradient:
    avatar: 'conic-gradient(from 0deg, #04f3ff, #08ffc6, #ddf730, #ffbd19, #ff1fe0, #c418ff, #3b5bff, #04f3ff)' # 光环渐变色（彩虹），可自定义
  animated_avatar:
    animate: auto # auto=悬停时动画, always=持续动画, false=关闭
```

## Background（背景）

此功能在 {% mark 1.26.0 %} 中支持，可以设置：纯色/渐变色/图片作为背景。

```yaml blog/_config.stellar.yml
style:
  ...
  leftbar:
    ui-style: card # glass（背景图+磨砂玻璃效果，默认历史行为）/ card（纯色卡片：var(--card) 实色背景 + 中间阴影，默认值）
    background-image: url(https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.13/image/sidebar-bg1@small.jpg)
    blur-px: 100px # 模糊半径
    blur-bg: var(--bg-a60) # 模糊颜色
```

`ui-style` 控制左栏外观：`glass` 为背景图 + 磨砂玻璃效果；`card` 为纯色卡片风格（浅色纯白、深色主题深灰黑），带介于卡片常规与 hover 之间的中间档阴影。默认值为 `card`，设置 `ui-style: glass` 可恢复旧效果。

卡片风格下左栏交互同步切换：菜单与各列表项 hover/active 背景使用 `var(--block-border)`；搜索条底部条默认为 `var(--text-meta)`，输入或悬停时仍显示彩虹渐变。

卡片风格下组件背景同步切换：原本白色半透明的背景（`--bg-a20/a50` 等）显示为 `var(--block)`，与右栏观感一致。

{% folding 关于linear-gradient的用法示例 child:codeblock %}
```css
/* 渐变轴为 45 度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 色标：从下到上，从蓝色开始渐变，到高度 40% 位置是绿色渐变开始，最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 颜色提示：从左到右的渐变，由红色开始，沿着渐变长度到 10% 的位置，然后在剩余的 90% 长度中变成蓝色 */
linear-gradient(.25turn, red, 10%, blue);

/* 多位置色标：45% 倾斜的渐变，左下半部分为红色，右下半部分为蓝色，中间有一条硬线，在这里渐变由红色转变为蓝色 */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```
{% endfolding %}

## Navbar（主导航栏）

自己可以增加任意的键值对，键：就是 menu_id，后面需要用到，值：就是显示的 md 链接，方括号内支持文字和图片标签

```yaml blog/_config.stellar.yml
# 侧边栏主功能导航菜单
menubar:
  columns: 4 # 一行多少个
  items: # 可按照自己需求增加，符合以下格式即可
    # - id: post # 页面中高亮的 menu_id
    #   theme: '#1BCDFC' # 激活/悬停时的主题色，图标与圆点会以该颜色生成渐变
    #   icon: solar:documents-bold-duotone # 支持 svg/img 标签，可以定义在 icons.yml 文件中，也支持外部图片的 URL
    #   title: 博客 # 标题
    #   url: / # 跳转链接，支持相对路径和绝对路径
    # - id: wiki
    #   theme: '#3DC550'
    #   icon: solar:notebook-bookmark-bold-duotone
    #   title: 文档
    #   url: /wiki/
    # - id: explore
    #   theme: '#FA6400'
    #   icon: solar:planet-bold-duotone
    #   title: 探索
    #   url: /explore/
    # - id: social
    #   theme: '#F44336'
    #   icon: solar:chat-square-like-bold-duotone
    #   title: 社交
    #   url: /friends/
```

激活/悬停时，图标和圆点使用 `theme` 颜色的渐变：右上角为与白色混合的淡色变体，向底部中间过渡到主色。渐变方向与淡色比例可调整：

```yaml blog/_config.stellar.yml
style:
  gradient:
    angle: 206.6deg # 渐变方向：右上角 → 底部中间（225deg 为 45 度对角线，180deg 为垂直向下）
```

左栏其它需要显示彩色图标的场景同样使用该渐变：wiki 目录树、专栏相关文章、链接列表的激活项右侧书签图标（以及链接列表激活/悬停时的彩色 item 图标），颜色与角度跟随上面的配置。

激活/悬停时菜单项及左栏列表项（最近更新、页面树、链接列表等）使用半透明背景高亮，并在顶部叠加轻微白色光照渐变与高光边，深色模式下透明度自动降低。

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

## Search（搜索）

{% tabs align:left %}

<!-- tab local_search -->

在 {% mark 1.17.1 color:dark %} 版本后开始支持，无需安装插件，默认开启。

```yaml blog/_config.stellar.yml
# 文章搜索
search:
  service: local_search # local_search, todo...
  local_search:
    field: all # post, page, all
    path: /search.json # 搜索文件存放位置
    content: true # 是否搜索内容
    skip_search: [] # 指定 path 中的内容不被搜索。
    codeblock: true # 是否搜索代码块（需要content: true)
```

如果想要过滤某些页面，可以在 `front-matter` 中设置 `indexing: false` 来避免被搜索索引，或者在 `local_search` 中指定 `skip_search` 的空数组，格式如下

```yaml blog/_config.stellar.yml
skip_search: ['about*', 'post/2023*']
```

需要使用通配符 `*` 来匹配路径，以上配置将会忽略所有以 `about` 开头和以 `post/2023` 开头的页面。

<!-- tab algolia_search -->

首先你的需要是技术类博客或者项目文档，然后你才能申请 DocSearch ，会有人工审核。

{% link https://docsearch.algolia.com/apply/ %}

几个小时之后就会回复你一封邮件，附有有你的 `appId` `apiKey` `indexName` 填入其中即可。

```yaml blog/_config.stellar.yml
search:
  service: algolia_search
  algolia_search:
    appId: 'xxxxx'
    apiKey: 'xxxxxxxxxxxx'
    indexName: 'xxxxxxxx'
```

<!-- tab others -->

请提交PR...

{% endtabs %}

在 `_config.stellar.yml` 中设置搜索选项，现在 `search` 组件的位置固定，暂不支持更改。

但你仍可以在某些页面中通过覆盖 search 组件的 filter 参数来定制化搜索范围，例如 `wiki` 或 `笔记` 页面的配置中:

```yaml blog/source/_data/wiki/xxx.yml
search:
  filter: /wiki/stellar/
  placeholder: 在 Stellar 中搜索...
```

## Footer（页脚）

```yaml blog/_config.stellar.yml
footer:
  social:
    github:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder/social/08a41b181ce68.svg"/>'
      url: https://
    music:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder/social/3845874.svg"/>'
      url: https://
    unsplash:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder/social/3616429.svg"/>'
      url: https://
    comments:
      icon: '<img src="https://gcore.jsdelivr.net/gh/cdn-x/placeholder/social/942ebbf1a4b91.svg"/>'
      url: https://
```

## 自定义组件

Stellar 支持丰富的自定义小组件，详见这篇文档：

{% link https://xaoxuu.com/wiki/stellar/widgets/ desc:true %}
