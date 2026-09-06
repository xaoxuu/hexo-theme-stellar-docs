---
title: 创建站点
date: 2026-09-05 20:49
updated: 2026-09-06 02:23
---

本页从新建 Hexo 站点开始，配置站点名称、发布一篇文章，并在本地预览。完成后的博客会在左侧显示站点名称，首页列出刚发布的文章。

## 新建 Hexo 站点

已经有 Hexo 8 站点，可以跳到下一节。否则在准备存放博客的目录运行：

```sh
npx hexo-cli init my-blog
cd my-blog
npm install
```

随后按[安装指南](/wiki/stellar/start/install/)把 Stellar 放进 `my-blog`。

## 设置站点名称

在博客根目录的 Hexo 配置文件 `_config.yml` 中填写标题、网址、语言和主题：

```yaml blog/_config.yml
title: 山间来信
url: https://example.com
language: zh-CN
theme: stellar
```

再新建 `_config.stellar.yml`。这是 Stellar 自己的配置文件，只写你想改变的部分：

```yaml blog/_config.stellar.yml
leftbar:
  brand:
    name: 山间来信
    tagline: 记录阅读、旅行与日常
    href: /
```

头像可以省略，此时只显示站点名称和标语。

## 发布第一篇文章

```sh
npx hexo new post "第一封来信"
```

Hexo 会在 `source/_posts/` 里创建 Markdown 文件。保留自动生成的日期，把内容改成这样：

```markdown blog/source/_posts/第一封来信.md
---
title: 第一封来信
date: 2026-09-05 12:00
tags: [日常]
---

今天开始记录沿途见闻。

<!-- more -->

## 山间散步

先写下一件具体的小事，再慢慢补充细节。
```

`<!-- more -->` 前面的文字会出现在首页卡片里，后面的正文只在文章页显示。

## 本地预览

```sh
npx hexo stellar doctor
npx hexo generate
npx hexo server
```

终端会给出一个本地地址，通常是 `http://localhost:4000/`。打开后确认三件事：页面能显示“山间来信”、首页有“第一封来信”、点进去能看到完整正文。

本地预览完成后，可以按站点采用的 Hexo 托管流程部署。Stellar 不限制托管平台。

接着可以[设置外观与常用功能](/wiki/stellar/start/configuration/)。如果你想先看别人怎样组织内容，可以查看[站点示例与展示墙](/wiki/stellar/support/examples/)。
