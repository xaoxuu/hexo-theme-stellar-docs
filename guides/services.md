---
title: 动态数据
date: 2026-09-05 20:49
updated: 2026-09-06 02:28
---

站点信息、评分、投票、贡献者和 GitHub 卡片会在浏览器里按需读取数据。数据更新无需重新生成整站。

## 接入一个服务

```yaml blog/_config.stellar.yml
services:
  site_info:
    provider: site_info_api
    site_info_api:
      endpoint: https://api.xaox.cc/site_info/v1?url={href}
  rating:
    provider: star_vote
    star_vote:
      endpoint: https://star-vote.xaox.cc/api/rating
```

`provider` 选择服务，同名子对象保存连接参数。默认地址是公共服务，可替换为兼容协议的自部署实例。Site Info、Rating、Vote 可用 `provider: null` 关闭。

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
