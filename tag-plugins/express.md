---
date: 2023-12-06 21:55
updated: 2026-08-14 21:57
wiki: hexo-stellar
title: 表达类标签组件（34+个）
references:
  - '[PR#560 @HcGys](https://github.com/xaoxuu/hexo-theme-stellar/pull/560)'
---

## emoji 表情包

{% tabs %}
<!-- tab 效果演示 -->
内置了可配置的表情标签 {% emoji aini %} {% emoji blobcat 0_0 %} {% emoji tieba huaji %} 使用方法如下：

```
{% emoji aini %}
{% emoji blobcat 0_0 %}
{% emoji tieba huaji %}
```

如果对高度有特别要求，可以指定高度，例如：
<center>{% emoji blobcat party height:1em %}{% emoji blobcat party height:2em %}{% emoji blobcat party height:3em %}{% emoji blobcat party height:2em %}{% emoji blobcat party height:1em %}</center>

```
<center>{% emoji blobcat party height:1em %}{% emoji blobcat party height:2em %}{% emoji blobcat party height:3em %}{% emoji blobcat party height:2em %}{% emoji blobcat party height:1em %}</center>
```

不想引入整套表情包时，也可以用 `url:` 直接引用一张外部图片作为表情，例如：

```
{% emoji url:https://emoticons.hzchu.top/emoticons/azukisan/003.png %}
{% emoji url:https://emoticons.hzchu.top/emoticons/azukisan/003.png name:阿梓 height:2em %}
```

`name` 可选，作为图片的 `alt` 文本；`height` 用法同上。

<!-- tab 语法格式 -->

```
{% emoji [source] name [height:1.75em] %}
{% emoji url:图片地址 [name:alt] [height:1.75em] %}
```

其中 `source` 可省略，默认为配置中的第一个 `source`（详见「引入表情包」部分）

