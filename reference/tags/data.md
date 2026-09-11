---
title: 数据类标签
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

## timeline 时间线

支持静态和动态时间线数据源：

- 静态数据
- 默认 `timeline`：GitHub/Gitea Issues 或 Releases 兼容数据
- `weibo`：WeiboSpider 输出
- `memos`：主题已适配的 Memos 响应
- `rss`：RSS 2.0、Atom、RSS 1.0 或 JSON Feed
- `twikoo`、`waline`、`artalk`、`giscus`：对应评论服务的最新评论

```md 动态语法
{% timeline [type:timeline/weibo/memos/rss/twikoo/waline/artalk/giscus] api:url [limit:number] [hide:user,title,footer] %}{% endtimeline %}
```

`api` 是动态数据的必填项。其它参数会作为属性传给选中的适配器，只有该适配器读取的参数才生效。未填 `api` 时仅渲染静态节点；请求失败时保留已有静态内容或空状态。

常见的使用场景请看这篇文章：

{% link https://xaoxuu.com/blog/20221029/ desc:true %}


### 静态时间线

静态数据写在 Markdown 源文件中，生成站点时一并输出。

{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/photos/hello@1x.png width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}

```md 写法如下
{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/photos/hello@1x.png width:300px ratio:1179/390 %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}
```

### 动态时间线

{% tabs active:1 align:center %}

<!-- tab 动态说说 -->

动态数据是从 GitHub Issues 中拉取的，使用方法为：

1. 建一个仓库
2. 创建一个 `issue` 并添加一个 `label` 进行测试
3. 写 `timeline` 标签时加上 `api:https://api.github.com/repos/your-name/your-repo/issues`

例如：
```md _posts/xxx.md
{% timeline api:https://api.github.com/repos/xaoxuu/blog-timeline/issues?direction=asc&per_page=3 %}{% endtimeline %}
```

效果如下：
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/blog-timeline/issues?per_page=5 %}{% endtimeline %}

<!-- tab 微博动态 -->

1. fork shaoyaoqian/WeiboSpider 的爬虫，修改自己的仓库名
2. 修改 `.github/workflows/main.yml` 中的微博ID为你想爬取的ID，修改完后每天会自动爬取你的微博，存储为 json 文件，输出文件在 {% mark output %} 分支

```md _posts/xxx.md
{% timeline limit:20 type:weibo api:你的json文件地址 %}{% endtimeline %}
```

<!-- tab RSS 订阅 -->

这个功能在 {% mark 1.34.0 color:dark %} 版本后开始支持：

