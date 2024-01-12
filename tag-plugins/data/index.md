---
layout: wiki
wiki: hexo-stellar
title: 数据类标签组件（6个）
---

## timeline 时间线

支持静态和动态时间线数据源：
- 静态数据
- github issues 支持多种筛选参数，详见 [API](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#list-issues-assigned-to-the-authenticated-user)
- github releases 支持多种筛选参数，详见 [API](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases)
- gitea issues 支持多种筛选参数，详见 [API](https://docs.gitea.com/zh-cn/api/1.20/#tag/issue/operation/issueListIssues)
- gitea releases 支持多种筛选参数，详见 [API](https://docs.gitea.com/zh-cn/api/1.20/#tag/repository/operation/repoListReleases)
- memos
- ...

常见的使用场景请看这篇文章：

{% link https://xaoxuu.com/blog/20221029/ desc:true %}


### 静态时间线

静态数据是写死在 `md` 源文件中的，在 `deploy` 时就已经确定了。

{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}
<!-- node 2021 年 2 月 11 日 -->
今天除夕，也是生日，一个人在外地过年+过生日，熬夜开发新主题，尽量在假期结束前放出公测版。
{% endtimeline %}

```md 写法如下
{% timeline %}
<!-- node 2021 年 2 月 16 日 -->
主要部分功能已经开发的差不多了。
{% image /assets/wiki/stellar/photos/hello@1x.png width:300px %}
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
{% timeline api:https://api.github.com/repos/xaoxuu/blog-timeline/issues?direction=asc&per_page=3 %}{% endtimeline %}

<!-- tab 朋友圈 -->

{% link https://xaoxuu.com/wiki/stellar/third-party/fcircle/ %}

```md _posts/xxx.md
{% timeline type:fcircle api:https://raw.github.xaox.cc/xaoxuu/friends-rss-generator/output/data.json %}
{% endtimeline %}
```

<!-- tab 微博动态 -->

1. fork shaoyaoqian/WeiboSpider 的爬虫，修改自己的仓库名
2. 修改 `.github/workflows/main.yml` 中的微博ID为你想爬取的ID，修改完后每天会自动爬取你的微博，存储为 json 文件，输出文件在 {% mark output %} 分支

```md _posts/xxx.md
{% timeline limit:20 type:weibo api:你的json文件地址 %}{% endtimeline %}
```

{% endtabs %}

### 静态 + 动态

用法同静态和动态单独使用时一样，例如：

```
{% timeline reversed:true api:https://api.github.com/repos/xaoxuu/blog-timeline/issues?per_page=2 %}
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
{% timeline user:xaoxuu api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues %}{% endtimeline %}
<!-- 筛选最近3条todo -->
{% timeline api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=3 %}{% endtimeline %}
<!-- 筛选评论最多的3条建议 -->
{% timeline api:https://api.github.com/repos/volantis-x/hexo-theme-volantis/issues?labels=feature-request&per_page=3&sort=comments %}{% endtimeline %}
{% endfolders %}
```

更多用法详见：

{% link https://docs.github.com/en/rest/issues/issues#list-issues-assigned-to-the-authenticated-user GitHub&nbsp;REST&nbsp;API %}


## friends 友链

{% friends ios_developer %}

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

从 [xaoxuu/issues-json-generator](https://github.com/xaoxuu/issues-json-generator) 作为模板克隆或者 fork 仓库

修改 `config.yml` 并打开 github action 的运行权限

```yaml config.yml
# 要抓取的 issues 配置
issues:
  repo: xaoxuu/friends # 仓库持有者/仓库名（改成自己的）
  label: active # 筛选具有 active 标签的 issue ，取消此项则会提取所有 open 状态的 issue
  sort: # updated-desc # 排序，按最近更新，取消此项则按创建时间排序
```

不出意外的话，仓库中已经配置好了 issue 模板，只需要在模板中指定的位置填写信息就可以了。然后在自己的仓库里提交一个 issue 并将 `Label` 设置为 `active` 进行测试。

提交完 issue 一分钟左右，如果仓库中出现了 `output` 分支提交，可以点击查看一下文件内容是否已经包含了刚刚提交的 issue 中的数据，如果包含，那么前端页面就可以使用友链数据了：

```
{% friends api:https://raw.github.xaox.cc/xaoxuu/friends/output/v2/data.json %}
```

### 数据托管与加速

{% box 特别感谢 color:green %}
特别感谢小冰博客的加速访问方案，解决了直接请求 GitHub API 速度过慢的问题，详见 [小冰博客](https://zfe.space/post/python-issues-api.html) 的教程。
{% endbox %}

支持把数据托管到任何其他地方来使用，例如：

```
{% friends api:https://raw.github.xaox.cc/xaoxuu/friends/output/v2/data.json %}
```

{% box Stellar 1.13.0 color:warning %}
动态数据 API 升级至 v2 版本，原使用 issue-api 仓库的需要将友链仓库同步更新。
v1 版本已经停止维护。
{% endbox %}

> 你可以有 N 种办法加速访问 GitHub 仓库里的文件。

## sites 网站卡片

{% sites sites_design %}

您可以在任何位置插入网站卡片组，支持静态数据和动态数据，静态数据需要写在数据文件中：

```yaml blog/source/_data/links/sites_design.yml
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

{% box Stellar v1.13.0 color:warning %}
原 friends 和 sites 标签数据合并至 `links/xxx.yml` 文件，动态数据使用方法同友链，数据源格式相同，与友链共享数据，仅样式不同，也可以用 `sites` 标签做友链。
{% endbox %}

## md 渲染外部 markdown 文件

```md
{% folding %}
{% md https://raw.github.xaox.cc/xaoxuu/hexo-theme-stellar/main/README.md %}
{% endfolding %}
```

{% folding 效果如下 %}
{% md https://raw.github.xaox.cc/xaoxuu/hexo-theme-stellar/main/README.md %}
{% endfolding %}

## ghcard 卡片

{% ghcard xaoxuu %}

{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}

```md 写法如下
{% ghcard xaoxuu %}
{% ghcard xaoxuu/hexo-theme-stellar theme:dark %}
```

{% link https://github.com/anuraghazra/github-readme-stats GitHub&nbsp;Card&nbsp;API %}

## toc 文档目录树

```
{% toc wiki:xxx [open:true] [display:mobile] title %}
```