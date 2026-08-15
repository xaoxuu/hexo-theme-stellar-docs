---
date: 2025-07-09 21:33
updated: 2026-08-15 13:45
wiki: hexo-stellar
title: SEO 设置
---


## 标题生成

`<title>` 按页面类型自动生成：

| 页面类型 | 标题格式 | 示例 |
|----------|----------|------|
| 文章 / 标准页面 | `标题 - 站点名` | `博客入门：每个人的独立博客 - XAOXUU` |
| wiki 页面 | `项目名：标题 - 站点名` | `Stellar：开启您全新的博客之旅 - XAOXUU` |
| wiki 首页 | `项目名 - 站点名` | `Stellar - XAOXUU` |
| 首页分页（第 2 页起） | `站点名 - 第 N 页` | `XAOXUU - 第 2 页` |

当页面标题与 wiki 项目名相同（或以 `：`、`:`、` - ` 重复项目名前缀）时，标题只保留一次，例如 `GHAPI JSON Generator：GHAPI JSON Generator` 会归一为 `GHAPI JSON Generator`。

## Open Graph 与结构化数据

- `og:site_name` 始终输出站点名；`og:image` 按 封面 → 横幅 → 正文首图 → 头像 回退。
- 文章 JSON-LD 的 `image` 按 封面 → 横幅 → 相册 → 正文首图 → 默认封面 回退；`description` 优先使用摘要（`<!-- more -->` 之前的内容），无摘要时回退正文前 200 字符。
- 作者结构化数据中的社交链接可在站点配置中补充：

```yaml
structured_data:
  links:
    - https://github.com/xaoxuu
```

## Canonical

设置了 Canonical 之后，除了 404 以外的每个页面会包含指向主站的 `canonical` 标签，防止备用站分散主站权重。

```yaml
# 一旦设置源站地址，非源站地址将不会被SEO收录，并且访问时弹出提示
# 如果访问地址不在备用站主机列表，则警告信息为非法克隆
canonical:
  originalHost: # 主站点域名主机，例如 xaoxuu.com
  officialHosts: # 官方主机列表，每行一个，例如 xaoxuu.vercel.app
    - localhost
```

### 备用站提醒

设置了 Canonical 之后，如果当前访问的不是主站而是备用站，则页面底部会显示备用站提示，以免读者错误地收藏或分享了备用站而非主站。

此外，还会自动增加 `noindex, nofollow` 标签，防止被搜索引擎收录。

### 防盗站提醒

设置了 Canonical 之后，如果当前访问的既不是主站也不是备用站，则会显示非法克隆提醒。此外，还会自动增加 `noindex, nofollow` 标签，防止被搜索引擎收录。

> 防盗措施防君子不防小人，可以提高盗站门槛，但建议还是不要公布源码。
