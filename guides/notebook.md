---
title: 笔记本
date: 2025-06-14 19:48
updated: 2026-09-07 20:24
footer:
  references:
    - '[PR#464 @calfzhou](https://github.com/xaoxuu/hexo-theme-stellar/pull/464)'
---

笔记本适合持续补充的知识记录，通过多级标签整理内容，无需手动编排目录。每篇笔记属于一本笔记本，可以添加多个标签。

## 创建笔记本

```yaml blog/source/_data/notebooks/dev.yml
name: 开发笔记
route:
  path: /notes/dev/
listing:
  order: 1
  per_page: 10
  sort:
    field: updated
    direction: desc
visibility:
  listed: true
  searchable: true
```

用主题命令创建笔记，先查看将写入的位置：

```sh
npx hexo stellar new note --notebook dev --title "网络排查" --tags "web/network,tools" --dry-run
npx hexo stellar new note --notebook dev --title "网络排查" --tags "web/network,tools"
```

命令只接受已存在的 Notebook，参数说明见 [CLI](/wiki/stellar/reference/cli/)。手工创建时使用普通 Markdown 页面：

```markdown blog/source/notes/dev/network.md
---
title: 网络排查
collection:
  profile: notebook
  id: dev
tags: [web/network, tools]
---

记录 DNS、连接和请求响应的排查步骤。
```

## 排序、标签与分页

`listing.order` 决定笔记本集合顺序；`listing.sort` 控制笔记排序，可选 `date`、`updated`、`title` 及 `asc/desc`。`listing.per_page: 0` 关闭分页，`null` 继承 Hexo 分页。

笔记 `listing.priority` 大于零时置顶，优先级越大越靠前。标签中的 `/` 生成层级，例如 `web/network/dns`；标签页同时聚合子标签内容。Collection 的 `visibility` 是全部笔记的默认值，单篇笔记可在 Front Matter 中覆盖；隐藏列表或搜索不会删除详情路由。

## 统一默认值

```yaml blog/_config.stellar.yml
profiles:
  notebook:
    listing:
      excerpt_length: 128
      sort:
        field: updated
        direction: desc
    tag_icons:
      web: default:documents
```

`profiles.notebook` 同时保存单个 Notebook 列表页的 Region、列表默认值和标签图标，不接受 `footer`。未被实际标签使用的 `tag_icons` 键会被忽略。笔记详情页使用 `profiles.note`，再叠加 Collection 的 Region。Notebook `cover` 用于集合卡片，笔记自己的 `cover` 用于笔记卡片。

Notebook 与 Wiki、Topic 一样，默认继承全局 Article 许可协议和标签开关，但不显示分享按钮。在 Notebook Collection 或单篇笔记中设置 `footer.share: true` 可恢复全局 Article 分享服务，也可以用数组选择服务；`footer.show_tags` 控制笔记正文末尾的标签行。

只想关闭“全部笔记本”总索引时，在主题配置中设置：

```yaml blog/_config.stellar.yml
profiles:
  notebooks:
    path: null
```

这不会关闭各 Notebook 的集合首页、标签页和笔记详情页。Note 的 Collection Brand 返回按钮和面包屑也不再链接总索引；若同时省略 Notebook `route.path`，集合路径会直接从 Notebook ID 派生。

Notebook 使用标签树整理内容，不支持 Wiki Hero、手工目录树或 Topic 的 `route.start`。
