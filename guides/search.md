---
title: 站内搜索
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

Stellar 默认启用本地搜索，无需额外安装搜索索引生成器。它会在构建时写出索引，读者可以从结果直接跳到匹配的章节。

## 配置搜索索引

```yaml blog/_config.stellar.yml
search:
  provider: local
  local:
    scope: all
    include_content: true
    cache_ttl_seconds: 86400
```

`scope` 可选 `all/post/page`，决定索引包含哪些内容；`include_content: false` 不索引正文。页面 `visibility.searchable: false` 排除该页。Wiki、Topic、Notebook Collection 也可以设置同名字段作为所有成员的默认值，成员 Front Matter 可显式覆盖。

## 搜索入口与范围

当前开发版通过 `leftbar.brand.search` 控制 Brand 中的搜索按钮，默认 true；菜单只接受 link 项。Brand 需可见且 search.provider 非空。博客、Wiki、Topic 和 Notebook 根据页面归属提供相应的搜索范围；搜索范围按内容归属划分。Topic 可以在博客与当前专栏范围中检索，实际可用范围还受全局索引 scope 限制。

本地结果按章节定位，打开结果会携带关键词与标题 hash。可用 `Ctrl/⌘ + K` 打开搜索，`Esc` 关闭。

## 使用 Algolia

```yaml blog/_config.stellar.yml
search:
  provider: algolia
  algolia:
    appId: YOUR_APP_ID
    apiKey: YOUR_SEARCH_ONLY_KEY
    indexName: YOUR_INDEX
```

主题提供查询端；索引上传由站点自己的构建流程负责。浏览器只使用查询密钥。`search.provider: null` 关闭主题搜索。

配置修改后需要重新生成 `search.json`。找不到某篇内容时，可检查它是否被 `scope`、Collection 或页面的 `visibility.searchable` 排除。`visibility.listed` 只影响列表，不会代替搜索开关。

本地搜索每次最多追加 50 条结果，通过“加载更多”继续；全部显示后提示没有更多结果。正文命中可以跳转到对应章节，带入关键词高亮。Algolia 的客户端资源可在 `search.algolia.js` 覆盖，省略或 null 使用默认地址。
