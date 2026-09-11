---
title: 文章与页面
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

随时间发布的内容放在 `source/_posts/`。关于、友链这类不属于时间线的内容，更适合放在 `source/<name>/index.md`。

系列文章可以整理成[专栏](/wiki/stellar/guides/topic/)；按章节编排的文档适合 [Wiki](/wiki/stellar/guides/wiki/)，按多级标签整理的知识适合[笔记本](/wiki/stellar/guides/notebook/)。

## 创建文章与页面

```markdown blog/source/_posts/一次散步.md
---
title: 一次散步
date: 2026-09-05 12:00
tags: [生活]
article:
  style: story
---

走过熟悉的小路，也能看见新的风景。
```

普通独立页面只需标题和正文。自定义永久地址使用 Hexo `permalink`，发布后的地址应保持稳定。

## 列表卡片与横幅

> 版本范围：本页按 rc.4 之后的当前开发版源码核对（截至 2026-09-12）。其中新增或调整的配置不代表已发布 rc.4 的行为；使用 npm 候选版时请对照对应版本源码。

```yaml blog/source/_posts/一次散步.md
cover: /images/walk-card.webp
tagline: 写给周末的一段小记
banner:
  headline: 一次散步
  tagline: 午后，沿溪向北
```

根级 `cover` 同时用于列表卡片与内容横幅，`tagline` 用于列表小字，`banner` 控制横幅文字和头像；`banner.enabled: false` 可关闭整个横幅。没有图片时可省略；Collection 的封面不会自动成为成员文章的封面。

全站文章卡片和置顶区在主题配置中调整：

```yaml blog/_config.stellar.yml
article:
  listing:
    card_layout: classic
    pinned_layout: flat
    show_tags: true
  show_reading_time: true
```

## 排版与作者

`article.style` 可选 `tech`、`story`；`article.paragraph_indent` 可选 `auto`、`always`、`never`。`auto` 随排版风格决定缩进。作者数据保存在 `source/_data/authors.yml`，页面用 `article.author` 指向作者 ID。

```yaml blog/source/_data/authors.yml
lin:
  name: 林
  avatar: /images/lin.webp
  cover: /images/lin-cover.webp
  description: 写作与散步
  url: /about/
```

```yaml blog/source/_posts/一次散步.md
article:
  author: lin
  ai_label: manual
```

作者个人资料页在当前开发版中使用作者的 cover 作为横幅背景，avatar 为头像、description 为小字；作者页列表包含该作者的普通文章和 Topic 文章。

AI 标记可选 `manual`、`reviewed`、`polished`、`generated`，用来说明内容的创作方式，按实际情况填写。

## 置顶与可见性

```yaml blog/source/_posts/一次散步.md
listing:
  priority: 5
visibility:
  listed: true
  searchable: true
```

正整数优先级越大越靠前，`0` 不置顶。列表与搜索开关彼此独立，隐藏列表不等于访问控制；已经生成的页面仍可通过 URL 访问。Wiki、Topic、Notebook 成员省略 `visibility` 时继承 Collection，页面仍可显式覆盖。Wiki 和普通 Page 不支持 `listing.priority`。

## 页脚与评论

```yaml blog/source/_posts/一次散步.md
footer:
  references:
    - '[参考资料](https://example.com)'
  license: false
  share: [qrcode, email]
comments:
  enabled: false
```

菜单、三个 Region、页脚和评论都可按页覆盖。普通 Post 默认使用全局 Article 页脚；Wiki、Notebook Collection 默认关闭分享，Topic 继承全局 Article 分享，可在 Collection 或页面用 `footer.share: true` 恢复全局服务。所有字段及关闭、继承方式见 [Front Matter 参考](/wiki/stellar/reference/front-matter/)。

修改配置后重新生成站点，卡片、置顶和搜索设置才会反映到页面中。
