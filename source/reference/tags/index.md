---
title: 标签语法
date: 2023-12-06 21:55
updated: 2026-09-06 14:10
---

Stellar 标签使用空格分隔参数。参数中的空格若被误当成分隔符，可以用 `&nbsp;` 代替。本文档用方括号表示可选参数，用冒号表示键值对，例如：

```
{% image src [description] [download:bool/string] %}
```

这里的 `src` 是必填的图片链接；`description` 是可选的图片描述；`download` 是可选的下载设置，接受布尔值或链接字符串。实际书写时不需要方括号。

{% box 了解参数解析规则 %}

参数分为按顺序填写的位置参数，以及 `键:值` 形式的命名参数。以图片标签为例：

```
{% image https://gcore.jsdelivr.net/gh/cdn-x/wiki/stellar/photos/183e71e0ad995.jpg 来自印度的 Rohit Vohra 使用 iPhone 12 Pro Max 拍摄。 download:https://www.apple.com.cn/newsroom/images/product/iphone/lifestyle/Apple_ShotoniPhone-rohit_vohra_12172020.zip ratio:1960/1468 %}
```

`download:…` 和 `ratio:…` 通过名称识别，可以调整位置。图片地址和描述按顺序识别，地址必须在描述前。图片标签会把描述中由空格分开的文字合并，因此这里的英文姓名也能完整显示。

各标签接受的参数、默认值和空输入行为见对应语法说明。

{% endbox %}

## 全部内置标签

当前 v2 共注册 54 个标签名称，下列清单与主题注册表一一对应。

- [容器类](/wiki/stellar/reference/tags/container/)：`box`、`dropdown`、`folding`、`folders`、`tabs`、`grid`、`banner`、`gallery`、`swiper`、`table`。
- [数据类](/wiki/stellar/reference/tags/data/)：`timeline`、`friends`、`sites`、`albums`、`posters`、`md`、`ghcard`、`gist`、`toc`。
- [表达类](/wiki/stellar/reference/tags/express/)：`emoji`、`icon`、`vote`、`rating`、`mark`、`hashtag`、`image`、`blockquote`、`quot`、`poetry`、`paper`、`reel`、`note`、`link`、`button`、`okr`、`copy`、`radio`、`checkbox`、`audio`、`video`、`chat`、`navbar`、`frame`、`mbti`、`tip`。
- [文本修饰](/wiki/stellar/reference/tags/express/#文本修饰标签集)：`blur`、`psw`、`u`、`emp`、`wavy`、`del`、`sup`、`sub`、`kbd`。

`about`、`users` 是 v1 遗留标签，v2 不再注册；替代方式见[配置对照](/wiki/stellar/migration/fields/#标签与动态数据)。