动态数据也可以直接拉取 RSS / Atom / JSON Feed 订阅源，适合配合 [RSSHub](https://docs.rsshub.app/) 聚合各类平台动态（如 B 站、微博等）：

```md _posts/xxx.md
{% timeline type:rss api:https://rsshub.app/bilibili/user/dynamic/你的uid %}{% endtimeline %}
```

可选参数：

- `limit`：显示条数，默认 `10`
- `content_type`：显示内容或摘要，`content`（默认）或 `summary`
- `show_title`：是否显示标题，默认 `true`
- `show_content`：是否显示内容，默认 `true`

例如只显示标题、限制 5 条：

```md _posts/xxx.md
{% timeline type:rss api:https://rsshub.app/bilibili/user/dynamic/你的uid limit:5 show_content:false %}{% endtimeline %}
```

{% endtabs %}

### 静态 + 动态

用法同静态和动态单独使用时一样，例如：

```
{% timeline reversed:true api:https://api.github.xaox.cc/repos/xaoxuu/blog-timeline/issues?per_page=5 %}
<!-- node 这条内容为静态数据 -->
这条内容为静态数据，静态数据在 `deploy` 时就已经确定了。
{% endtimeline %}
```

### 数据筛选

{% folders %}
<!-- folder 只显示某个人的数据 -->
{% timeline user:xaoxuu api:https://api.github.xaox.cc/repos/volantis-x/hexo-theme-volantis/issues %}{% endtimeline %}
<!-- folder 筛选最近3条todo -->
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=3 %}{% endtimeline %}
<!-- folder 筛选评论最多的3条建议 -->
{% timeline api:https://api.github.xaox.cc/repos/volantis-x/hexo-theme-volantis/issues?labels=feature-request&per_page=3&sort=comments %}{% endtimeline %}
{% endfolders %}

上述示例代码如下：

```
{% folders %}
<!-- 只显示某个人的数据 -->
{% timeline user:xaoxuu api:https://api.github.xaox.cc/repos/volantis-x/hexo-theme-volantis/issues %}{% endtimeline %}
<!-- 筛选最近3条todo -->
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=3 %}{% endtimeline %}
<!-- 筛选评论最多的3条建议 -->
{% timeline api:https://api.github.xaox.cc/repos/volantis-x/hexo-theme-volantis/issues?labels=feature-request&per_page=3&sort=comments %}{% endtimeline %}
{% endfolders %}
```

更多用法详见：

{% link https://docs.github.com/en/rest/issues/issues#list-issues-assigned-to-the-authenticated-user GitHub&nbsp;REST&nbsp;API %}


## friends 友链

{% friends ios_developer %}

```md 语法格式
{% friends [group] [repo:owner/repo] [api:url] [posts:true/false] %}
```

`group` 读取 `source/_data/links/<group>.yml`。`api` 优先于 `repo`；仅填 `repo` 时，主题通过 `services.github.raw_url` 请求 `<owner/repo>/output/v2/data.json`。`posts:true` 选用友链与文章聚合适配器，只适用于动态数据。未提供 group、repo 或 api 时输出空容器。

您可以在任何位置插入友链组，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/links/ios_developer.yml
- title: 某某某
  url: https://
  cover:
  icon:
  description:
```

在需要的位置这样写：

```md
{% friends ios_developer %}
```

### 实现动态友链

以 [xaoxuu/friends](https://github.com/xaoxuu/friends) 为模板创建仓库，或 fork 该仓库，并启用 GitHub Actions。

按仓库中的 Issue 模板填写友链信息并提交，在 Actions 页面查看运行结果。工作流成功后，`output` 分支会生成数据文件；确认包含刚提交的友链信息后，即可在页面中引用：

```
{% friends api:https://raw.github.com/xaoxuu/friends/output/v2/data.json %}
```

相关工作流项目包括：
- [issues2json](https://github.com/xaoxuu/issues2json)：自动获取issue中第一段json保存为文件，支持多种排序和过滤
- [links-checker](https://github.com/xaoxuu/links-checker)：自动检查issue中填写的链接是否有效，可用于动态友链、示例博客
- [feed-posts-parser](https://github.com/xaoxuu/feed-posts-parser)：友链文章订阅

各工作流的配置方法见对应项目的 `README`。

### 友链+友链文章聚合显示

{% friends posts:true api:https://raw.github.xaox.cc/volantis-x/friends-example/output/v2/data.json %}

写法比普通友链多了个 `posts:true`，要求必须是动态友链：

```
{% friends posts:true api:https://raw.github.com/volantis-x/friends-example/output/v2/data.json %}
```


### 旧的动态友链仓库怎么升级？

详见这篇文章：[《感谢 AI，动态友链获重磅升级！》](https://xaoxuu.com/blog/20250602/)

### 数据托管与加速

支持把数据托管到任何其他地方来使用，例如：

```
{% friends api:https://raw.github.xaox.cc/xaoxuu/friends/output/v2/data.json %}
```

数据也可以通过 CDN 或反向代理访问，或用 GitHub Actions 同步到对象存储。更换托管地址后，将标签中的数据链接改为新地址。

## sites 网站卡片

{% sites sites_design %}

```md 语法格式
{% sites [group] [repo:owner/repo] [api:url] %}
```

group、repo、api 的选择顺序与 `friends` 相同，api 优先于 repo。未提供数据源时输出空容器。

您可以在任何位置插入网站卡片组，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/links/分组名.yml
- title: 标题
  url: https://
  cover:
  icon:
  description:
```

在需要的位置这样写：

```md
{% sites 分组名 %}
```

条目未配置 `appicon`、`icon` 或 `avatar` 时，网站卡片可复用 `services.site_info` 补充图标（appicon 优先，缺失时使用 API 的 icon）；静态与动态条目均按 appicon → icon → avatar 取值。当前开发版（rc.4 之后）默认选择 `site_info_api`，但 endpoint 留空；需设置 `services.site_info.site_info_api.endpoint` 为自部署地址，或设置 `provider: null` 关闭。请求失败时保留主题兜底图标且不显示错误；该接口不会自动获取网站截图。

{% box Stellar v1.13.0 color:warning %}
原 friends 和 sites 标签数据合并至 `links/xxx.yml` 文件，动态数据使用方法同友链，数据源格式相同，与友链共享数据，仅样式不同，也可以用 `sites` 标签做友链。
{% endbox %}


## albums 专辑

```md 语法格式
{% albums [group] [repo:owner/repo] [api:url] [size:s/m/l/xl/mix] %}
```

`size` 默认 `s`。api 优先于 repo；动态数据使用正方形封面，静态数据读取 links 分组。未提供数据源时输出空容器。

配置数据源：

```yaml blog/source/_data/links/分组名.yml
- title: 标题
  url: https://
  cover:
  icon:
  description:
```

文章中插入方式：

```md blog/source/_posts/xxx.md
{% albums 分组名 %}
```

{% albums music %}

## posters 海报

```md 语法格式
{% posters [group] [repo:owner/repo] [api:url] [size:xs/s/m/l/xl/mix] %}
```

`size` 默认 `xs`。api 优先于 repo；静态数据使用竖向封面。未提供数据源时输出空容器。

配置数据源：

```yaml blog/source/_data/links/分组名.yml
- title: 标题
  url: https://
  cover:
  icon:
  description:
```

文章中插入方式：

```md blog/source/_posts/xxx.md
{% posters 分组名 %}
```

{% posters games %}

## md 渲染外部 markdown 文件

```md
{% folding %}
{% md https://gcore.jsdelivr.net/gh/xaoxuu/hexo-theme-stellar/README.md %}
{% endfolding %}
```

`wrap` 参数默认为 `true`：渲染结果保留在 `.data-service.ds-mdrender` 容器内；传 `wrap:false` 时渲染后不留外部容器，内容直接融入正文：

```md
## 如何交换友链？

{% md https://raw.githubusercontent.com/xaoxuu/friends/refs/heads/main/README.md wrap:false %}
```

我的友链页面「[如何交换友链？](https://xaoxuu.com/friends/#%E5%A6%82%E4%BD%95%E4%BA%A4%E6%8D%A2%E5%8F%8B%E9%93%BE%EF%BC%9F)」这一章节用的就是 [README](https://github.com/xaoxuu/friends/) 的数据。

> 说明：当 src 是 GitHub raw 地址（`raw.githubusercontent.com`）时，会使用 `services.github.raw_url` 的镜像站，README 内的相对图片/链接也会解析到同一镜像基址。

## ghcard 卡片

{% ghcard xaoxuu %}

{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}

```md 写法如下
{% ghcard xaoxuu %}
{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}
```

{% link https://github.com/stats-organization/github-stats-extended GitHub&nbsp;Card&nbsp;API %}

默认选择 `github_readme_stats` provider；需要使用自部署实例时，设置 `services.github_card.github_readme_stats.endpoint`：

```yaml blog/_config.stellar.yml
services:
  github_card:
    provider: github_readme_stats
    github_readme_stats:
      endpoint: https://github-stats-extended.vercel.app
```

## gist 代码片段

`gist` 标签通过 `services.github.gist_url` 构造脚本地址：

```md
{% gist owner/id %}
{% gist owner/id file:example.js %}
```

## toc 文档目录树

```
{% toc wiki:xxx [open:true] [display:mobile] title %}
```
