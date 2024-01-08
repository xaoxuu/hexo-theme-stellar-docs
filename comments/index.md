---
layout: wiki
wiki: hexo-stellar
title: 评论插件配置（6个）
---

## Beaudar

Beaudar 是 Utterances 的中文版本，相比 Utterances 有更多的体验优化，可以按时间倒序排序。

```yaml blog/_config.stellar.yml
comments:
  service: beaudar
  beaudar:
    repo: xaoxuu/blog-comments
```

[Beaudar](https://beaudar.lipk.org) 的配置方法很简单，创建一个仓库，在仓库中创建一个 [域名白名单文件](https://github.com/xaoxuu/blog-comments/blob/main/beaudar.json)，然后在 [此处](https://github.com/apps/beaudar) 授权安装即可。

## utterances

A lightweight comments widget built on GitHub issues. Use GitHub issues for blog comments, wiki pages and more!

```yaml blog/_config.stellar.yml
comments:
  service: utterances
  utterances:
    repo: xaoxuu/blog-comments
```

[utterances](https://utteranc.es) 的配置方法很简单，创建一个仓库，在仓库中创建一个 [域名白名单文件](https://github.com/xaoxuu/blog-comments/blob/main/utterances.json)，然后在 [此处](https://github.com/apps/utterances) 授权安装即可。

## giscus


[giscus](https://giscus.app/zh-CN) 是由 GitHub Discussions 驱动的评论系统。让访客借助 GitHub 在你的网站上留下评论和反应吧！本项目受 utterances 强烈启发。

```yaml blog/_config.stellar.yml
comments:
  service: giscus
  # giscus
  # https://giscus.app/zh-CN
  giscus:
    src: https://giscus.app/client.js
    data-repo: xxx/xxx # [在此输入仓库]
    data-repo-id: # [在此输入仓库 ID]
    data-category: # [在此输入分类名]
    data-category-id:
    data-mapping: pathname
    data-strict: 0
    data-reactions-enabled: 1
    data-emit-metadata: 0
    data-input-position: top # top, bottom
    data-theme: preferred_color_scheme
    data-lang: zh-CN
    data-loading: lazy
    crossorigin: anonymous
```


## Twikoo

```yaml blog/_config.stellar.yml
comments:
  service: twikoo
  twikoo:
    envId: https://xxx # vercel函数
```

{% link https://twikoo.js.org %}

## Waline

```yaml blog/_config.stellar.yml
comments:
  service: waline
  waline:
    js: https://unpkg.com/@waline/client@v2/dist/waline.js
    css: https://unpkg.com/@waline/client@v2/dist/waline.css
    # Waline server address url, you should set this to your own link
    serverURL: https://xxx # waline 地址
    # If false, comment count will only be displayed in post page, not in home page
    commentCount: true
    # Pageviews count, Note: You should not enable both `waline.pageview` and `leancloud_visitors`.
    pageview: false

    # Custom locales
    locale:
      placeholder: # 输入框内提示文字

    # Custom emoji
    emoji: 
      - https://gcore.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs
    #   - https://unpkg.com/@waline/emojis@1.1.0/weibo
    #   - https://unpkg.com/@waline/emojis@1.1.0/alus
    #   - https://unpkg.com/@waline/emojis@1.1.0/bilibili
    #   - https://unpkg.com/@waline/emojis@1.1.0/qq
    #   - https://unpkg.com/@waline/emojis@1.1.0/tieba
    #   - https://unpkg.com/@waline/emojis@1.1.0/tw-emoji
    #   - https://unpkg.com/@waline/emojis@1.1.0/bmoji
```

{% link https://waline.js.org %}

## Artalk

```yaml blog/_config.stellar.yml
comments:
  service: artalk
  # Artalk
  # https://artalk.js.org/
  artalk:
    css: https://unpkg.com/artalk@2.7/dist/Artalk.css
    js: https://unpkg.com/artalk@2.7/dist/Artalk.js 
    server: # 后端服务地址
    placeholder: ''
    darkMode: auto
```

{% link https://artalk.js.org %}

## 评论的灵活用法

### 共用评论数据

如果您有多个页面需要共用评论数据，可以在 `front-matter` 中覆盖评论参数，例如：

```yaml blog/source/about/index.md
title: 关于
beaudar:
  'issue-term': '留言板'
```

```yaml blog/source/friends/index.md
title: 友链
beaudar:
  'issue-term': '留言板'
```

### 使用其它评论数据

如果您有多个页面需要另外一个数据库的评论数据，以 Beaudar 为例，您可以这样：

```yaml blog/source/wiki/stellar/index.md
title: 快速开始您的博客之旅
giscus:
  data-repo: xaoxuu/hexo-theme-stellar
  data-mapping: number
  data-term: 226
```
