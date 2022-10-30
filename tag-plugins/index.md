---
layout: wiki
wiki: Stellar
order: 105
title: 使用标签插件增强阅读体验
---

新版标签插件和 Hexo 官方的标签插件统一使用空格分隔，所以如果参数内容中需要出现的空格被意外分隔开了的时候，请使用 `&nbsp;` 代替。为了方便理解，本文档语法格式中的可选参数用方括号括起来，键值对参数用冒号分隔开，例如：

```
{% image src description [download:bool/string] %}
```
就表明第一个参数是图片链接，第二个参数是图片描述，而 `download` 是可选参数，并且值是布尔或字符串类型。


{% folding 了解参数解析规则 %}

以图片标签为例，使用空格分隔开之后得到一个数组，如果图片描述文字中有空格，多分出来的这些「参数」被合并到最后一个「非键值对参数」中，什么是「非键值对参数」呢？举个例子您就明白了：

```
{% image /assets/wiki/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
```

这个例子中，`download:https://xxxx` 是有冒号分隔开的，`download` 为键，后面的网址为值，所以叫做「键值对参数」；与此相对的，没有冒号分隔的就叫做「非键值对参数」。键值对参数可以放在任何位置，我可以通过匹配键来解析，而非键值对参数则只能通过顺序解析，所以它们必须和文档中要求的前后顺序一致。

一般核心的、重要的参数会设置成非键值对参数，而可选参数设置成键值对参数。

{% endfolding %}

## 文本修饰标签集

- 支持多彩标记标签，包括：{% mark 默认 %}{% mark 红 color:red %}{% mark 橙 color:orange %}{% mark 黄 color:yellow %}{% mark 绿 color:green %}{% mark 青 color:cyan %}{% mark 蓝 color:blue %}{% mark 紫 color:purple %}{% mark 浅 color:light %}{% mark 深 color:dark %} 一共 10 种颜色。
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}

```md 写法如下
- 支持多彩标记标签，包括：{% mark 默认 %}{% mark 红 color:red %}{% mark 橙 color:orange %}{% mark 黄 color:yellow %}{% mark 绿 color:green %}{% mark 青 color:cyan %}{% mark 蓝 color:blue %}{% mark 紫 color:purple %}{% mark 浅 color:light %}{% mark 深 color:dark %} 一共 10 种颜色。
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}
```

## Emoji（表情标签）

内置了可配置的表情标签{% emoji 爱你 %}使用方法如下：

```
{% emoji 爱你 %}
```

语法格式：

```
{% emoji [source] name [height:1.75em] %}
```

其中 `source` 可省略，默认为配置中的第一个 `source`：

```yaml blog/_config.stellar.yml
tag_plugins:
  ...
  emoji:
    default: https://fastly.jsdelivr.net/gh/cdn-x/emoji/qq/%s.gif
    twemoji: https://fastly.jsdelivr.net/gh/twitter/twemoji/assets/svg/%s.svg
    qq: https://fastly.jsdelivr.net/gh/cdn-x/emoji/qq/%s.gif
    aru: https://fastly.jsdelivr.net/gh/cdn-x/emoji/aru-l/%s.gif
    tieba: https://fastly.jsdelivr.net/gh/cdn-x/emoji/tieba/%s.png
```

{% border %}
在配置文件中，文件名用 `%s` 代替。这种集成方式虽然不那么优雅，但也能用，主要是配置起来比较灵活。 {% emoji aru 0180 %}
如果对高度有特别要求，可以指定高度，例如：{% emoji aru 5150 height:3em %}
```
{% emoji aru 5150 height:3em %}
```
{% endborder %}

