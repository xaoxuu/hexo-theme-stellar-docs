---
layout: wiki
wiki: Stellar
order: 113
title: 容器类标签（7个）
---


## ablock 普通块容器

note 标签就是使用 ablock 容器实现的，它们样式是相同的：

{% folding 更名记录（Stellar 1.18.0） color:warning %}
因为原 noteblock 标签在升级到 hexo 6.0 之后跟官方库冲突了，官方一直没有解释原因，后不得不改名：
noteblock -> grid -> border -> ablock
详情见：[#172](https://github.com/volantis-x/hexo-theme-volantis/issues/712)
{% endfolding %}

```md 语法格式
{% ablock [title] [color:color] [child:codeblock/tabs] %}
...
{% endablock %}
```

```md 写法如下
{% ablock Stellar v1.12.0 color:warning %}
因为原 noteblock 标签在升级到 hexo 6.0 之后跟官方库冲突了，官方一直没有解释原因，后不得不改名：
noteblock -> grid -> border
详情见：[#172](https://github.com/volantis-x/hexo-theme-volantis/issues/712)
{% endablock %}
```

### 彩色代码块

设置 `child:codeblock` 并设置 `color:颜色枚举` 可以实现 10 种不同颜色的代码块，彩色代码块一般可以用在代码正确与错误的示范对比场景。

{% grid %}
<!-- cell left -->
**推荐的写法**
{% ablock child:codeblock color:green %}
```swift
func test() {
    // ...
}
```
{% endablock %}
<!-- cell right -->
**不推荐的写法**
{% ablock child:codeblock color:red %}
```swift
func test() -> () {
    // ...
}
```
{% endablock %}

{% endgrid %}

### 嵌套其它标签

例如嵌套一个 `tabs` 标签：

{% ablock child:tabs %}
{% tabs %}
<!-- tab 图文混排 -->
{% image /assets/xaoxuu/blog/2020-0627a@2x.webp 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}
公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。
<!-- tab 示例代码 -->
<script src="https://gist.github.xaox.cc/xaoxuu/c983c958ef0deab819376c231e977ba7.js"></script>
{% endtabs %}
{% endablock %}

## Mermaid

安装插件

{% copy npm install --save hexo-filter-mermaid-diagrams %}



```yaml blog/_config.stellar.yml
  mermaid:
    enable: false
    # js: https://unpkg.com/mermaid@9.0.0/dist/mermaid.min.js
    js: https://cdn.jsdelivr.net/npm/mermaid@v9/dist/mermaid.min.js
    # Available themes: default | dark | forest | neutral
    # 推荐使用 dark 主题 在夜间模式下显示效果更好
    theme: dark
```

使用前需要在 Markdown 文件开头加入

```md
---
mermaid: true
---
```

{% tabs active:1 align:center %}

<!-- tab 演示效果 -->

{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}

<!-- tab 代码示例 -->

<script src="https://gist.github.xaox.cc/weekdaycare/f7769263a4df46b2d75e32684f4ae873.js"></script>

{% endtabs %}

## folding 折叠容器

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

## folders 多个折叠容器聚合

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

## tabs 分栏容器

这个标签移植自 [NexT](https://theme-next.js.org/docs/tag-plugins/tabs.html) 主题，但做了以下修改：

- 支持设置 `align:center` 来使内容居中
- 设置默认激活的标签方式为 `active:1` 而非 `, 1`（使用默认格式降低学习成本，且显式声明可读性更强）
- 不需要 `<!-- endtab -->` 来作为结束标识（因为 Stellar 会自动判断）
- 不需要 `tabs id` 来保证唯一性（因为 Stellar 会设置唯一标识）
- 不支持 `@icon` 方式设置图标（因为 Stellar 不再内置 `fontawesome` 图标库）
- 轮廓样式简化，可以搭配其它容器类标签嵌套使用。

{% tabs active:1 align:center %}

<!-- tab 演示效果 -->

{% tabs active:2 align:center %}

<!-- tab 图片 -->
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}

<!-- tab 代码块 -->
```swift
let x = 123
print("hello world")
```

<!-- tab 表格 -->
| a | b | c |
| --- | --- | --- |
| a1 | b1 | c1 |
| a2 | b2 | c2 |

{% endtabs %}

<!-- tab 示例代码 -->
<script src="https://gist.github.xaox.cc/xaoxuu/cfd4e9645047115c6aa9b19cd9b28e97.js"></script>

{% endtabs %}


## grid 网格分区容器

这个功能在 {% mark 1.12.0 color:dark %} 版本后开始支持，目前只支持显示一行两列，且手机端因宽度较窄会恢复为单列显示。

{% grid %}
<!-- cell left -->
{% image https://images.unsplash.com/photo-1653979731557-530f259e0c2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80 download:https://unsplash.com/photos/bcql6CtuNv0/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2Njg4NDAxMDI&force=true %}
<!-- cell right -->
**[Unsplash Photo](https://unsplash.com/photos/bcql6CtuNv0)**

The Galactic Center is the rotational center of the Milky Way galaxy. Its central massive object is a supermassive black hole of about 4 million solar masses, which is called Sagittarius A*. Its mass is equal to four million suns. The center is located 25,800 light years away from Earth.

> Ōwhiro Bay, Wellington, New Zealand
> Published on May 31, 2022
> SONY, ILCE-6000
> Free to use under the Unsplash License

{% endgrid %}

普通块样式：

{% grid bg:block %}
<!-- cell left -->
<center>左侧内容</center>
<!-- cell right -->
<center>右侧内容</center>
{% endgrid %}

卡片样式：

{% grid bg:card %}
<!-- cell left -->
<center>左侧内容</center>
<!-- cell right -->
<center>右侧内容</center>
{% endgrid %}

示例代码：

```
{% grid bg:block %}
<!-- cell left -->
<center>左侧内容</center>
<!-- cell right -->
<center>右侧内容</center>
{% endgrid %}
```

> `bg` 为可选参数，默认没有背景，可设置为 `block/card` 两种样式

## about 关于块容器

方便在关于页面显示一段图文信息，比普通块容器稍微有一点点不一样：

```
{% about avatar:/assets/xaoxuu/avatar/rect-256@2x.png height:80px %}

<img height="32px" alt="XAOXUU" src="/assets/xaoxuu/logo/180x30@2x.png">

**如果宇宙中真有什么终极的逻辑，那就是我们终有一天会在舰桥上重逢，直到生命终结。**

XAOXUU 目前是一个 iOS 开发者，代表作品有：ProHUD、ValueX 等。在业余时间也开发了 Stellar 博客主题，更多的作品可以去项目主页查看，希望大家喜欢～

{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}

{% endabout %}
```

{% note color:yellow 这个标签正在考虑重命名 请发表您的建议 [#198](https://github.com/xaoxuu/hexo-theme-stellar/discussions/198) %}


## swiper 轮播容器

默认一张图片是 50% 宽度，通过设置 `width:min` 设置为 25% 宽度，`width:max` 设置为 100% 宽度。

{% swiper effect:cards %}
![](https://images.unsplash.com/photo-1625171515821-1870deb2743b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1528283648649-33347faa5d9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1524797905120-92940d3a18d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
{% endswiper %}

```md 写法如下
{% swiper effect:cards %}
![](https://images.unsplash.com/photo-1625171515821-1870deb2743b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1528283648649-33347faa5d9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1542272201-b1ca555f8505?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
![](https://images.unsplash.com/photo-1524797905120-92940d3a18d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)
{% endswiper %}
```

{% tabs %}
<!-- tab 宽度 -->

```md 写法如下
{% swiper width:min/max %}
...
{% endswiper %}
```
<!-- tab 切换效果 -->
```
{% swiper effect:cards/coverflow %}
...
{% endswiper %}
```

{% note color:warning 注意 一个页面只能设置一次，第一个 `swiper` 容器的效果全局生效。 %}

{% endtabs %}
