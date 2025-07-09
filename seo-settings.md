---
wiki: hexo-stellar
title: SEO 设置
---


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

