---
date: 2023-12-06 21:55
updated: 2026-08-22 00:12
title: 网站和主题基本信息配置
collection:
  type: wiki
  id: hexo-stellar
---

## 站点信息

Stellar 会读取站点根目录下的 `_config.yml` 文件中的一些信息来生成您的网站，所以您需要修改以下值：

```yaml blog/_config.yml
title: 您的网站名称
avatar: 您的头像链接
favicon: 您的网站icon
# subtitle: # subtitle 已移至主题配置中
# 多语言
language:
  - zh-CN
  - en
```

更多关于 Hexo 文件的配置请移步官方文档

{% link https://hexo.io/zh-cn/docs/configuration %}

### 多语言设置

主题中的默认文案都支持多语言，以简体中文为例，您可以在 `themes/stellar/languages/zh-CN.yml` 中修改文案。

更改网站优先语言，需要在站点根目录下的配置文件中进行修改：

```yaml blog/_config.yml
language:
  - zh-CN
  - en
  - zh-TW
```

## 创建主题配置文件

在博客根目录的 `_config.yml` 文件旁边新建一个文件： `_config.stellar.yml` ，在这个文件中的配置信息优先级高于主题文件夹中的配置文件。

## 网站 Brand

侧边栏与支持的移动端列表页使用统一 `brand` 配置：

```yaml blog/_config.stellar.yml
brand:
  image:
    src: '{config.avatar}'
    style: avatar
    url: /about/
  name: '{config.title}'
  tagline: '{config.subtitle}'
  url: /
```

`image.style` 可选 `avatar`、`icon`、`plain`：头像正圆裁剪，图标使用圆角矩形，透明原图不裁剪也不填充背景。图片背景默认透明，可通过 `image.background` 显式配置；`plain` 禁止配置背景。

`image` 是原子对象；只要在 `_config.stellar.yml` 中覆盖它，就必须同时写出 `src` 和 `style`，不会从主题默认图片对象继承缺失字段。

`image.url` 是图片链接，根级 `url` 是名称链接。Brand 不再解析 `[图片](链接)` 或 `[名称](链接)` 形式的 Markdown 链接。


## 头部标签自定义

### Open Graph

默认生成 Open Graph 标签，如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellar.yml
open_graph:
  enable: true
  twitter_id: # for open_graph meta
```
