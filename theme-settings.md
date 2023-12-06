---
layout: wiki
wiki: hexo-stellar
title: 网站和主题基本信息配置
---

## 站点信息

Stellar 会读取站点根目录下的 `_config.yml` 文件中的一些信息来生成您的网站，所以您需要修改以下值：

```yaml blog/_config.yml
title: 您的网站名称
avatar: 您的头像链接
favicon: 您的网站icon
subtitle: 您的网站副标题
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


## 头部标签自定义

### Open Graph

默认生成 Open Graph 标签，如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellar.yml
open_graph:
  enable: true
  twitter_id: # for open_graph meta
```
