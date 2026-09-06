---
title: SEO 与分享
date: 2025-07-09 21:33
updated: 2026-09-06 02:28
---

页面标题、描述、原始地址和分享图片用于搜索结果与社交平台预览。本页介绍这些信息的配置位置，以及站点地图和站内搜索的区别。

## 设置站点地址

```yaml blog/_config.yml
title: 山间来信
url: https://example.com
```

```yaml blog/_config.stellar.yml
canonical:
  host: example.com
open_graph:
  enabled: true
structured_data:
  same_as:
    - https://github.com/your-account
```

`canonical.host` 填主机名；`allowed_hosts` 列出允许的备用主机。`host: null` 不生成主题 canonical 并停用主机名检查。

## 页面描述与图片

页面使用 Hexo 的 `title/description`，需要覆盖 Open Graph 时使用 `seo.open_graph` 参数对象。文章列表封面、内容横幅和 SEO 图片用途不同：SEO 图片会从封面、横幅、照片、正文图片等来源选择，因此列表卡片没有封面时，分享预览仍可能有图片。

## 可见性与站点地图

`visibility.listed/searchable` 只控制主题列表和站内搜索，不是 robots 或访问权限。站点地图和 robots 由站点安装的插件或自行维护的文件提供，需要分别配置。

生成后可在 HTML 中查看标题、描述、canonical、Open Graph 和 JSON-LD。页面迁移时，旧地址应跳转到新地址，并从站点地图中移除；新页面的 canonical 应指向最终地址。
