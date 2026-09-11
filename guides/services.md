---
title: 动态数据
date: 2026-09-05 20:49
updated: 2026-09-12 01:21
---

站点信息、评分、投票、贡献者和 GitHub 卡片会在浏览器里按需读取数据。数据更新无需重新生成整站。

## 接入一个服务

```yaml blog/_config.stellar.yml
services:
  site_info:
    provider: site_info_api
    site_info_api:
      endpoint: https://site-info.example.com/site_info/v1?url={href}
  rating:
    provider: star_vote
    star_vote:
      endpoint: https://vote.example.com/api/rating
```

当前开发版（rc.4 之后）中，Site Info、Rating、Vote 默认选择 Provider，但 endpoint 留空，不请求公共实例。上面的 example.com 地址须替换为自己的兼容服务：Site Info 使用 site-info-api，评分和投票使用 star-vote。endpoint 省略或 null 不发请求，也可用 provider: null 关闭。

## GitHub 与贡献者

```yaml blog/_config.stellar.yml
services:
  github:
    api_url: https://api.github.com
    raw_url: https://raw.githubusercontent.com
    gist_url: https://gist.github.com
  contributors:
    github:
      repositories:
        - source_prefix: wiki/handbook/
          repository: owner/handbook
          branch: main
```

GitHub 地址使用完整 URL。贡献者映射的 `source_prefix` 对应站点内容来源，帮助主题找到源码；Collection 也可通过 `source.repository/branch` 提供仓库信息。

## 数据展示

链接卡片、评分、投票与时间线语法见[数据标签参考](/wiki/stellar/reference/tags/data/)。时间线和友链的数据结构由标签或 Widget 约定，不属于主题配置字段。

## 服务不可用时

远程服务不可用时，组件会保留静态内容或显示空状态，正文仍可阅读。请求缓存和超时由主题管理，没有对应的站点配置项。

Doctor 检查本地配置；接口是否可用需要在浏览器中确认。调试评分和投票时，可使用自己的测试实例，避免修改正式数据。

普通 Markdown 文本链接、参考链接、远程 Markdown 和评论内链接可由 Site Info 补充图标。行内或带描述链接使用 favicon；普通链接卡片使用 appicon。接口失败保留静态信息，已有显式图标不会因失败被覆盖。
