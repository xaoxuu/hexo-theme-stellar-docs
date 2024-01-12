---
layout: wiki
wiki: hexo-stellar
title: 容器类标签组件（11个）
---


## box 盒子容器

note 标签就是使用 box 容器实现的，它们样式是相同的：

{% folding 更名记录（Stellar 1.18.0） color:warning %}
因为原 noteblock 标签在升级到 hexo 6.0 之后跟官方库冲突了，官方一直没有解释原因，后不得不改名：
noteblock -> grid -> border -> ablock -> box
详情见：[#172](https://github.com/volantis-x/hexo-theme-volantis/issues/712)
{% endfolding %}

```md 语法格式
{% box [title] [color:color] [child:codeblock/tabs] %}
...
{% endbox %}
```

```md 写法如下
{% box Stellar v1.12.0 color:warning %}
因为原 noteblock 标签在升级到 hexo 6.0 之后跟官方库冲突了，官方一直没有解释原因，后不得不改名：
noteblock -> grid -> border -> ablock -> box
详情见：[#172](https://github.com/volantis-x/hexo-theme-volantis/issues/712)
{% endbox %}
```

### 彩色代码块

设置 `child:codeblock` 并设置 `color:颜色枚举` 可以实现 10 种不同颜色的代码块，彩色代码块一般可以用在代码正确与错误的示范对比场景。

{% tabs %}
<!-- tab 示例 -->
{% grid %}
<!-- cell -->
**推荐的写法**
{% box child:codeblock color:green %}
```swift
func test() {
    // ...
}
```
{% endbox %}
<!-- cell -->
**不推荐的写法**
{% box child:codeblock color:red %}
```swift
func test() -> () {
    // ...
}
```
{% endbox %}
{% endgrid %}
<!-- tab 示例代码 -->
<script src="https://gist.github.xaox.cc/weekdaycare/741807d61e5796a91647510b9029a8f1.js"></script>
{% endtabs %}

### 嵌套其它标签

例如嵌套一个 `tabs` 标签：

{% box child:tabs %}
{% tabs %}
<!-- tab 图文混排 -->
{% image /assets/xaoxuu/blog/2020-0627a@2x.webp 个人电脑作为办公设备时，我们该如何保护隐私？ download:true %}
公司一般都会强制安装安防软件，这些软件要求开机自启动，要求有屏幕录制权限、完全的磁盘访问权限包括相册图库。因此如果使用自己的 MacBook 作为办公设备，必须要把生活区和工作区完全独立开，安装在两个磁盘分区，并且对磁盘分区进行加密。
<!-- tab 示例代码 -->
<script src="https://gist.github.xaox.cc/xaoxuu/c983c958ef0deab819376c231e977ba7.js"></script>
{% endtabs %}
{% endbox %}

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

这个功能在 {% mark 1.24.0 %} 版本后获得重构，支持固定列数、动态列数、设置间距和圆角。

{% quot el:h3 动态列数 %}

默认的布局为【最小宽度为240px】即如果页面宽度大于 480px 则会显示为 2 列，大于 720px 则会显示为 3 列，以此类推，下面是效果：

{% grid %}
<!-- cell -->
{% image https://images.unsplash.com/photo-1653979731557-530f259e0c2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80 download:https://unsplash.com/photos/bcql6CtuNv0/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2Njg4NDAxMDI&force=true %}
<!-- cell -->
**[Unsplash Photo](https://unsplash.com/photos/bcql6CtuNv0)**

The Galactic Center is the rotational center of the Milky Way galaxy. Its central massive object is a supermassive black hole of about 4 million solar masses, which is called Sagittarius A*. Its mass is equal to four million suns. The center is located 25,800 light years away from Earth.

> Ōwhiro Bay, Wellington, New Zealand
> Published on May 31, 2022
> SONY, ILCE-6000
> Free to use under the Unsplash License

{% endgrid %}

```md 示例写法如下：
{% grid %}
<!-- cell -->
{% image https://images.unsplash.com/photo-1653979731557-530f259e0c2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80 download:https://unsplash.com/photos/bcql6CtuNv0/download?ixid=MnwxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2Njg4NDAxMDI&force=true %}
<!-- cell -->
**[Unsplash Photo](https://unsplash.com/photos/bcql6CtuNv0)**

The Galactic Center is the rotational center of the Milky Way galaxy. Its central massive object is a supermassive black hole of about 4 million solar masses, which is called Sagittarius A*. Its mass is equal to four million suns. The center is located 25,800 light years away from Earth.

> Ōwhiro Bay, Wellington, New Zealand
> Published on May 31, 2022
> SONY, ILCE-6000
> Free to use under the Unsplash License

{% endgrid %}
```

如果要修改最小宽度，可以这样写：

```md
{% grid w:350px %}
...
{% endgrid %}
```

{% quot el:h3 固定列数 %}

如果要固定为 2 列，可以这样写：

```md
{% grid c:2 %}
...
{% endgrid %}
```

{% quot el:h3 背景样式 %}

普通 Box 样式：

{% grid bg:box w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}

可浮起的卡片样式：

{% grid bg:card w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}

```md 示例写法如下：
普通 Box 样式：

{% grid bg:box w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}

可浮起的卡片样式：

{% grid bg:card w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}
```


{% quot el:h3 设置间距 %}

默认间距为 `16px`，如果需要修改，可以这样写：

```md
{% grid bg:card gap:32px w:120px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}
```

{% grid bg:card gap:32px w:120px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}

{% quot el:h3 设置圆角半径 %}

默认圆角半径等同于卡片的圆角半径，如果需要修改，可以这样写：

```md
{% grid bg:card br:4px w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}
```

{% grid bg:card br:4px w:150px %}
<!-- cell -->
cell 1
<!-- cell -->
cell 2
<!-- cell -->
cell 3
<!-- cell -->
cell 4
{% endgrid %}

> 这里的 br 是 border-radius 的缩写，虽然和 `<br>` 易混淆，但是我不知道是否有其他更好的命名，全称太长了。

## gallery 图库容器

这个功能在 {% mark 1.21.0 color:dark %} 版本后开始支持，其内部只能填写 md 格式的图片。

{% gallery %}
![@tianhao_wang](https://images.unsplash.com/photo-1688142202243-e218ad203952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1700994630045-f7a20df6d92e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjN8fHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1533274221104-015a584a1005?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1539604214100-ab860d9082e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1698843848092-588f9c1bb0bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mzh8fHxlbnwwfHx8fHw%3D)
![@vklemen](https://images.unsplash.com/photo-1516571748831-5d81767b788d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
{% endgallery %}

```md 写法如下
{% gallery %}
![@tianhao_wang](https://images.unsplash.com/photo-1688142202243-e218ad203952?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYzfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1700994630045-f7a20df6d92e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjN8fHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1533274221104-015a584a1005?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE4fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1539604214100-ab860d9082e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D)
![@eberhard](https://images.unsplash.com/photo-1698843848092-588f9c1bb0bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mzh8fHxlbnwwfHx8fHw%3D)
![@vklemen](https://images.unsplash.com/photo-1516571748831-5d81767b788d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)
{% endgallery %}
```

详细用法请看这篇文章：

{% link /blog/20231223 %}

## albums 专辑容器

类似于 gallery 但是支持点击跳转，数据来源于 `blog/source/_data/links/group_id.yml`

```md blog/source/_posts/xxx.md
{% albums group_id %}
```

{% albums music %}

## posters 海报容器

类似于 gallery 但是支持点击跳转，数据来源于 `blog/source/_data/links/group_id.yml`

```md blog/source/_posts/xxx.md
{% posters group_id %}
```

{% posters games %}

## banner 横幅容器

这个功能在 {% mark 1.21.0 color:dark %} 版本后开始支持，将会取代 about 组件，请尽快完成迁移。

### 用于独立页面顶部

{% banner 随记 bg:/assets/banner/notes.jpg %}
{% navbar active:/notes/ [随记](/notes/) [收藏](/bookmark/) %}
{% endbanner %}

```md 写法如下：
{% banner 随记 bg:/assets/banner/notes.jpg %}
{% navbar active:/notes/ [随记](/notes/) [收藏](/bookmark/) %}
{% endbanner %}
```

### 用于用户个人资料页

{% banner 某某 这是个人简介 avatar:/assets/xaoxuu/avatar/rect-256@2x.png bg:/assets/banner/nebula.jpg %}
{% endbanner %}

```md 写法如下：
{% banner 某某 这是个人简介 avatar:/assets/xaoxuu/avatar/rect-256@2x.png bg:/assets/banner/nebula.jpg %}
{% endbanner %}
```

### 用作文章摘要卡片

设置 link 可以让整个卡片响应点击事件，实现点击跳转到对应文章：

```md
{% banner 博客进阶：自动化部署 本文讲了如何利用脚本和 GitHub Actions 简化博客搭建和部署流程，提高效率。 bg:/assets/xaoxuu/blog/2022-1126a@2x.jpg link:/blog/20221126/ %}
{% endbanner %}
```

{% banner 博客进阶：自动化部署 本文讲了如何利用脚本和 GitHub Actions 简化博客搭建和部署流程，提高效率。 bg:/assets/xaoxuu/blog/2022-1126a@2x.jpg link:/blog/20221126/ %}
{% endbanner %}


## about 关于块容器

{% note color:warning 这个功能即将废弃 在 1.21.0 版本后请使用 banner 组件代替。 %}

方便在关于页面显示一段图文信息，比普通块容器稍微有一点点不一样：

```
{% about avatar:/assets/xaoxuu/avatar/rect-256@2x.png height:80px %}

<img height="32px" alt="XAOXUU" src="/assets/xaoxuu/logo/180x30@2x.png">

**如果宇宙中真有什么终极的逻辑，那就是我们终有一天会在舰桥上重逢，直到生命终结。**

XAOXUU 目前是一个 iOS 开发者，代表作品有：ProHUD、ValueX 等。在业余时间也开发了 Stellar 博客主题，更多的作品可以去项目主页查看，希望大家喜欢～

{% navbar [文章](/) [项目](/wiki/) [留言](#comments) [GitHub](https://github.com/xaoxuu/) %}

{% endabout %}
```


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
