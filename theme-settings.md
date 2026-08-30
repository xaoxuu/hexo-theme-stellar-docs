---
date: 2023-12-06 21:55
updated: 2026-08-27 11:12
title: 网站和主题基本信息配置
collection:
  profile: wiki
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

这些字段继续供 Hexo、SEO 等站点能力使用；侧边栏 Brand 不会从这里继承 `title`、`avatar` 或 `subtitle`。

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

开发预览时，保存站点根目录的 `_config.stellar.yml` 会自动重读配置并重新生成页面，无需重启 `hexo server`。新配置未通过 Schema 校验时，终端会显示警告并继续使用上一次有效配置。站点 `_config.yml` 是 Hexo 核心配置，修改后仍可能需要重启。

YAML 字段可以暂时留空，不需要为了通过校验而填写占位值。例如只写 `topbar:` 时，主题会将它视为未配置并使用默认值，不会中断热重载。只有当某字段明确把 `null` 定义为关闭或继承语义时，空值才会被保留，例如 `extensions.search.provider: null` 表示关闭搜索。非空的错误类型仍会报错。

## 网站 Brand

侧边栏与支持的移动端列表页使用 `site.brand`：

```yaml blog/_config.stellar.yml
site:
  brand:
    image:
      src: https://example.com/avatar.webp
      variant: avatar
      href: /about/
    name: 我的博客
    wordmark: https://example.com/wordmark.svg
    tagline:
      text: 每个人的独立博客
      hover: example.com
    href: /
```

`image.variant` 可选 `avatar`、`icon`、`plain`：头像正圆裁剪，图标使用圆角矩形，透明原图不裁剪。`image.href` 是图片链接，根级 `href` 是标题或字标链接。

`name` 只接受纯文本；图片字标请使用 `wordmark`。`tagline.text` 和 `tagline.hover` 分别是普通与悬停文案。`image.src`、`name` 和 `tagline.text` 只读取主题配置，省略时均为 `null`，不会继承 Hexo 的 `avatar`、`title` 或 `subtitle`。普通页面没有配置图片、名称或字标时不会显示 Brand Header。

Brand 不解析 HTML 或 Markdown 链接，旧 `style/url/background` 字段会由 `stellar doctor` 报告迁移错误。


## 头部标签自定义

### Open Graph

默认生成 Open Graph 标签，如果您不希望生成它，可以在主题配置文件中关闭：

```yaml blog/_config.stellar.yml
open_graph:
  enable: true
  twitter_id: # for open_graph meta
```
