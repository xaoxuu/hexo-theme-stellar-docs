---
layout: wiki
wiki: hexo-stellar
title: 表达类标签组件（17+个）
---

## emoji 表情包

{% tabs %}
<!-- tab 效果演示 -->
内置了可配置的表情标签 {% emoji 爱你 %} {% emoji blobcat ablobcatattentionreverse %} {% emoji tieba 滑稽 %} 使用方法如下：

```
{% emoji 爱你 %}
{% emoji blobcat ablobcatattentionreverse %}
{% emoji tieba 滑稽 %}
```

如果对高度有特别要求，可以指定高度，例如：
<center>{% emoji blobcat ablobcatrainbow height:1em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:3em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:1em %}</center>

```
<center>{% emoji blobcat ablobcatrainbow height:1em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:3em %}{% emoji blobcat ablobcatrainbow height:2em %}{% emoji blobcat ablobcatrainbow height:1em %}</center>
```

<!-- tab 语法格式 -->

```
{% emoji [source] name [height:1.75em] %}
```

其中 `source` 可省略，默认为配置中的第一个 `source`（详见「引入表情包」部分）

> 表情速查表：[Stellar内嵌blobcat小表情](https://weekdaycare.cn/posts/emoji-blob/)

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

### 横向铺满的图片

无论在什么宽度的设备上都希望横向铺满的图片，一般不需要额外操作。可以在链接后面写上图片描述，如有必要，可以通过设置 `download:true` 使其显示一个「下载」按钮链接指向图片地址，如果下载链接与显示的图片地址不同，可以 `download:下载链接` 来使其能够下载原图。

{% image https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd 图片由 xaoxuu 拍摄于一个普通的阳光明媚的下午 download:https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd %}

```md 写法如下
{% image https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd 图片由 xaoxuu 拍摄于一个普通的阳光明媚的下午 download:https://s.xaox.cc/xaoxuu/posts/202401131914137.jpg-hd %}
```

### 竖图（小图）优化

宽度较小而高度较大的图片，可以设置宽、高、填充间距、背景色等对其布局进行优化，使得它在不同宽度的屏幕下都能获得不错的视觉体验：

{% tabs %}

<!-- tab 限制宽度 -->

{% image https://s.xaox.cc/xaoxuu/posts/202401131924265.jpg-hd width:350px 图片由 xaoxuu 拍摄于 Dattle 幼年时期 %}

```
{% image /assets/xaoxuu/mirror/apple/documentation/watchkit/06d45110-1dd7-49a4-a413-9f5159ecdd0e.png width:200px padding:16px bg:white %}
```

{% folding 如果不进行约束，在宽屏设备上会占用很大篇幅 %}
{% image https://s.xaox.cc/xaoxuu/posts/202401131924265.jpg-hd %}
{% endfolding %}

<!-- tab 设置填充区域 -->

可以设置填充宽度和颜色，支持 `bg:var(--card)` 动态颜色，能够适配暗黑模式：

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
    fancybox: false
```

## quot 引用

适合居中且醒目的引用：{% quot Stellar 是迄今为止最好用的主题 %}

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
适合居中且醒目的引用：{% quot Stellar 是迄今为止最好用的主题 %}
支持自定义引号：{% quot 热门话题 icon:hashtag %}、{% quot 特别引用 icon:default %}
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

## okr 目标管理

这个功能在 {% mark 1.20.0 color:dark %} 版本后开始支持，这是一个 OKR（Objectives and Key Results）示例：

{% okr o1 %}

2024年的小目标：完成 Volantis 6.0 并发布上线
来自2025年的复盘：已《基本》实现目标 {% emoji tieba 滑稽 %}

<!-- okr kr1 percent:1 -->
重构 tag-plugins 和 wiki 系统
- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:0.9 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-0.12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}


<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image /assets/wiki/stellar/icon.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}

写法如下：

```
{% okr o1 %}

2024年的小目标：完成 Volantis 6.0 并发布上线
来自2025年的复盘：已《基本》实现目标 {% emoji tieba 滑稽 %}

<!-- okr kr1 percent:1 -->
重构 tag-plugins 和 wiki 系统
- 当 {% mark KR %} 进度为 100% 时，标签默认显示为 {% mark color:green 已完成 %}
- 当 {% mark KR %} 未设置进度时，默认为 {% mark 0% %}
- 当 {% mark O %} 未设置进度时，则显示所有 {% mark KR %} 进度平均值

<!-- okr kr2 percent:0.9 status:off_track -->
完成主要页面设计稿
{% tabs align:left %}
<!-- tab 小提示1 -->
您可以在 _config.yml 文件中修改标签的颜色和文案
<!-- tab 小提示2 -->
您可以在 _config.yml 文件中增加任意的标签配置
{% endtabs %}

<!-- okr kr3 percent:-0.12 status:unfinished -->
完成前置准备工作（如果你知道答案，请在留言区帮帮我！🥹）
{% checkbox 在咸水和海滩之间找一亩地 %}
{% checkbox 求出圆周率后15位 %}
{% checkbox 找出宇宙的终极逻辑 %}
{% checkbox 去地狱里走两步 %}

<!-- okr kr-4 status:at_risk -->
开发、测试和发布
{% image /assets/wiki/stellar/icon.svg height:64px 支持嵌套插入图片等其它简单组件 %}

{% endokr %}
```

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

支持 bilibili 和视频外链，可设置最大宽度， bili 可设置自动播放

{% video bilibili:BV1GP4y1d729 %}

{% grid c:2 %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
<!-- cell -->
{% video https://github.com/volantis-x/volantis-docs/releases/download/assets/IMG_0341.mov %}
{% endgrid %}

```md 写法如下
{% video bilibili:BV1GP4y1d729 %}

{% video bilibili:BV1GP4y1d729 width:100% autoplay:0 %}

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