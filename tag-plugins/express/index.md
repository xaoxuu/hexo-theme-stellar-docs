---
layout: wiki
wiki: Stellar
order: 111
title: 表达类标签（14+个）
---


## emoji 表情

{% tabs %}
<!-- tab 效果演示 -->
内置了可配置的表情标签 {% emoji 爱你 %} {% emoji blobcat ablobcatrainbow %} {% emoji blobcat ablobcatattentionreverse %} {% emoji tieba 滑稽 %} 使用方法如下：

```
{% emoji 爱你 %}
{% emoji blobcat ablobcatrainbow %}
{% emoji blobcat ablobcatattentionreverse %}
{% emoji tieba 滑稽 %}
```

<!-- tab 语法格式 -->

```
{% emoji [source] name [height:1.75em] %}
```

其中 `source` 可省略，默认为配置中的第一个 `source`（详见「引入表情包」部分）

{% ablock %}
如果对高度有特别要求，可以指定高度，例如：{% emoji blobcat ablobcatrainbow height:4em %}
```
{% emoji blobcat ablobcatrainbow height:4em %}
```
{% endablock %}

> 表情速查表1：[stellar表情标签索引](https://www.hermitlsr.top/2021-08-02/stellar%E8%A1%A8%E6%83%85%E6%8F%92%E4%BB%B6%E7%B4%A2%E5%BC%95/)
> 表情速查表2：[Stellar内嵌blobcat小表情](https://weekdaycare.cn/posts/emoji-blob/)

<!-- tab 引入表情包 -->

```yaml blog/_config.stellar.yml
tag_plugins:
  ...
  emoji:
    default: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/${name}.gif
    twemoji: https://gcore.jsdelivr.net/gh/twitter/twemoji/assets/svg/${name}.svg
    qq: https://gcore.jsdelivr.net/gh/cdn-x/emoji/qq/${name}.gif
    aru: https://gcore.jsdelivr.net/gh/cdn-x/emoji/aru-l/${name}.gif
    tieba: https://gcore.jsdelivr.net/gh/cdn-x/emoji/tieba/${name}.png
```

> 在配置文件中，文件名用 `${name}` 代替。

{% endtabs %}


## mark 行内文本标记

支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 浅 color:light %} {% mark 深 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。

```
支持多彩标记，包括：{% mark 默认 %} {% mark 红 color:red %} {% mark 橙 color:orange %} {% mark 黄 color:yellow %} {% mark 绿 color:green %} {% mark 青 color:cyan %} {% mark 蓝 color:blue %} {% mark 紫 color:purple %} {% mark 浅 color:light %} {% mark 深 color:dark %} {% mark 警告 color:warning %} {% mark 错误 color:error %} 一共 12 种颜色。
```


## tag 标签

这个效果类似于 `mark` 标签，但是更适合一批标签独占一行来使用，支持链接：

{% tag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% tag Hexo https://hexo.io/ %}
{% tag GitHub https://github.com/xaoxuu/ %}
{% tag Gitea https://git.xaoxuu.com/ color:green %}

如果没有指定颜色，且没有设置默认颜色，则随机取一个颜色，快来试试吧～

```
{% tag Stellar https://xaoxuu.com/wiki/stellar/ %}
{% tag Hexo https://hexo.io/ %}
{% tag GitHub https://github.com/xaoxuu/ %}
{% tag Gitea https://git.xaoxuu.com/ color:green %}
```

## image 图片标签

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

```
{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}
```

{% note 提示 鼠标拖拽一下图片可以看看原图 %}

{% folding 如果不进行约束，在宽屏设备上阅读体验很糟糕 %}
{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png %}
{% endfolding %}

<!-- tab 没有底色的图片 -->

没有底色的图片，可以填充 `bg:var(--card)` 动态颜色，能够适配暗黑模式：

{% image /assets/wiki/stellar/icon.svg bg:var(--card) padding:16px width:100px %}

```
{% image /assets/wiki/stellar/icon.svg bg:var(--card) padding:16px %}
```

{% endtabs %}

### 支持 Fancybox 插件点击放大

由于 Stellar 主题的插件具有按需加载的特性，所以 Fancybox 插件默认也是已经配置好了的，在任意 `image` 标签中增加 `fancybox:true` 参数即可为特定图片开启缩放功能。如果一个页面没有任何地方使用，则不会加载 Fancybox 插件。

{% image fancybox:true https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Apple_Shot-on-iphone-macro-challenge_Cat_big.jpg.large_2x.jpg download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/2022/Images-of-Shot-on-iphone-macro-challenge.zip 图片来自 Apple 官网 %}

如果您希望全站所有的 `image` 标签都开启此功能，可在主题配置文件中修改以下参数：

```yaml blog/_config.stellar.yml
######## Tag Plugins ########
tag_plugins:
  # {% image %}
  image:
    fancybox: true
```

{% mark 1.18.5 %} 支持解析原生 MD 语法

```yaml blog/_config.stellar.yml
tag_plugins:
  image:
    replace_original:  #把markdown格式的图片解析成图片标签
      enable: true
```


## quot 引用

适合居中且醒目的引用：{% quot Stellar 是最好用的主题 %}

支持自定义引号：{% quot 热门话题 icon:hashtag %}

其中自定义引号素材在主题配置文件的 `tag_plugins.quot` 中配置：

```yaml
tag_plugins:
  ...
  # {% quot %}
  quot:
    default: # 可以自行配置多种图标方案
      prefix: https://bu.dusays.com/2022/10/24/63567d3e092ff.png
      suffix: https://bu.dusays.com/2022/10/24/63567d3e0ab55.png
    hashtag:
      prefix: https://bu.dusays.com/2022/10/24/63567d3e07da3.png
```

{% folding child:codeblock 写法如下 open:true %}
```
适合居中且醒目的引用：{% quot Stellar 是最好用的主题 %}
支持自定义引号：{% quot 热门话题 icon:hashtag %}
```
{% endfolding %}

{% quot 特别引用 icon:default %}

> 此外，加上 `el:h2/h3/h4/h5/h6` 可以作为标题使用

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


{% tabs %}

<!-- tab 示例 -->
{% note 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:red 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:orange 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:yellow 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:green 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:blue 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:purple 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:light 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:dark 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:warning 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:error 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
<!-- tab 写法 -->
```md
{% note 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
{% note color:cyan 一共支持12种颜色，可以满足几乎所有的需求了。 color 可设置 red、orange、yellow、green、cyan、blue、purple、light、dark、warning、error 几种取值。 %}
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



## copy 复制行


{% tabs %}

<!-- tab 示例 -->
对于单行内容，可以使用 `copy` 标签来实现复制功能：

{% copy curl -s https://sh.xaox.cc/install | sh %}

您可以设置 `git:https` 或者 `git:ssh` 或者 `git:gh` 来快速放置一个 git 仓库链接：
{% copy git:https xaoxuu.com/hexo-theme-stellar %}
<!-- tab 写法 -->
```md
{% copy curl -s https://sh.xaox.cc/install | sh %}
{% copy width:max curl -s https://sh.xaox.cc/install | sh %}
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


## navbar 导航栏

文章内也可以插入一个导航栏：

```md
{% navbar active:1 [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}
```

{% navbar active:1 [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}


## frame 设备框架


{% tabs %}
<!-- tab 示例 -->
{% frame iphone11 img:/assets/wiki/prohud/toast/demo-loading.png video:/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}
<!-- tab 写法 -->
```md
{% frame iphone11 img:/assets/wiki/prohud/toast/demo-loading.png video:/assets/wiki/prohud/toast/demo-loading.mp4 focus:top %}
```
{% endtabs %}


## 文本修饰标签集

- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}

```md 写法如下
- 这是 {% psw 密码 %} 标签
- 这是 {% u 下划线 %} 标签
- 这是 {% emp 着重号 %} 标签
- 这是 {% wavy 波浪线 %} 标签
- 这是 {% del 删除线 %} 标签
- 这是 {% sup 上角标 color:red %} 标签
- 这是 {% sub 下角标 %} 标签
- 这是 {% kbd 键盘样式 %} 标签，试一试：{% kbd ⌘ %} + {% kbd D %}
```