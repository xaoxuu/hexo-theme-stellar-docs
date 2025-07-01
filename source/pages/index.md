---
wiki: hexo-stellar
title: 编写文章以及独立页面
---

## 文章类型

文章类型决定布局风格，有两种风格可选，`tech`: 默认技术类文章, `story`: 图文类文章，文字和段落间增距大。

```yaml blog/_config.stellar.yml
article:
  type: tech # tech/story
```

可以在 `front-matter/topic/wiki` 中覆盖此参数。

## 文章封面

在文章列表页面或者其他位置显示的文章摘要卡片上面的图片称之为「文章封面」

### 自动生成封面

根据 `tags` 作为关键词为每一篇文章在线搜索封面：

```yaml blog/_config.stellar.yml
article:
  auto_cover: true
```

### 引用外部图片

在文章的 `front-matter` 中写上 `cover: xxx` 即可。例如：

```yaml blog/source/_posts/xxx.md
---
# 本地图片路径为 blog/source/assets/xaoxuu/blog/2020-0927a@1x.svg
# 也可以直接引用图片直链 https://xxx.jpg
cover: https://gcore.jsdelivr.net/gh/xaoxuu/assets.xaoxuu.com/xaoxuu/blog/2020-0927a@1x.svg
---
```

{% folding 显示效果 open:false %}
{% image https://pic.imgdb.cn/item/63bc16f2be43e0d30eb899d1.jpg width:600px ratio:884/554 %}
{% endfolding %}

上面这种方式会显示title与description或者摘要，若你想要图片全显示，可以加入如下参数：

```yaml blog/source/_posts/xxx.md
---
cover: https://gcore.jsdelivr.net/gh/xaoxuu/assets.xaoxuu.com/xaoxuu/blog/2020-0927a@1x.svg # 必选
poster: # 海报（可选，全图封面卡片）
  topic: 标题上方的小字 # 可选
  headline: 大标题 # 必选
  caption: 标题下方的小字 # 可选
  color: 标题颜色 # 可选，默认为跟随主题的动态颜色 # white,red...
---
```

Stellar {% mark v1.14.0 %} 更换 `cover-title` `cover-cat` `cover-subtitle` `cover-text-color` 为 `poster`

> 为了显示美观，建议 `topic` 和 `caption` 选择其一与 `headline` 搭配使用。

{% folding 显示效果 open:false %}

填写 `topic` 与 `headline` 时大标题位于上方

{% image https://pic1.imgdb.cn/item/635aa9d016f2c2beb1fe4f53.jpg width:600px ratio:890/466 %}

只填写 `headline` 或填写 `headline` 与 `caption` 时大标题位于下方

{% image https://pic1.imgdb.cn/item/635aaa8116f2c2beb1ffdd19.jpg width:600px ratio:894/466 %}

{% endfolding %}

## 内容摘要

### 自动生成摘要

建议您通过 `description` 或者 `excerpt` 方式生成摘要，但如果您希望自动从文章内容截取一定字数的文字作为摘要，可以这样设置：

```yaml blog/_config.stellar.yml
article:
  auto_excerpt: 200
```

### 手动设置摘要

一篇文章开头一段文字描述就是摘要，摘要和正文用 `<!-- more -->` 隔开，前后一定要有空行。例如：

```yaml blog/source/_posts/xxx.md
---
cover: https://gcore.jsdelivr.net/gh/xaoxuu/assets.xaoxuu.com/xaoxuu/blog/2020-0927a@1x.svg
---

在心率管家默默无闻地上线了一年多之后，现在终于打算来好好聊聊关于手机摄像头测量心率的那些事。本文参考了很多前辈的文章，将在文末列出。

<!-- more -->

后面是正文部分，在主页看不到。
```

### AI摘要

基于 `tianli_gpt` 前端项目 [Post-Summary-AI](https://github.com/qxchuckle/Post-Summary-AI)

```yaml _config.stellar.yml
  # AI 摘要
  # https://github.com/qxchuckle/Post-Summary-AI
  tianli_gpt: 
    enable: #true
    js: https://jsd.onmicrosoft.cn/gh/qxchuckle/Post-Summary-AI@6.0/chuckle-post-ai.min.js
    field: post # all, post, wiki
    key: 5Q5mpqRK5DkwT1X9Gi5e # tianli_gpt key
    total_length: 1000 # 设置提交的字数限制，默认为1000字，上限为5000，超过5000字符将被截断
    typewriter: true # 打字机动画 
    summary_directly: true # 是否直接显示摘要，否则显示 AI 简介
    rec_method: all # all, web # 文章推荐方式，all：匹配数据库内所有文章进行推荐，web：仅当前站内的文章，默认all
    hide_shuttle: true # 是否隐藏矩阵穿梭
    summary_toggle: false # 是否开启切换简介功能，经过一些处理后，重新生成一份简介，这将消耗key字数
    interface: # AI 信息展示
      name: AI摘要
      introduce: '我是文章辅助AI: QX-AI，点击下方的按钮，让我生成本文简介、推荐相关文章等。'
      version: TianliGPT
      button: ["介绍自己", "推荐文章", "生成摘要", "矩阵穿梭"] # 底部按钮文字
```

如何获取 `tianliGPT_key`：到 [爱发电](https://afdian.net/item/f18c2e08db4411eda2f25254001e7c00) 中购买，购买完成后，进入 [网页后台管理](https://summary.zhheo.com) 绑定key并添加自己的站点

> key与博客地址为绑定状态，所以本地调试时是无法接收到数据的。

## 文章模板

使用 Hexo 自带模板实现命令行创建新文章时自动生成相关信息。

根目录下 `scaffolds` 文件夹中编辑 `post.md` 的 `font-matter` ，根据自己的需要增加你想要配置的内容

```yaml blog/scaffolds/post.md
---
# 基本信息
title: {{ title }}
date: {{ date }}
tags: []
categories: []
description: # excerpt 也可 
# 封面
cover: 
banner: 
poster: # 海报（可选，全图封面卡片）
  topic: 标题上方的小字 # 可选
  headline: 大标题 # 必选
  caption: 标题下方的小字 # 可选
  color: 标题颜色 # 可选
# 插件
sticky: # 数字越大越靠前
mermaid:
katex: 
mathjax: 
# 可选
topic: # 专栏 id
author: 
references:
comments: # 设置 false 禁止评论
indexing: # 设置 false 避免被搜索
breadcrumb: # 设置 false 隐藏面包屑导航
leftbar: 
rightbar:
h1: # 设置为 '' 隐藏标题
type: # tech/story
---
```

## 文章页

### 横幅图片

文章页面顶部区域可以显示长长的横幅图片，设置方法如下：

```yaml blog/source/_posts/xxx.md
banner: https://gcore.jsdelivr.net/gh/xaoxuu/assets.xaoxuu.com/xaoxuu/blog/2020-0927a@1x.svg
```

### 指定一级标题

默认的一级标题是文章的 `title`，如果希望使用别的文字作为一级标题，可以指定 `h1`，例如：

```yaml blog/source/_posts/xxx.md
---
h1: 快速开始
---
```

### 隐藏文章标题

同上述操作，但是 `h1` 设置为空字符串即可：

```yaml blog/source/_posts/xxx.md
---
h1: ''
---
```

## 文章索引与推荐

文章如果有分类和标签就会自动在主页出现「分类」、「标签」选项卡实现分类浏览，不需要手动添加页面。

### 文章分类

在文章列表页面会显示文章所属的第一级分类，例如：

```yaml blog/source/_posts/xxx.md
---
categories: [设计开发, iOS开发]
---
```

这样写就只会显示「设计开发」一级分类，而在文章页面顶部则会显示完整的面包屑导航。

### 文章标签

文章标签目前不可见，用于关键词、搜索、按标签检索、相关文章推荐等功能，例如：

```yaml blog/source/_posts/xxx.md
---
tags: [iOS, 心率]
---
```

### 相关文章推荐

要实现相关文章推荐功能，您需要安装插件：

{% copy npm i hexo-related-popular-posts %}

然后在主题配置文件中开启：

```yaml blog/_config.stellar.yml
article:
  # npm i hexo-related-popular-posts
  related_posts:
    enable: true
    title: 您可能感兴趣的文章
```

开启后会在每篇文章的下方推荐相同类型的文章。

## 参考资料

用 markdown 格式填写引用的文章，注意要写在引号中：

```yaml blog/source/_posts/xxx.md
---
references:
  - '[心跳之旅—💗—iOS用手机摄像头检测心率(PPG)](https://punmy.cn/2016/07/28/15231176397746.html)'
  - '[PPG光电容积脉搏波描记法技术概况](https://www.jianshu.com/p/695c131abfa5)'
  ...
---
```

效果见这篇文章：

{% link https://xaoxuu.com/blog/20200927/#references %}

## 许可协议

你可以更改协议内容或者自定义其他选项，支持 MarkDown 语法。

```yaml blog/_config.stellar.yml
article:
  license: '本文采用 [署名-非商业性使用-相同方式共享 4.0 国际](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。'
```

若你配置了作者数据 `_data/authors.yml` 和文章作者，可以在 license 中使用 `{author.name}` 来自动替换为当前文章作者名字。

```yaml blog/_config.stellar.yml
article:
  license: '本文由{author.name}编写，采用...'
```

## 分享链接

分享至微信会生成对应的页面二维码，weibo 和 email 会自动跳转到对应软件或网页，link 会拷贝当前页面链接至剪切板。

```yaml blog/_config.stellar.yml
article:
  share: # [wechat, weibo, email, link]
```

## 覆盖 OpenGraph

如果分享到社交平台的缩略图不理想，可以通过这个特性覆盖为自己想要的：

```yaml blog/source/_posts/xxx.md
open_graph:
  image: https://gcore.jsdelivr.net/gh/xaoxuu/assets.xaoxuu.com/xaoxuu/blog/2022-1029a@2x.webp
```

## 更多的独立页面

Stellar 同时具有博客和 Wiki 两个大模块，为了能够正确进行导航栏高亮，引入了 `menu_id` 来进行区分，可以在 `front-matter` 中指定 `menu_id` 来使某个菜单按钮处于选中状态。

例如您有关于、友链两个页面，都希望高亮「更多」按钮：

```yaml blog/source/about/index.md
---
menu_id: more
title: 关于
---
```

```yaml blog/source/friends/index.md
---
menu_id: more
title: 友链
---
```

在主题配置文件中设置导航栏：

```yaml blog/_config.stellar.yml
menubar:
  columns: 4 # 一行多少个
  items: # 可按照自己需求增加，符合以下格式即可
    ...
    - id: more
      theme: ''
      title: 更多
      icon: ''
      url: /more/
```

## 友链页面

友链被设计成标签，您可以在任何页面任何位置插入友链，详见：

{% link https://xaoxuu.com/wiki/stellar/tag-plugins/#友链标签 #友链标签 %}

## 关于页面

没有单独的关于页面布局，您可以自由组合丰富的标签来实现个性化的关于页面，例如：`about`、`tabs`、`navbar`、`quot`、`timeline` 标签。