> 表情速查表：[Stellar内嵌blobcat小表情](https://weekdaycare.cn/posts/emoji-blob/)

<!-- tab 引入表情包 -->

```yaml blog/_config.stellar.yml
tag_plugins:
  ...
  emoji:
    default: https://gcore.jsdelivr.net/gh/cdn-x/emoticons/qq/{name}.gif
    twemoji: https://gcore.jsdelivr.net/gh/twitter/twemoji/assets/svg/{name}.svg
    qq: https://gcore.jsdelivr.net/gh/cdn-x/emoticons/qq/{name}.gif
    aru: https://gcore.jsdelivr.net/gh/cdn-x/emoticons/aru-l/{name}.gif
    tieba: https://gcore.jsdelivr.net/gh/cdn-x/emoticons/tieba/{name}.png
```

> 在配置文件中，文件名用 `{name}` 代替。

{% endtabs %}

## icon 图标标签

支持在任意{% icon solar:planet-bold-duotone %}位置插入图标，支持外链{% icon https://api.iconify.design/fluent-color:link-multiple-20.svg?color=%23888888 %}图标，也可以在 icons.yml 中提前配置好。

**{% icon ph:seal-question-fill color:purple %}可以指定图标的颜色吗？**

当然可以，还可以在主题配置中设置默认颜色：

```md 写法如下
icons.yml 中的图标：{% icon solar:planet-bold-duotone %}
外链图标：{% icon https://api.iconify.design/solar:link-circle-bold.svg %}
指定颜色：{% icon ph:seal-question-fill color:red %}
```

```yaml 配置默认颜色
tag_plugins:
  icon:
    # 留空时，图标和文字颜色相同
    default_color: accent # theme, accent, red, orange, yellow, green, cyan, blue, purple
```

> 还支持 style 参数，可以直接对样式进行修改，仅支持外链图标，style 参数中间不能有空格。

### 内置图标

主题内置图标统一存放在 `_data/icons.yml`（单一数据源），键格式为 `namespace:icon-name`，可直接作为 `icon` 参数使用。常用命名空间：

| 命名空间 | 用途 | 示例 |
|----------|------|------|
| `solar:` | 主视觉图标：翻页 / 轮播、侧边栏小部件、文章徽标、微博转发 / 点赞 | `solar:planet-bold-duotone` |
| `default:` | 主题功能图标：返回、复制、下载、分类、日期、评论、加载、占位兜底等 | `default:goback` |
| `github:` | GitHub 仓库卡片 | `github:star` |
| `share:` | 文章分享按钮 | `share:wechat` |
| `chat:` | chat 聊天标签：浏览器来源、文件类型、界面控件 | `chat:qq` |
| `ph:` / `bxs:` | quot 强调引用图标 | `bxs:quote-left` |
| `vote:` / `rating:` | 投票 / 评分插件 | `vote:thumbsup` |

站点可在 `source/_data/icons.yml` 中覆盖或补充同名键，无需修改主题。

## vote 投票

这个功能在 {% mark 1.33.0 %} 版本后开始支持，需要自部署一个 [star-vote](https://github.com/xaoxuu/star-vote) 开源项目，支持部署到 vercel 并搭配 leancloud 使用。

{% tabs %}
<!-- tab 效果 -->
{% vote id:default Stellar 是最好的 hexo 主题吗？ %}
<!-- tab 代码 -->
```
{% vote id:default Stellar 是最好的 hexo 主题吗？ %}
```
支持自定义图标，支持和反对分别是 `yes` 和 `no`：
```
{% vote id:default yes:solar:round-double-alt-arrow-up-bold no:solar:round-double-alt-arrow-down-bold 自定义图标 %}
```
自定义图标遵循 icon 标签的规则，但是为了正常高亮，建议在本地的 `icon.yml` 文件中配置而不要使用在线图标。
{% vote id:default yes:solar:round-double-alt-arrow-up-bold no:solar:round-double-alt-arrow-down-bold 自定义图标 %}
{% endtabs %}

## rating 评分

这个功能在 {% mark 1.33.0 %} 版本后开始支持，需要自部署一个 [star-vote](https://github.com/xaoxuu/star-vote) 开源项目，支持部署到 vercel 并搭配 leancloud 使用。

{% tabs %}
<!-- tab 效果 -->
{% rating id:default 给 Stellar 五星好评吧～ %}
<!-- tab 代码 -->
```
{% rating id:default 给 Stellar 五星好评吧～ %}
```
支持自定义图标，`icon`：
```
{% rating id:default icon:https://api.iconify.design/twemoji:star-struck.svg 自定义图标遵循 icon 标签的规则 %}
```
{% rating id:default icon:https://api.iconify.design/twemoji:star-struck.svg 自定义图标遵循 icon 标签的规则 %}
{% endtabs %}

## mark 标记标签

支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 亮 color:light %} {% mark 暗 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。

```
支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 亮 color:light %} {% mark 暗 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。
```


## hashtag 标签

{% hashtag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% hashtag Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/xaoxuu/ %}
{% hashtag Gitea https://git.xaox.cc/ color:green %}

如果没有指定颜色，且没有设置默认颜色，则随机取一个颜色，快来试试吧～

```
{% hashtag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% hashtag Hexo https://hexo.io/ %}
{% hashtag GitHub https://github.com/xaoxuu/ %}
{% hashtag Gitea https://git.xaox.cc/ color:green %}
```

## image 图片标签

图片标签是一个精心设计的应对各种尺寸插图的标签，对于大图，可以放置一个「下载」按钮，语法格式如下：

```
{% image src [description] [download:bool/string] [width:px] [padding:px] [bg:hex] [fancybox:bool/string] %}
```

```yaml 参数说明
src: 图片地址
description: 图片描述
download: href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width: 200px # 图片宽度
padding: 16px # 图片四周填充宽度
bg: '#ffffff' # 图片区域背景颜色，16进制
fancybox: href # fancybox 放大地址，设置此值后会调用该链接放大，如果放大地址为图片地址，可以设置为 true
```

### 横向铺满的图片

无论在什么宽度的设备上都希望横向铺满的图片，一般不需要额外操作。可以在链接后面写上图片描述，如有必要，可以通过设置 `download:true` 使其显示一个「下载」按钮链接指向图片地址，如果下载链接与显示的图片地址不同，可以 `download:下载链接` 来使其能够下载原图。

{% image https://res.xaox.cc/posts/202401131914137.jpg-hd 图片由 xaoxuu 拍摄于一个普通的阳光明媚的下午 download:https://res.xaox.cc/posts/202401131914137.jpg-hd ratio:1280/960 %}

```md 写法如下
{% image https://res.xaox.cc/posts/202401131914137.jpg-hd 图片由 xaoxuu 拍摄于一个普通的阳光明媚的下午 download:https://res.xaox.cc/posts/202401131914137.jpg-hd ratio:1280/960 %}
```

### 竖图（小图）优化

宽度较小而高度较大的图片，可以设置宽、高、填充间距、背景色等对其布局进行优化，使得它在不同宽度的屏幕下都能获得不错的视觉体验：

{% tabs %}

<!-- tab 限制宽度 -->

{% image https://res.xaox.cc/posts/202401131924265.jpg-hd width:350px 图片由 xaoxuu 拍摄于 Dattle 幼年时期 ratio:720/1080 %}

```
{% image https://res.xaox.cc/gh/cdn-x/xaoxuu@main/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white ratio:526/902 %}
```

{% folding 如果不进行约束，在宽屏设备上会占用很大篇幅 %}
{% image https://res.xaox.cc/posts/202401131924265.jpg-hd  ratio:720/1080 %}
{% endfolding %}

<!-- tab 设置填充区域 -->

可以设置填充宽度和颜色，支持 `bg:var(--card)` 动态颜色，能够适配暗黑模式：

{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg bg:var(--card) padding:16px width:100px ratio:512/512 %}

```
{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg bg:var(--card) padding:16px ratio:512/512 %}
```

{% endtabs %}

### 支持 Fancybox 插件点击放大

由于 Stellar 主题的插件具有按需加载的特性，所以 Fancybox 插件默认也是已经配置好了的，在任意 `image` 标签中增加 `fancybox:true` 参数即可为特定图片开启缩放功能。如果一个页面没有任何地方使用，则不会加载 Fancybox 插件。

{% image fancybox:true https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Apple_Shot-on-iphone-macro-challenge_Cat_big.jpg.large_2x.jpg download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Images-of-Shot-on-iphone-macro-challenge.zip 图片来自 Apple 官网 ratio:1960/1470 %}

如果您希望全站所有的 `image` 标签都开启此功能，可在主题配置文件中修改以下参数：

```yaml blog/_config.stellar.yml
######## Tag Plugins ########
tag_plugins:
  # {% image %}
  image:
    fancybox: false
```

从 1.28.1 版本开始，如果想在页面中展示较小的图片，但在 fancybox 中展示较大的高清的图片，可以用 `fancybox:大图链接` 参数。

## blockquote 段落引用

这个是标准写法 `> 引用内容` 的增强版本，适合不太强调的、大段落的引用。

{% tabs %}
<!-- tab 效果对比 -->

> 这是使用 "> 引用" 写法的例子

{% blockquote %}
这是使用 blockquote 标签的例子
{% endblockquote %}

<!-- tab 写法 -->

```
> 这是使用 "> 引用" 写法的例子

{% blockquote %}
这是使用 blockquote 标签的例子
{% endblockquote %}
```

{% endtabs %}


两者的区别在于：

- `> 引用` 写法在技术文章和非技术文章的样式不同，适配各自的风格
- `blockquote` 标签写法则始终表现为非技术文章的样式

> 因为本文是技术文章，所以你能看出两者样式的明显区别，而在非技术文章中，两者写法的样式是一样的。

{% note 题外话 本来这个叫 quote，但是发现文章显示不全，和 box 标签以前命名为 noteblock 时的表现一样，可能又命中了 hexo 某些隐藏彩蛋。 %}

## quot 强调引用

适合居中且醒目的引用：{% quot Stellar 是迄今为止最好用的主题 %}

支持自定义引号：{% quot 热门话题 icon:hashtag %}

其中自定义引号素材在主题配置文件的 `tag_plugins.quot` 中配置：

```yaml
tag_plugins:
  ...
  # {% quot %}
  quot:
    default: # 可以自行配置多种图标方案，支持icons.yml中配置的图片key，也支持直接设置svg/png等文件链接
      prefix: bxs:quote-left
      suffix: bxs:quote-right
    hashtag:
      prefix: solar:hashtag-square-bold
```

{% folding child:codeblock 写法如下 open:true %}
```
适合居中且醒目的引用：{% quot Stellar 是迄今为止最好用的主题 %}
支持自定义引号：{% quot 热门话题 icon:hashtag %}、{% quot 特别引用 icon:default %}
```
{% endfolding %}

{% quot 特别引用 icon:default %}

> 此外，加上 `el:h2/h3/h4/h5/h6` 可以作为标题使用

### 使用任意图标

从 1.26.5 版本开始，您可以通过 prefix 或 suffix 参数设置任意图标或图片，支持 URL 或 icons.yml 文件中配置，例如：

{% quot prefix:solar:planet-bold-duotone 这是一个 icons.yml 配置的示例 %}

{% quot prefix:https://api.iconify.design/fluent-color:chat-bubbles-question-20.svg?color=%23888888 这是一个 url 的示例 suffix:https://api.iconify.design/fluent-color:drafts-20.svg?color=%23888888 %}


{% folding child:codeblock 写法如下 open:true %}
```
{% quot prefix:solar:planet-bold-duotone 这是一个 icons.yml 配置的示例 %}

{% quot prefix:https://api.iconify.design/line-md:moon-alt-to-sunny-outline-loop-transition.svg 这是一个 url 的示例 suffix:https://api.iconify.design/solar:list-heart-minimalistic-line-duotone.svg %}
```
{% endfolding %}

> 虽然丰富多彩的图标可以使其变得更醒目，但是滥用就会导致文章显得杂乱无章。

## poetry 诗词

{% tabs %}

<!-- tab 示例 -->

{% poetry 游山西村 author:陆游 footer:诗词节选 %}
莫笑农家腊酒浑，丰年留客足鸡豚。
**山重水复疑无路，柳暗花明又一村。**
箫鼓追随春社近，衣冠简朴古风存。
从今若许闲乘月，拄杖无时夜叩门。
{% endpoetry %}

<!-- tab 写法 -->
```
{% poetry 游山西村 author:陆游 footer:诗词节选 %}
莫笑农家腊酒浑，丰年留客足鸡豚。
**山重水复疑无路，柳暗花明又一村。**
箫鼓追随春社近，衣冠简朴古风存。
从今若许闲乘月，拄杖无时夜叩门。
{% endpoetry %}
```
{% endtabs %}

## paper 纸张标签

{% tabs %}

<!-- tab 示例 -->
{% paper style:underline title:文言文 author:诸葛亮 date:三国 footer:节选 %}
<!-- line left -->
出师表
<!-- paragraph -->
先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
<!-- line right -->
后出师表
<!-- paragraph -->
先帝深虑汉、贼不两立，王业不偏安，故托臣以讨贼也。以先帝之明，量臣之才，固知臣伐贼，才弱敌强也。然不伐贼，王业亦亡。惟坐而待亡，孰与伐之？是故托臣而弗疑也。
{% endpaper %}

<!-- tab 写法 -->
```md
{% paper style:underline title:文言文 author:诸葛亮 date:三国 footer:节选 %}
<!-- line left -->
出师表
<!-- paragraph -->
先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。
<!-- line right -->
后出师表
<!-- paragraph -->
先帝深虑汉、贼不两立，王业不偏安，故托臣以讨贼也。以先帝之明，量臣之才，固知臣伐贼，才弱敌强也。然不伐贼，王业亦亡。惟坐而待亡，孰与伐之？是故托臣而弗疑也。
{% endpaper %}
```

```yaml 可选参数
style: underline/无 # 是否带下划线
title: # 标题
author: # 作者
date: # 日期
footer: # 页脚信息
```

正文中可以设置行段落格式以显示不同的效果

```md
<!-- section 小节标题 -->
小节标题，居中显示
<!-- paragraph -->
段落，首行缩进两个字符
<!-- line left -->
段落左对齐
<!-- line right -->
段落右对齐
```
{% endtabs %}

## reel 卷轴标签

{% tabs %}

<!-- tab 示例 -->
{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}

<!-- tab 写法 -->
```md
{% reel 滕王阁序 author:王勃 date:重九日 footer:节选 %}
时维九月，序属三秋。
潦水尽而寒潭清，烟光凝而暮山紫。
俨骖騑于上路，访风景于崇阿。
临帝子之长洲，得天人之旧馆。
层峦耸翠，上出重霄；
飞阁流丹，下临无地。
鹤汀凫渚，穷岛屿之萦回；
桂殿兰宫，即冈峦之体势。
{% endreel %}
```

```yaml 可选参数
title: # 标题
author: # 作者
date: # 日期
footer: # 页脚信息
```

{% endtabs %}

## note 备注块

{% tabs %}

<!-- tab 示例 -->
```md
{% note [title] content [color:color] %}
```
<!-- tab 写法 -->
```yaml
title: 标题（可选）
content: 内容
color: red/orange/yellow/green/cyan/blue/purple/light/dark/warning/error
```
{% endtabs %}


### 具有标题的备注块

直接写备注内容，默认是和代码块一样的样式，第一个空格前面的是标题，后面的是正文，如果标题中需要显示空格，请使用 `&nbsp;` 代替。

{% tabs %}

<!-- tab 示例 -->
{% note 这&nbsp;是标题 这是正文 哈哈。 %}
<!-- tab 写法 -->
```
{% note 这&nbsp;是标题 这是正文 哈哈。 %}
```
{% endtabs %}


### 彩色备注块

{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}

{% tabs %}

<!-- tab 示例 -->
{% folding 一共支持12种颜色，可以满足几乎所有的需求了 %}
{% note 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:red 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:orange 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:amber 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:yellow 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:green 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:blue 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:purple 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:light 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:dark 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:warning 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:error 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% endfolding %}
<!-- tab 写法 -->
```md
{% note 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、amber、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 [link](/) %}
```
{% endtabs %}

## link 链接卡片

{% tabs %}

<!-- tab 效果演示 -->
{% link https://xaoxuu.com/blog/20221029/ %}
{% link https://xaoxuu.com/blog/20221029/ desc:true %}
<!-- tab 语法格式 -->
外链卡片标签的语法格式为：
```
{% link href [title] [icon:src] [desc:true/false] %}
```
参数含义：
```yaml
href: 链接
title: 可选，手动设置标题（为空时会自动抓取页面标题）
icon: 可选，手动设置图标（为空时会自动抓取页面图标）
desc: 可选，是否显示摘要描述，为true时将会显示页面描述
```
<!-- tab 写法示例 -->
```md
不带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ %}
带摘要的样式：
{% link https://xaoxuu.com/blog/20221029/ desc:true %}
```
{% endtabs %}

随着网站流量的增加，使用主题默认的 `api` 很可能会导致流量超限，推荐使用自部署的 `api` 抓取网站信息。参考下方仓库的 `README` 。

{% link https://github.com/xaoxuu/site-info-api %}

并在主题配置中填入你的 `api`

```yaml blog/_config.stellar.yml
data_services:
  # {% link %}
  siteinfo:
    # 设置 api 可以自动提取网页标题、图标，服务部署方法：https://github.com/xaoxuu/site-info-api/
    # 接口测试通过后，把按钮的 href 部分替换成 {href} 之后填写到下方，例如：https://api.xaox.cc/site_info/v1?url={href}
    api: 
```

## button 按钮

这个功能在 {% button 1.26.6 https://github.com/xaoxuu/hexo-theme-stellar/tree/1.26.6 size:xs %} 版本后开始支持。

{% button 文档 https://xaoxuu.com/wiki/stellar/ icon:solar:notebook-bold %} {% button 源码 https://github.com/xaoxuu/hexo-theme-stellar/ icon:solar:code-square-bold %} {% button 示例 https://github.com/xaoxuu/hexo-stellar-starter/ icon:solar:cup-star-bold-duotone %}

```md 写法如下
{% button 探索 https://github.com/xaoxuu/hexo-theme-stellar/ icon:solar:planet-bold-duotone %}
```

```md 语法格式
{% button text url [icon:key/src] [color:color] [size:xs] %}
```

```yaml 参数含义
# 必填
text: 探索 # 显示文字
url: # 跳转链接
# 可选参数
color: orange # theme, accent, red, orange, yellow, green, cyan, blue, purple
icon: solar:planet-bold-duotone # 显示图标，支持 icon.yml 中的文件名和外链图标
size: xs # 按钮尺寸，目前只有两种尺寸：默认是普通大小， xs 是最小号
```

## okr 目标管理

这个功能在 {% mark 1.20.0 color:dark %} 版本后开始支持，这是一个 OKR（Objectives and Key Results）示例：

{% okr o1 %}

2077年的小目标：完成 Volantis 6.0 并发布上线
来自2077年末的复盘：已《基本》实现目标 {% emoji tieba huaji %}

<!-- okr kr1 percent:100 -->
重构 tag-plugins 和 wiki 系统
- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:90 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}


<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg height:64px 支持嵌套插入图片等其它简单组件 ratio:512/512 %}

{% endokr %}

写法如下：

```
{% okr o1 %}

2077年的小目标：完成 Volantis 6.0 并发布上线
来自2077年末的复盘：已《基本》实现目标 {% emoji tieba huaji %}

<!-- okr kr1 percent:100 -->
重构 tag-plugins 和 wiki 系统
- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:90 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}

<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg height:64px 支持嵌套插入图片等其它简单组件 ratio:512/512 %}

{% endokr %}
```

## copy 复制行


{% tabs %}

<!-- tab 示例 -->
对于单行内容，可以使用 `copy` 标签来实现复制功能：

{% copy curl -s https://sh.xaox.cc/install | sh prefix:$ %}

您可以设置 `git:https` 或者 `git:ssh` 或者 `git:gh` 来快速放置一个 git 仓库链接：
{% copy git:https xaoxuu.com/hexo-theme-stellar prefix:HTTPS %}
<!-- tab 写法 -->
```md
{% copy curl -s https://sh.xaox.cc/install | sh %}
{% copy curl -s https://sh.xaox.cc/install | sh prefix:$ %}
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
{% copy git:ssh xaoxuu.com/hexo-theme-stellar %}
{% copy git:gh xaoxuu.com/hexo-theme-stellar %}
```
{% endtabs %}


## radio 单选


{% tabs %}

<!-- tab 示例 -->
{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
<!-- tab 写法 -->
```
{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
```
```yaml 支持的参数
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
```
{% endtabs %}


## checkbox 复选


{% tabs %}

<!-- tab 示例 -->
{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}
<!-- tab 写法 -->
```md
{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}
```

```yaml 支持的参数
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
symbol: plus/minus/times
```

{% endtabs %}

## audio 音频标签

支持音乐外链以及网易云音乐，网易云支持设置 `type` 以及 `autoplay` 参数。

{% audio https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3 %}

{% audio type:2 netease:1856385686 autoplay:0 %}

```md 写法如下
{% audio https://github.com/volantis-x/volantis-docs/releases/download/assets/Lumia1020.mp3 %}

{% audio netease:1856385686 %}

{% audio type:2 netease:1856385686 autoplay:0 %}
```

```yaml 支持的参数
type: 2/0 # 歌曲/歌单 # 不设置默认为2歌曲模式
netease: xxx # 歌曲/歌单 id ，具体 id 在网易云网页版的网址链接中寻找 
autoplay: 1/0 # 自动播放/手动播放 # 不设置默认0手动播放
```

## video 视频标签

支持 bilibili, youtube 和视频外链，可设置最大宽度， bili, yt 均可设置宽度和自动播放

{% video bilibili:BV1GP4y1d729 %}

{% video youtube:LB8KwiiUGy0 %}

{% grid c:2 %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% endgrid %}

```md 写法如下
{% video bilibili:BV1GP4y1d729 %}

{% video bilibili:BV1GP4y1d729 width:100% autoplay:0 %}

{% video youtube:LB8KwiiUGy0 %}

{% video youtube:LB8KwiiUGy0 width:100% autoplay:0 %}

{% grid c:2 %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov width:100% %}
{% endgrid %}
```

```yaml 支持的参数
width: 500px # 须带单位 80% 20em 100mm...
autoplay: 1/0 # 自动播放/手动播放 # 不设置默认为0手动播放
```

> 目前 bilibili 的 iframe 标签不能放进 grid 容器里，原因未知。

## chat 聊天标签

非常感谢 [@且听风吟](https://github.com/HcGys) 为 Stellar 开发了精美的聊天风格标签，并提供了详细的使用文档。内置qq和微信风格，可配单聊、群聊、user、设备等，支持文本、icon、图片、语音、视频、文件和链接。user可在chat_users.yaml中统一设置，也可在具体使用时单独设置。

- 示例：[https://stellar.listentothewind.cn](https://stellar.listentothewind.cn/blog/2023-09-22-%E6%B5%8B%E8%AF%95/#chat)
- 文档：https://github.com/xaoxuu/hexo-theme-stellar/pull/560


## navbar 导航栏

文章内也可以插入一个导航栏：

```md
{% navbar active:/wiki/ [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}
```

> active 传入要高亮的那个按钮的 url

{% navbar active:/wiki/ [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}


## frame 设备框架


{% tabs %}
<!-- tab 示例 -->
{% frame iphone11 img:https://res.xaox.cc/gh/cdn-x/wiki@main/prohud/toast/demo-loading.png video:https://res.xaox.cc/gh/cdn-x/wiki@main/prohud/toast/demo-loading.mp4 focus:top %}
<!-- tab 写法 -->
```md
{% frame iphone11 img:https://res.xaox.cc/gh/cdn-x/wiki@main/prohud/toast/demo-loading.png video:https://res.xaox.cc/gh/cdn-x/wiki@main/prohud/toast/demo-loading.mp4 focus:top %}
```
{% endtabs %}


## 文本修饰标签集

- 这是 {% blur 高斯模糊 %} 标签
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}

```md 写法如下
- 这是 {% blur 高斯模糊 %} 标签
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}
```

## mbti 人格特征

静态展示 16Personalities 风格的 MBTI 人格特征卡片：顶部为标题（如「我的 MBTI 人格：INTJ-T（架构师）」），中间为五个维度的两端标签进度条；传入档案链接时标题可点击跳转。

{% tabs %}
<!-- tab 示例 -->
{% mbti INTJ-T 93-72-78-83-51 url:https://www.16personalities.com/ch/档案/9d09a4297ffa2 icon:https://www.16personalities.com/static/images/personality-types/avatars/faces/intj-architect-s3-v1-male.svg?v=3 image:https://www.16personalities.com/static/images/profile/reports/architect/profile_scene_architect_personality_traits_neutral_male.svg?v=1 %}
```md
{% mbti INTJ-T 93-72-78-83-51 url:https://www.16personalities.com/ch/档案/9d09a4297ffa2 %}
```
<!-- tab 写法 -->

```md 语法格式
{% mbti 类型代码 百分比1-百分比2-百分比3-百分比4-百分比5 [url:档案链接] [image:图片地址] %}
```

**参数说明**

- `类型代码`：必填，如 `INTJ-T` / `INTJ`，大小写均可，决定标题与配色
- `百分比`：必填，五个数值用 `-` 分隔，顺序固定为精力 → 认知方式 → 决策方式 → 生活方式 → 身份（各为前者的百分比，如内向 93%）
- `url`：可选，`url:档案链接` 形式，支持完整 URL 或纯档案 ID（自动补全为中文站链接）；传入后标题可点击跳转（hover 显示下划线）
- `image`：可选，标题上方的横幅图片地址，铺满卡片宽度、高度自适应；不填则不显示

**边界行为**

- 类型无法识别时使用主题默认色并输出构建告警
- 类型代码缺少 `-A/-T` 变体时，身份维度默认按「自信果断」方向渲染并输出构建告警
- 百分比缺位按 0 处理，超出 0–100 自动钳制，多余数值忽略
- 明暗主题下进度条均使用类型对应色值

{% endtabs %}

## tip 注解标签

`tip` 标签为词句添加气泡注解：桌面端鼠标悬停显示，移动端点击显示。

{% tip text:这是注解内容 %}被注解的词句{% endtip %}

```
{% tip text:这是注解内容 %}被注解的词句{% endtip %}
```
