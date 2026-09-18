---
title: 布局与导航
date: 2023-12-06 21:55
updated: 2026-09-18 23:12
---

Stellar 把页面分成顶部栏、左侧栏和右侧栏。左边通常放站点名字与主菜单，右边适合目录或仓库信息；手机空间不够时，它们会收进抽屉。

以下示例在顶部放首页和文档入口，左侧放博客、笔记和搜索，文章页右侧显示目录。

## 配置导航菜单

```yaml blog/_config.stellar.yml
topbar:
  enabled: true
  menu:
    - id: home
      title: 首页
      url: /
    - id: docs
      title: 文档
      url: /wiki/
leftbar:
  menu:
    - id: post
      title: 博客
      icon: default:documents
      url: /
    - id: notes
      title: 笔记
      icon: default:documents
      url: /notebooks/
profiles:
  post:
    rightbar:
      widgets: [toc]
```

菜单数组整体替换默认列表。链接项填写 `id/title/url`，非空 kebab-case 的 `id` 用于与 `active_menu` 匹配；从 rc.5 起用 `leftbar.brand.search: true` 控制搜索入口（默认开启且需要 Brand 可见及搜索 Provider）。Topbar 开关、固定 Brand/Menu 与 Widget 列表分开配置。

### 菜单列数（main 开发版）

在 `_config.stellar.yml` 设置 `leftbar.menu_columns: 2` 即可使用双列菜单。支持 1–5 的整数，默认 1；1–2 列显示图标和标题，3–5 列仅显示居中的图标。图标布局仍须为每项填写 `title`，以提供提示和无障碍名称，并配置可辨识的 `icon`。

Profile、Collection 和页面 Front Matter 均可在 `leftbar.menu_columns` 覆盖；省略或 null 继承上层设置。该字段只控制 Leftbar 固定菜单，不控制 Widget 网格或 Topbar。

## 为页面或集合单独配置

```yaml blog/source/_data/wiki/handbook.yml
name: 使用手册
active_menu: notes
breadcrumb: true
leftbar:
  widgets: [tree, related]
rightbar:
  widgets: [toc]
```

Wiki 默认隐藏 Leftbar 固定菜单与操作区，保留文档树。需要菜单时在 Collection 明确设置 `leftbar.menu`。页面也可用相同 Region 字段进一步覆盖；覆盖顺序见[行为参考](/wiki/stellar/reference/behavior/#配置覆盖顺序与空值)。

## 页脚与附加导航

```yaml blog/_config.stellar.yml
leftbar:
  footer:
    actions:
      - type: link
        title: 关于
        icon: default:profile
        url: /about/
footer:
  content: '记录每一天。'
  sitemap:
    - title: 站点
      items:
        - '[关于](/about/)'
profiles:
  blog_index:
    listing_nav:
      enabled: true
      tabs:
        - title: 朋友文章
          url: /friends/rss/
```

Leftbar 底部操作支持链接、按钮、下拉和占位项。主题 `footer` 是主内容区站点页脚，页面 `footer` 则是许可、参考资料和分享，两者不能互换。

## 折叠与移动端

`leftbar.default_state` 设置桌面初始状态，支持 `expanded/collapsed`。移动端通过主题抽屉入口打开侧栏；隐藏某个 Region 使用它的 `enabled: false`，清空内容用 `widgets: []`。

Widget 放在不支持的位置时会被跳过，并在 Doctor 报告中产生警告。各组件支持的位置见 [Widget 参考](/wiki/stellar/reference/widgets/)。
