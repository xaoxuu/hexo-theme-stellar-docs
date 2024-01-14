---
layout: wiki
wiki: hexo-stellar
title: 使用「友链朋友圈」极简版
---

{% box 特别感谢 color:green %}
主题内置版本数据服务由 [友链朋友圈](https://github.com/Rock-Candy-Tea/hexo-circle-of-friends) 极简版提供。
这个功能在 1.13.0 版本后开始支持。
{% endbox %}

{% timeline %}

<!-- node 第一步：fork repo -->

fork [@Rock-Candy-Tea/hexo-circle-of-friends](https://github.com/Rock-Candy-Tea/hexo-circle-of-friends)

<!-- node 第二步：设置自己的友链页面地址和主题类型 -->

修改 `hexo_circle_of_friends/fc_settings.yaml` 文件：

```yaml
- {link: "https://xaoxuu.com/friends/", theme: "stellar"}  # 友链页地址1，修改为你的友链页地址
```

<!-- node 第三步：打开 Issues 友链抓取功能 -->

修改 `hexo_circle_of_friends/fc_settings.yaml` 文件：

```yaml
GITHUB_FRIENDS_LINKS: {
    enable: true, # true 开启github issue兼容
    type: "volantis",  # volantis/stellar用户请在这里填写volantis
    owner: "xaoxuu",  # 填写你的github用户名
    repo: "friends",  # 填写你的github仓库名
    state: "open",  # 填写抓取的issue状态(open/closed)
}
```

<!-- node 第四步：打开 Actions 运行权限 -->

见官方教程 [#simplemode](https://fcircle-doc.yyyzyyyz.cn/#/simplemode)

<!-- node 第五步：放置在博客中 -->

支持首页文章导航栏、文章任意位置，创建一个文件，以本站 `friends/rss/index.md` 为例：
```yaml
---
seo_title: 朋友文章
robots: noindex,nofollow
menu_id: post
comments: false
nav_tabs: true # 这就意味着页面会显示首页文章导航栏
sidebar: [welcome, recent]
---
{% timeline type:fcircle api:https://raw.github.xaox.cc/xaoxuu/friends-rss-generator/output/data.json %}
{% endtimeline %}
```

其中，`api` 部分替换为自己仓库地址及其对应的 `data.json` 文件真实路径。

其中，`nav_tabs: true` 意味着页面会显示首页文章导航栏，搭配主题配置文件中的：
```yaml
site_tree:
  blog:
    nav_tabs:
      '朋友文章': /friends/rss/
```

即可实现在首页增加一个「朋友文章」栏目的效果。

{% endtimeline %}

> - 你依然可以按照官方教程使用完整版。
> - 本站示例仓库：[@xaoxuu/friends-rss-generator](https://github.com/xaoxuu/friends-rss-generator)

如果把 `data.json` 输出到 [output](https://github.com/xaoxuu/friends-rss-generator/blob/a97f385398928d2c0b5c7988cff34505eb3ae8fd/.github/workflows/main.yml#L115) 分支，可以直接使用下面的 API 来访问文件：

```
https://api.vlts.cc/output_data/v1/xaoxuu/friends-rss-generator
https://raw.github.xaox.cc/xaoxuu/friends-rss-generator/output/data.json
```