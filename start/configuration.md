---
title: 基础配置
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

本页介绍外观、菜单、搜索和评论的常用设置。除另有标注外，配置都写在博客根目录的 `_config.stellar.yml`。

## 选择外观预设

```yaml blog/_config.stellar.yml
appearance:
  preset: minimal
  color_scheme: auto
  colors:
    primary: '#2f6f68'
    accent: '#c96f4a'
```

内置外观包括 `card`、`glass`、`minimal`、`flat`。这里以 `minimal` 为例；字体、背景和圆角的设置见[外观与排版](/wiki/stellar/guides/appearance/)。

## 配置导航菜单

```yaml blog/_config.stellar.yml
leftbar:
  menu:
    - id: post
      title: 文章
      icon: default:documents
      url: /
    - id: about
      title: 关于
      icon: default:profile
      url: /about/
```

菜单是一个完整列表。写了这段以后，它会替换默认菜单，而不是追加在后面。菜单中的链接需要有对应页面；尚未创建的页面可以暂时不加入菜单。

## 站内搜索

v2 默认启用本地搜索，生成站点时主题会写出搜索索引。当前开发版（rc.4 之后）入口位于 Leftbar Brand，由 leftbar.brand.search 控制，默认 true；请先按[Brand 指南](/wiki/stellar/guides/brand/)配置可显示的名称或图片。

如果不想让某篇页面进入搜索，在那篇 Markdown 的开头写：

```yaml
visibility:
  searchable: false
```

搜索范围、Algolia 和章节定位见[站内搜索](/wiki/stellar/guides/search/)。

## 接入评论服务

评论默认关闭。要添加评论区，需要准备 Giscus、Waline 等服务，再在 `_config.stellar.yml` 中填写连接参数。

[评论接入指南](/wiki/stellar/guides/comments/)列出了各服务的连接参数，以及更换页面路径时保留旧讨论的方法。

## 配置文件的位置

Hexo、主题和各类内容使用不同的配置文件：

| 文件 | 放什么 |
| :--- | :--- |
| `_config.yml` | Hexo 的网址、语言、标题、分页和插件 |
| `_config.stellar.yml` | Stellar 的外观、导航、搜索和全站默认值 |
| `source/_data/wiki/<id>.yml` | 某一套 Wiki 文档的名称、目录和路径 |
| `source/_data/topic/<id>.yml` | 某一个专栏 |
| `source/_data/notebooks/<id>.yml` | 某一本笔记本 |
| Markdown 顶部 | 当前文章或页面自己的信息 |

配置文件只需填写要修改的值。未填写的部分会使用主题默认值，也会随主题更新；复制整份默认配置会固定这些值。

同一个页面类型还可以拥有自己的左右栏。例如只在文章页显示目录：

```yaml blog/_config.stellar.yml
profiles:
  post:
    rightbar:
      widgets: [toc]
```

对象通常只覆盖写出来的字段，数组则整体替换；`widgets: []` 表示明确清空。`null` 在不同位置可能表示继承或关闭，拿不准时查[行为参考](/wiki/stellar/reference/behavior/)。

保存后运行：

```sh
npx hexo stellar doctor
npx hexo generate
```

生成后即可预览菜单、颜色和搜索效果。完整字段见[主题配置参考](/wiki/stellar/reference/theme/)。