> 表情速查表：[stellar表情标签索引](https://www.hermitlsr.top/2021-08-02/stellar%E8%A1%A8%E6%83%85%E6%8F%92%E4%BB%B6%E7%B4%A2%E5%BC%95/)

## Image（图片标签）

图片标签是一个精心设计的应对各种尺寸插图的标签，对于大图，可以放置一个「下载」按钮，语法格式如下：

```
{% image src [description] [download:bool/string] [width:px] [padding:px] [bg:hex] %}
```

```yaml 参数说明
src: 图片地址
description: 图片描述
download: href # 下载地址，设置此值后鼠标放在图片上会显示下载地址，如果下载地址为图片地址，可以设置为 true
width: 200px # 图片宽度
padding: 16px # 图片四周填充宽度
bg: '#ffffff' # 图片区域背景颜色，16进制
```

### 大尺寸图片

无论在什么宽度的设备上都希望横向铺满的图片，一般不需要额外操作。可以在链接后面写上图片描述，如有必要，可以通过设置 `download:true` 使其显示一个「下载」按钮链接指向图片地址，如果下载链接与显示的图片地址不同，可以 `download:下载链接` 来使其能够下载原图。

{% image /assets/wiki/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
{% image /assets/wiki/stellar/photos/bc7bda18328da.jpg 来自澳大利亚的 Pieter de Vries 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone_pieter_de_vries_011221.zip %}

```md 写法如下
{% image /assets/wiki/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip %}
{% image /assets/wiki/stellar/photos/bc7bda18328da.jpg 来自澳大利亚的 Pieter de Vries 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone_pieter_de_vries_011221.zip %}
```

### 小尺寸图片优化

宽度较小而高度较大的图片，可以设置宽、高、填充间距、背景色等对其布局进行优化，使得它在不同宽度的屏幕下都能获得不错的视觉体验：

{% tabs %}

<!-- tab 有底色的图片 -->

有底色的图片，可以填充图片底色：

{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}

{% codeblock %}
{% raw %}{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}{% endraw %}
{% endcodeblock %}

{% note 提示 鼠标拖拽一下图片可以看看原图 %}

{% folding 如果不进行约束，在宽屏设备上阅读体验很糟糕（为不影响阅读体验，已为您折叠过长的内容） %}
{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png %}
{% endfolding %}

<!-- tab 没有底色的图片 -->

没有底色的图片，可以填充 `bg:var(--card)` 动态颜色，能够适配暗黑模式：

{% image /assets/wiki/stellar/icon.svg bg:var(--card) padding:16px width:100px %}

{% codeblock %}
{% raw %}{% image /assets/wiki/stellar/icon.svg bg:var(--card) padding:16px %}{% endraw %}
{% endcodeblock %}

{% endtabs %}

### 支持 Fancybox 插件点击放大

由于 Stellar 主题的插件具有按需加载的特性，所以 Fancybox 插件默认也是已经配置好了的，在任意 `image` 标签中增加 `fancybox:true` 参数即可为特定图片开启缩放功能。如果一个页面没有任何地方使用，则不会加载 Fancybox 插件。

{% image fancybox:true https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Apple_Shot-on-iphone-macro-challenge_Cat_big.jpg.large_2x.jpg download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Images-of-Shot-on-iphone-macro-challenge.zip 图片来自 Apple 官网 %}

如果您希望全站所有的 `image` 标签都开启此功能，可在主题配置文件中修改以下参数：

```yaml
######## Tag Plugins ########
tag_plugins:
  # {% image %}
  image:
    fancybox: true
```

## Quot（引用标签）

适合居中且醒目的引用：{% quot Stellar 是最好用的主题 %}

支持自定义引号：{% quot 热门话题 icon:hashtag %}

其中自定义引号素材在主题配置文件的 `tag_plugins.quot` 中配置。

{% folding child:codeblock 写法如下 open:true %}
```
适合居中且醒目的引用：{% quot Stellar 是最好用的主题 %}
支持自定义引号：{% quot 热门话题 icon:hashtag %}
```
{% endfolding %}

{% quot 特别引用 icon:default %}

> 此外，加上 `el:h2/h3/h4/h5/h6` 可以作为标题使用

## Poetry（诗词标签）

{% poetry 游山西村 author:陆游 footer:诗词节选 %}
莫笑农家腊酒浑，丰年留客足鸡豚。
**山重水复疑无路，柳暗花明又一村。**
箫鼓追随春社近，衣冠简朴古风存。
从今若许闲乘月，拄杖无时夜叩门。
{% endpoetry %}

{% folding child:codeblock 写法如下 open:true %}
```
{% poetry 游山西村 author:陆游 footer:诗词节选 %}
莫笑农家腊酒浑，丰年留客足鸡豚。
**山重水复疑无路，柳暗花明又一村。**
箫鼓追随春社近，衣冠简朴古风存。
从今若许闲乘月，拄杖无时夜叩门。
{% endpoetry %}
```
{% endfolding %}

## Note（备注标签）

```md note
{% note [title] content [color:color] %}
```

```md block
{% border [title] [color:color] [codeblock:bool] %}
...
{% endborder %}
```

```yaml 参数说明
title: 标题（可选）
content: 内容
color: red/orange/yellow/green/cyan/blue/purple/light/dark
```

### 彩色备注标签

备注标签相较于旧版进行了增强，可以实现更多种颜色， note 标签可以用空格隔开标题和内容。 block 标签适用于应对更复杂的场合。

{% note 直接写备注内容，默认是和代码块一样的样式，如果内容中需要显示空格，请使用&nbsp;代替。 %}


```md 写法如下
{% note 直接写备注内容，默认是和代码块一样的样式，如果内容中需要显示空格，请使用&nbsp;代替。 %}
```

{% folding 更多颜色 %}

{% note color:red 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:orange 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:yellow 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:green 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:cyan 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:blue 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:purple 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:light 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
{% note color:dark 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}

```md 写法如下
{% note color:cyan 一共支持10种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark 9种值。 %}
```

{% endfolding %}

### 具有标题的备注标签

{% note 这是标题 这是正文 哈哈。 %}

```md 写法如下
{% note 这是标题 这是正文 哈哈。 %}
```

## Border（边框标签）

使用过 `noteblock` 标签的朋友对这个新标签会比较熟悉，它是从 `noteblock` 演化而来的，基础功能和 `noteblock` 是一致的，这是一个容器类标签，可以放置丰富的内容。

### 文本内容

{% border 这是标题 %}
这是正文 哈哈。
{% endborder %}

{% border 彩色块标题 color:yellow %}
这是彩色块正文 啊哈哈哈。
{% endborder %}

```md 写法如下
{% border 这是标题 %}
这是正文 哈哈。
{% endborder %}

{% border 彩色块标题 color:yellow %}
这是彩色块正文 啊哈哈哈。
{% endborder %}
```

### 彩色代码块

设置 `child:codeblock` 并设置 `color:颜色枚举` 可以实现 10 种不同颜色的代码块，彩色代码块一般可以用在代码正确与错误的示范对比场景。

{% tabs %}

<!-- tab 效果 -->

推荐的写法：

{% border child:codeblock color:green %}
{% codeblock lang:swift %}
func test() {
    // ...
}
{% endcodeblock %}
{% endborder %}

不推荐的写法：

{% border child:codeblock color:red %}
{% codeblock lang:swift %}
func test() -> Void {
    // ...
}
// 或者
func test() -> () {
    // ...
}
{% endcodeblock %}
{% endborder %}

<!-- tab 写法 -->

{% codeblock %}{% raw %}
推荐的写法：

{% border child:codeblock color:green %}
{% codeblock lang:swift %}
func test() {
    // ...
}
{% endcodeblock %}
{% endborder %}

不推荐的写法：

{% border child:codeblock color:red %}
{% codeblock lang:swift %}
func test() -> Void {
    // ...
}
// 或者
func test() -> () {
    // ...
}
{% endcodeblock %}
{% endborder %}
{% endraw %}{% endcodeblock %}

{% endtabs %}

### 嵌套其它标签

{% border child:tabs %}
{% tabs %}
<!-- tab 图文示例 -->
{% image /assets/xaoxuu/blog/2020-0627a@2x.jpg 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}

公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。

<!-- tab 代码示例 -->
{% codeblock 建议的版本 lang:yaml %}
Hexo: 5.4.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 建议使用LTS版本
npm: 6.14.10 LTS
{% endcodeblock %}
{% endtabs %}
{% endborder %}

```md 写法如下
{% border %}
{% tabs %}
<!-- tab 图文示例 -->
{% image /assets/xaoxuu/blog/2020-0627a@2x.jpg 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}
公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。
<!-- tab 代码示例 -->
{% codeblock 建议的版本 lang:yaml %}
Hexo: 5.4.0
hexo-cli: 4.2.0
node.js: 14.15.4 LTS # 建议使用LTS版本
npm: 6.14.10 LTS
{% endcodeblock %}
{% endtabs %}
{% endborder %}
```

## Split（两列分区标签）

{% split bg:block %}

<!-- cell -->

<center>左侧内容</center>

<!-- cell -->

<center>右侧内容</center>

{% endsplit %}

示例代码：

```
{% split bg:block %}

<!-- cell -->

<center>左侧内容</center>

<!-- cell -->

<center>右侧内容</center>

{% endsplit %}
```

> `bg` 为可选参数，默认没有背景，可设置为 `block/card` 两种样式

## Folding（折叠块标签）

折叠块标签的语法格式为：

```
{% folding title [codeblock:bool] [open:bool] [color:color] %}
content
{% endfolding %}
```

```yaml 参数说明
codeblock: true/false
open: true/false
color: red/orange/yellow/green/cyan/blue/purple/light/dark
```

### 彩色可折叠代码块

备注标签相较于旧版进行了增强，可以实现更多种颜色，还可以通过设置 `child:codeblock` 来实现可折叠的代码块。以下是一个默认打开的代码折叠框：

{% folding child:codeblock open:true color:yellow 默认打开的代码折叠框 %}
```swift
func test() {
  print("hello world")
}
```
{% endfolding %}

代码如下：

```
{% folding child:codeblock open:true color:yellow 默认打开的代码折叠框 %}
代码块
{% endfolding %}
```

{% folding color:yellow 危险，请不要打开这个 %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding color:orange 警告，真的很危险 %}
通过设置颜色，以实现更醒目的作用，但不要滥用色彩哦～
{% folding color:red 最后一次警告，千万不要打开这个 %}
不要说我们没有警告过你，Windows 10 不是為所有人設計，而是為每個人設計。
{% endfolding %}
{% endfolding %}
{% endfolding %}

## Folders（一组折叠标签）

样式相比 `folding` 简单一些，适用于多个折叠标签平铺显示的场景，例如题目列表：

{% folders %}
<!-- folder 题目1 -->
这是答案1
<!-- folder 题目2 -->
这是答案2
<!-- folder 题目3 -->
这是答案3
{% endfolders %}

代码如下：

```
{% folders %}
<!-- folder 题目1 -->
这是答案1
<!-- folder 题目2 -->
这是答案2
<!-- folder 题目3 -->
这是答案3
{% endfolders %}
```



## Link（链接卡片标签）

外链卡片标签的语法格式为：

```
{% link href [title] [desc:true/false] [icon:src] %}
```

```yaml 参数说明
href: 链接
title: 可选，默认标题（读取到标题后会被替换）
desc: 可选，副标题，为true时将会显示页面描述
icon: 可选，默认缩略图链接（读取到图标后会被替换）
```

{% tabs align:center active:1 %}

<!-- tab 样式1 -->

{% link https://github.com/xaoxuu/hexo-theme-stellar %}

<!-- tab 样式2 -->

{% link https://github.com/xaoxuu/hexo-theme-stellar desc:true %}

{% endtabs %}

```
{% link https://github.com/xaoxuu/hexo-theme-stellar %}
{% link https://github.com/xaoxuu/hexo-theme-stellar desc:true %}
```

## Copy（复制标签）

对于单行内容，可以使用 `copy` 标签来实现复制功能：

{% copy curl -s https://xaoxuu.com/install | sh %}

您可以设置 `git:https` 或者 `git:ssh` 或者 `git:gh` 来快速放置一个 git 仓库链接：
{% copy git:https xaoxuu.com/hexo-theme-stellar %}


```md 写法如下
{% copy curl -s https://xaoxuu.com/install | sh %}
{% copy width:max curl -s https://xaoxuu.com/install | sh %}
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
{% copy git:ssh xaoxuu.com/hexo-theme-stellar %}
{% copy git:gh xaoxuu.com/hexo-theme-stellar %}
```

## Radio（单选样式标签）

{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}

```md 写法如下
{% radio 没有勾选的单选框 %}
{% radio checked:true 已勾选的单选框 %}
```

```yaml 支持的参数
checked: true/false
color: red/orange/yellow/green/cyan/blue/purple
```

## Checkbox（复选样式标签）

{% checkbox 普通的没有勾选的复选框 %}
{% checkbox checked:true 普通的已勾选的复选框 %}
{% checkbox symbol:plus color:green checked:true 显示为加号的绿色的已勾选的复选框 %}
{% checkbox symbol:minus color:yellow checked:true 显示为减号的黄色的已勾选的复选框 %}
{% checkbox symbol:times color:red checked:true 显示为乘号的红色的已勾选的复选框 %}

```md 写法如下
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

{% note color:yellow 由于没有提交表单的需要，所以这个标签只是样式标签，不具有真实的单选/复选功能。 %}

## Timeline（时间线标签）

支持静态和动态时间线数据源。

### 纯静态时间线

静态数据是写死在 `md` 源文件中的，在 `deploy` 时就已经确定了。

{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}

```md 写法如下
{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}
```

### 纯动态时间线

动态数据是从 GitHub Issues 中拉取的，使用方法为：

1. 建一个仓库
2. 创建一个 `issue` 并添加一个 `label` 进行测试
3. 写 `timeline` 标签时加上 `api:https://api.github.com/repos/your-name/your-repo/issues`

例如：
```
{% timeline api:https://api.github.com/repos/xaoxuu/blog-timeline-schedule/issues?direction=asc %}
{% endtimeline %}
```

效果如下：
{% timeline api:https://api.github.com/repos/xaoxuu/blog-timeline-schedule/issues?direction=asc %}
{% endtimeline %}

### 静态 + 动态

用法同静态和动态单独使用时一样，例如：

```
{% timeline reversed:true api:https://api.github.com/repos/xaoxuu/blog-timeline-schedule/issues %}
<!-- node 这条内容为静态数据 -->
这条内容为静态数据，静态数据在 `deploy` 时就已经确定了。
{% endtimeline %}
```

### 数据筛选

{% folders %}
<!-- folder 只显示某个人的数据 -->
{% timeline user:xaoxuu api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues %}
{% endtimeline %}
<!-- folder 筛选最近3条todo -->
{% timeline api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=3 %}
{% endtimeline %}
<!-- folder 筛选评论最多的3条建议 -->
{% timeline api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues?labels=feature-request&per_page=3&sort=comments %}
{% endtimeline %}
{% endfolders %}

上述示例代码如下：

```
{% folders %}
<!-- 只显示某个人的数据 -->
{% timeline user:xaoxuu api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues %}
{% endtimeline %}
<!-- 筛选最近3条todo -->
{% timeline api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=3 %}
{% endtimeline %}
<!-- 筛选评论最多的3条建议 -->
{% timeline api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues?labels=feature-request&per_page=3&sort=comments %}
{% endtimeline %}
{% endfolders %}
```

更多用法详见：

{% link https://docs.github.com/en/rest/issues/issues#list-issues-assigned-to-the-authenticated-user GitHub&nbsp;REST&nbsp;API %}


## Friends（友链组标签）

{% friends 开源大佬 %}

您可以在任何位置插入友链组，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/links.yml
'开源大佬':
    - title: 某某某
      url: https://
      screenshot:
      avatar:
      description:
```

在需要的位置这样写：

```md 示例写法
{% friends 开源大佬 %}
```

### 实现动态友链

从[xaoxuu/issues-json-generator](https://github.com/xaoxuu/issues-json-generator)作为模板克隆或者 fork 仓库

修改`config.yml`并打开github action的运行权限

```yaml config.yml
# 要抓取的 issues 配置
issues:
  repo: xaoxuu/friends # 仓库持有者/仓库名（改成自己的）
  label: active # 筛选具有 active 标签的 issue ，取消此项则会提取所有 open 状态的 issue
  sort: # updated-desc # 排序，按最近更新，取消此项则按创建时间排序
```

不出意外的话，仓库中已经配置好了 issue 模板，只需要在模板中指定的位置填写信息就可以了。然后在自己的仓库里提交一个 issue 并将 `Label` 设置为 `active` 进行测试。

提交完 issue 一分钟左右，如果仓库中出现了 `output` 分支提交，可以点击查看一下文件内容是否已经包含了刚刚提交的 issue 中的数据，如果包含，那么前端页面就可以使用友链数据了。

使用方法为（地址替换成自己的）：

```
{% friends repo:xaoxuu/issues-json-generator %}
```

也支持把数据托管到任何其他地方来使用：

```
{% friends api:https://raw.github.xaoxuu.com/xaoxuu/friends/output/v2/data.json %}
```

{% note 关于自建&nbsp;Vercel&nbsp;API 如果您想使用自己的 api，请把您刚创建的仓库导入到 Vercel 项目，详见[小冰博客](https://zfe.space/post/python-issues-api.html)的教程。 %}

{% note color:green 特别感谢 特别感谢小冰博客通过 Vercel 进行加速的方案，解决了原本直接请求 GitHub API 速度过慢的问题。 %}


## Sites（网站卡片组标签）

{% sites mac_app_download %}

您可以在任何位置插入网站卡片组，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/links.yml
'分组名':
    - title: 某某某
      url: https://
      screenshot:
      avatar:
      description:
```

在需要的位置这样写：

```md 示例写法
{% sites 分组名 %}
```

动态数据使用方法同友链，数据源格式相同，与友链共享数据，仅样式不同，也可以用 `sites` 标签做友链。

## GitHub Card（GitHub卡片标签）

{% ghcard xaoxuu %}

{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}

```md 写法如下
{% ghcard xaoxuu %}
{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}
```

{% link https://github.com/anuraghazra/github-readme-stats GitHub&nbsp;Card&nbsp;API %}

## Navbar（导航栏标签）

文章内也可以插入一个导航栏：

```md
{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}
```

{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}


## About（关于标签）

方便在关于页面显示一段图文信息：

```
{% about avatar:/assets/xaoxuu/avatar/rect-256@2x.png height:80px %}

<img height="32px" alt="XAOXUU" src="/assets/xaoxuu/logo/180x30@2x.png">

**如果宇宙中真有什么终极的逻辑，那就是我们终有一天会在舰桥上重逢，直到生命终结。**

XAOXUU 目前是一个 iOS 开发者，代表作品有：ProHUD、ValueX 等。在业余时间也开发了 Stellar 博客主题，更多的作品可以去项目主页查看，希望大家喜欢～

{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}

{% endabout %}
```

## Frame（设备框架标签）

{% frame iphone11 img:/assets/wiki/prohud/toast/demo-loading.png video:/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}

```md 示例写法
{% frame iphone11 img:/assets/wiki/prohud/toast/demo-loading.png video:/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}
```

目前仅支持 iphone11 如果您有 iPhone12、iPad、Mac 等设备模型的 svg 图片，可以发给我进行适配。

## Tabs（分栏标签）

这个标签移植自[NexT](https://theme-next.js.org/docs/tag-plugins/tabs.html)主题，但做了以下修改：

- 支持设置 `align:center` 来使内容居中
- 设置默认激活的标签方式为 `active:1` 而非 `, 1`（使用默认格式降低学习成本，且显式声明可读性更强）
- 不需要 `<!-- endtab -->` 来作为结束标识（因为 Stellar 会自动判断）
- 不需要 `tabs id` 来保证唯一性（因为 Stellar 会设置唯一标识）
- 不支持 `@icon` 方式设置图标（因为 Stellar 不再内置 `fontawesome` 图标库）
- 暂时不支持 `md` 格式的代码块，这是技术问题，有待解决。

{% tabs active:2 align:center %}

<!-- tab 图片 -->
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}

<!-- tab 代码块 -->
{% codeblock lang:swift %}
let x = 123
print("hello world")
{% endcodeblock %}

<!-- tab 表格 -->
| a | b | c |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

{% endtabs %}

```md 写法如下
{% tabs active:2 align:center %}

<!-- tab 图片 -->
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}

<!-- tab 代码块 -->
{% codeblock lang:swift %}
let x = 123
print("hello world")
{% endcodeblock %}

<!-- tab 表格 -->
| a | b | c |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

{% endtabs %}
```

## Swiper（轮播标签）

默认一张图片是 50% 宽度，通过设置 `width:min` 设置为 25% 宽度，`width:max` 设置为 100% 宽度。

### 最大图片宽度

```md 写法如下
{% swiper width:max %}
![](/assets/wiki/prohud/screenshot11.png)
![](/assets/wiki/prohud/screenshot12.png)
![](/assets/wiki/prohud/screenshot13.png)
{% endswiper %}
```

### 最小图片宽度

```md 写法如下
{% swiper width:min %}
![](/assets/wiki/prohud/screenshot01.png)
![](/assets/wiki/prohud/screenshot02.png)
![](/assets/wiki/prohud/screenshot03.png)
![](/assets/wiki/prohud/screenshot04.png)
![](/assets/wiki/prohud/screenshot05.png)
![](/assets/wiki/prohud/screenshot06.png)
![](/assets/wiki/prohud/screenshot07.png)
![](/assets/wiki/prohud/screenshot08.png)
![](/assets/wiki/prohud/screenshot09.png)
![](/assets/wiki/prohud/screenshot10.png)
{% endswiper %}
```
