---
title: 版本记录
date: 2023-12-06 21:55
updated: 2026-09-30 15:49
---

## 当前文档版本

本套文档以 **Stellar v2.0.0** 为准，页面中的字段、默认值和行为都以该版本的默认配置、Schema 与安装包为事实来源。通过 npm 安装后用 `npm ls hexo-theme-stellar` 确认版本；源码安装用 `git -C themes/stellar rev-parse HEAD` 记录 commit。请以[主题 Releases](https://github.com/xaoxuu/hexo-theme-stellar/releases)与安装包确认当前实际版本。

从 v1 升级时，先完成[迁移流程](/wiki/stellar/migration/v1-to-v2/)；v2 不会自动读取 v1 配置。v2 预发布候选之间的中间字段不属于迁移契约，只需按 1.44.0 到 v2.0.0 的最终差异处理。

## 从 v1 升级到 v2

v2 重写了配置结构、内容模型和浏览器运行时。以下变化最常影响已有站点，逐项字段映射见[配置对照](/wiki/stellar/migration/fields/)：

| v1（1.44.0）用法 | v2 用法 |
| :--- | :--- |
| `logo`、`menubar`、`site_tree` | `leftbar.brand`、`leftbar.menu`、`profiles`；导航与侧栏按 Topbar／Leftbar／Rightbar 的 Region 拆开配置 |
| `style`、`plugins`、`tag_plugins`、`data_services` | `appearance`、`features`、`tags`、`services`；内部脚本路径、缓存策略和 `api_host` 不再由站点配置 |
| 页面 `wiki/topic/notebook`、`h1/subtitle/banner_info`、`menu_id`、`comments_service` | `collection`、`banner`、`active_menu`、`comments` 分组字段；字段不兼容读取 |
| `nav_tabs`、`article.banner_ratio`、`article.pin_style`、`article.card_style` | 列表导航进入 `profiles.<type>.listing_nav`；横幅背景由 `article.banner.background` 与页面 `cover` 控制；卡片布局进入 `article.listing` |
| Menu 中的 `type: search` | 删除菜单项，改用 `leftbar.brand.search`，默认开启；需要启用搜索 Provider 且 Brand 有图片或名称 |
| 分享服务 `wechat`、`link`、`system` | 微信二维码改用 `qrcode`；内置服务为 `qrcode`、`weibo`、`x`、`telegram`、`whatsapp`、`email` |
| Site Info、Rating、Vote 的公共实例 | Provider 仍然内置，但 endpoint 默认留空；需要自行部署服务并填写地址 |

v2 要求 **Node.js 22 或更高版本、Hexo 8 或更高版本**。升级后先运行 `npx hexo stellar doctor`，修正全部错误，再逐项检查警告，最后执行完整构建并预览受影响页面。

## v2 的关键能力

相对 1.44.0，v2 重写了配置结构、内容模型和浏览器运行时；逐项字段映射见[配置对照](/wiki/stellar/migration/fields/)。主要变化如下：

- **内容系统**：用 Collection 统一描述 Wiki、Topic 与 Notebook，页面通过 `collection`、`route`、`navigation`、`listing` 分组字段归属和排序；本地搜索默认开启。
- **导航与侧栏**：Topbar、Leftbar、Rightbar 使用 Region 配置；`leftbar.brand.search` 提供搜索入口，`leftbar.brand.ghrepo/ghuser` 显示仓库统计，`leftbar.menu_columns` 支持 1–5 列，`services.gravatar.base_url` 可替换访客头像镜像。
- **文章与横幅**：`cover` 同时提供列表卡片与内容横幅图片，`article.banner.background` 控制文章页横幅是否使用该图片；作者页使用作者的 `cover` 作为横幅背景。
- **Wiki Hero**：支持背景图片、视频、滚动视差和 `ferrofluid`、`light-rays`、`galaxy`、`strands` 四种动态效果；参数见 [Collection 参考](/wiki/stellar/reference/collection/#Hero-与横幅)。
- **阅读与构建**：同集合局部导航、目录指示器、Reveal 动画与搜索浮层过渡；图片尺寸和平均色增量提取，共享脚本与图标改为外部资源以减小 HTML 体积。

Windows 用户可用 PowerShell 7+ 运行蓝图安装器，安装方式见[环境与安装](/wiki/stellar/start/install/)。

## 已发布记录

{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=10 %}
{% endtimeline %}

## 关注更新

可以在自己的页面中使用同样的时间线语法，参数 `per_page=1` 只显示最近一条发布。未发布计划见[项目进度](/wiki/stellar/support/roadmap/)，其中的功能和发布时间可能调整。
