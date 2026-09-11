---
title: 评论服务
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

Stellar v2 内置 6 个评论 Provider：`beaudar`、`utterances`、`giscus`、`twikoo`、`waline` 和 `artalk`。主题级配置都写在 `_config.stellar.yml` 的 `comments` 下：`provider` 选择当前服务，服务同名对象保存该客户端的参数。

```yaml blog/_config.stellar.yml
comments:
  provider: giscus
  title: 参与讨论
  giscus:
    data-repo: owner/comments
    data-repo-id: YOUR_REPO_ID
    data-category: General
    data-category-id: YOUR_CATEGORY_ID
    data-mapping: pathname
```

设置 `provider: null` 会全站停用评论。`title` 可设置评论区标题，空字符串会隐藏标题。从 rc.3 起可在服务对象覆盖客户端资源：六个 Provider 均支持 js，Waline 和 Artalk 支持 css，Waline 另支持 meta_css；页面在 comments.options 中覆盖。省略或 null 使用默认资源；Artalk 默认从最终 server 的 dist 目录加载配套 JS/CSS。src 与 inject 不是资源覆盖入口。当前开发版发现评论容器后立即异步加载，不等待进入视口，也不阻塞其它页面功能初始化。

## 各评论服务的参数

下面逐项列出全部内置 Provider 的最小接入方式，以及主题默认配置预置的全部参数。服务同名对象是开放参数袋：除表中字段外，也可以继续填写对应客户端支持的原生选项，主题会保留字段名并传给客户端。

### Beaudar

准备一个公开 GitHub 仓库，安装 Beaudar GitHub App，并按 Beaudar 要求配置域名白名单。然后填写仓库和 Issue 映射方式：

```yaml blog/_config.stellar.yml
comments:
  provider: beaudar
  beaudar:
    repo: owner/comments
    issue-term: pathname
```

主题预置参数为 `repo`、`issue-term`、`issue-number`、`theme`、`label`、`input-position`、`comment-order`、`keep-theme`、`loading` 和 `branch`。`issue-term` 决定页面如何映射到 Issue；固定使用某个 Issue 时填写 `issue-number`。完整的仓库授权和客户端选项见 [Beaudar](https://beaudar.lipk.org/)。

### Utterances

准备一个公开 GitHub 仓库并安装 Utterances GitHub App：

```yaml blog/_config.stellar.yml
comments:
  provider: utterances
  utterances:
    repo: owner/comments
    issue-term: pathname
```

主题预置参数为 `repo`、`issue-term`、`issue-number`、`theme` 和 `label`。`issue-term` 负责把页面映射到 Issue；固定 Issue 可使用 `issue-number`。仓库授权、映射值和主题值见 [Utterances](https://utteranc.es/)。

### Giscus

在仓库启用 Discussions，安装 Giscus GitHub App，再从 Giscus 配置页取得仓库和分类 ID：

```yaml blog/_config.stellar.yml
comments:
  provider: giscus
  giscus:
    data-repo: owner/comments
    data-repo-id: YOUR_REPO_ID
    data-category: General
    data-category-id: YOUR_CATEGORY_ID
    data-mapping: pathname
```

主题预置参数为 `data-repo`、`data-repo-id`、`data-category`、`data-category-id`、`data-mapping`、`data-strict`、`data-reactions-enabled`、`data-emit-metadata`、`data-input-position`、`data-theme`、`data-lang`、`data-loading` 和 `crossorigin`。这些值可直接从 [Giscus 配置页](https://giscus.app/zh-CN) 生成的脚本属性中复制，但无需复制 `src`。

### Twikoo

先部署 Twikoo 服务端，再把环境 ID 或服务地址写入 `envId`：

```yaml blog/_config.stellar.yml
comments:
  provider: twikoo
  twikoo:
    envId: https://comments.example.com
```

主题默认只预置 `envId`；Twikoo 客户端接受的其它原生选项可以继续写在 `comments.twikoo`。部署方式和客户端参数见 [Twikoo](https://twikoo.js.org/)。

### Waline

先部署 Waline 服务端，再填写服务端地址：

```yaml blog/_config.stellar.yml
comments:
  provider: waline
  waline:
    serverURL: https://comments.example.com
    commentCount: true
    pageview: false
```

主题预置参数为 `serverURL`、`commentCount` 和 `pageview`。语言、表情、登录等 Waline 原生选项也写在 `comments.waline`；服务端部署和完整选项见 [Waline](https://waline.js.org/)。

### Artalk

先部署 Artalk 服务端，并在服务端创建站点：

```yaml blog/_config.stellar.yml
comments:
  provider: artalk
  artalk:
    server: https://comments.example.com
    site: Example
    darkMode: auto
```

主题预置参数为 `server`、`site`、`darkMode` 和 `imageUploader`。`imageUploader` 可以配置上传接口、Token 和响应字段；其它 Artalk 原生选项也写在 `comments.artalk`。部署、站点配置和完整客户端选项见 [Artalk](https://artalk.js.org/)。

## 页面关闭与线程覆盖

Post、Page、Wiki、Topic 和 Notebook 的 Collection 或 Front Matter 都使用同一组内容级字段：

| 字段 | 用途 |
| :--- | :--- |
| `enabled` | `false` 关闭当前范围；`true` 启用已选 Provider |
| `provider` | 为当前范围选择 6 个内置 Provider 之一；`null` 继承上层 |
| `title` | 覆盖评论区标题；空字符串隐藏标题 |
| `id` | Twikoo、Waline、Artalk 的稳定线程 ID；省略时使用当前 URL 路径 |
| `options` | 覆盖当前 Provider 的客户端参数袋 |

例如，让一个页面使用独立的 Giscus Discussion：

```yaml blog/source/about/index.md
---
title: 留言板
comments:
  enabled: true
  provider: giscus
  title: 留言板
  options:
    data-mapping: specific
    data-term: guestbook
---
```

让多个 Twikoo、Waline 或 Artalk 页面共用同一线程时，为它们设置相同的 `comments.id`：

```yaml blog/source/about/index.md
comments:
  enabled: true
  id: shared-guestbook
```

关闭单页评论使用：

```yaml blog/source/about/index.md
comments:
  enabled: false
```

内容级 `options` 按键覆盖主题级 `comments.<provider>` 参数。切换 Provider、更改页面路径或更换映射规则前，先确认原服务使用的线程键，避免现有讨论失去入口。

## 首页、404 与加载

首页默认关闭评论，并且只会在首页第一页渲染。启用方式与页面覆盖字段一致：

```yaml blog/_config.stellar.yml
profiles:
  home:
    comments:
      enabled: true
      provider: giscus
      title: 欢迎讨论
      id: home
      options:
        data-mapping: specific
        data-term: home
```

404 页面同样默认关闭评论。需要作为留言入口时，只需开启错误页 Profile；省略 Provider 会继承全局选择：

```yaml blog/_config.stellar.yml
profiles:
  error:
    comments:
      enabled: true
```

所有 Provider 都由主题在评论区接近视口时初始化。Artalk 通知链接含 `?atk_comment=<id>` 或 `#atk-comment-<id>` 时会立即加载并定位；Twikoo、Waline 和 Artalk 使用 `comments.id` 或当前路径作为线程键，Beaudar、Utterances 和 Giscus 使用各自参数袋中的映射字段。

评论区没有显示时，依次检查 `provider`、当前层级的 `enabled`、服务端或仓库授权、浏览器网络与跨域错误。Doctor 可以发现本地字段问题，但不会验证远程账号、仓库权限或服务端响应。
