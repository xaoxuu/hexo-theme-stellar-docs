---
title: 版本记录
date: 2023-12-06 21:55
updated: 2026-09-18 23:12
---

## 当前文档版本

本套文档以 `2.0.0-rc.5` 为发布基线，补充截至 2026-09-18 的 main 开发版（`5c6c7a7c`）；未发布能力在对应章节单独标注，实际已发布版本以[主题 Releases](https://github.com/xaoxuu/hexo-theme-stellar/releases)与安装包为准。通过 npm 安装后用 `npm ls hexo-theme-stellar` 确认版本；源码安装用 `git -C themes/stellar rev-parse HEAD` 记录 commit。不同版本的字段和默认值可能不同。

从 v1 版本更新时，先完成[迁移流程](/wiki/stellar/migration/v1-to-v2/)。更新前保存当前版本，按发布说明检查不兼容的变化，更新后生成并预览站点。

## 从 2.0.0-rc.4 更新到 rc.5

先检查以下配置变化，完整行为见[主题配置](/wiki/stellar/reference/theme/)、[Front Matter](/wiki/stellar/reference/front-matter/)和 [Collection 配置](/wiki/stellar/reference/collection/)：

| rc.4 用法 | rc.5 用法 |
| :--- | :--- |
| Menu 中的 `type: search` | 删除该菜单项，改用 `leftbar.brand.search`，默认 true；需要启用搜索 Provider 且 Brand 有图片或名称 |
| 分享服务 `wechat`、`link`、`system` | 微信二维码改用 `qrcode`；移除 link/system。完整内置服务为 qrcode、weibo、x、telegram、whatsapp、email |
| 页面 `banner.image` | 改用页面顶层 `cover`；banner 仅保留 enabled/avatar/headline/tagline |
| Collection `banner`、`article.banner.ratio` | 删除；集合封面不继承为成员横幅，横幅不再单独配置比例 |
| `appearance.typography.heading_prefixes` | 删除；标题装饰由主题样式维护 |
| Site Info、Rating、Vote 的默认 endpoint | 默认 null；使用这些服务时显式填写自部署地址 |

rc.5 新增或完善的可配置能力：

- `leftbar.brand.ghrepo: owner/repo` 显示仓库统计，优先于 `ghuser`，仅 regular Brand 显示。
- `leftbar.default_state: collapsed` 设置桌面初始折叠；Tree、Linklist、Related 支持折叠栏，右栏跟随收起并显示紧凑目录。
- Reveal 的 `duration/interval/distance/blur` 默认分别为 800ms、200ms、8px、4px；用法见[外观指南](/wiki/stellar/guides/appearance/)。

此外，共享脚本、图标样式和图片失败回退改为外部资源以减少 HTML 体积；hexo-minify 保留 Runtime ESM。评论挂载后立即异步加载，frame 修复媒体比例，目录指示器平滑跟随当前项，并调整横幅、搜索、标题、侧栏和移动布局。以上改进无需新增配置。完整记录见 [rc.4 到 rc.5 的变更](https://github.com/xaoxuu/hexo-theme-stellar/compare/2.0.0-rc.4...2.0.0-rc.5)。

## rc.5 之后的 main 开发版

以下变化已在当前源码中核对，尚不属于 rc.5 安装包：

| 能力 | 使用入口 |
| :--- | :--- |
| Wiki Hero 视频背景、0–1 可配视差、Strands 发光丝带与玻璃效果 | [Collection Hero](/wiki/stellar/reference/collection/#Hero-与横幅) |
| 左栏固定菜单支持 1–5 列；1–2 列图文，3–5 列仅图标 | [菜单列数](/wiki/stellar/guides/layout/#菜单列数（main-开发版）) |
| 侧栏访客身份与设置页共用可配置 Gravatar 镜像 | [访客头像镜像](/wiki/stellar/guides/services/#访客头像镜像（main-开发版）) |
| Windows PowerShell 7+ 蓝图安装入口 | [环境与安装](/wiki/stellar/start/install/) |

同集合局部导航在加载较慢时显示延迟反馈，快速切换不闪烁；修复 CSS 压缩后目录活动指示器高度。两项无需配置。需要这些能力时使用[源码安装](/wiki/stellar/start/install/)，并记录实际 commit；后续发布版本以 Releases 为准。

## 从 2.0.0-rc.1 更新

RC2 将 Notebook、设置页与错误页的专属配置统一收敛到 `profiles`。从 RC1 更新时，需要直接移动或重命名以下字段；旧路径不会被别名、双读或自动转换：

| RC1 配置 | RC2 配置 |
| :--- | :--- |
| `notebook` | `profiles.notebook` |
| `settings.about` | `profiles.settings.about` |
| `error_page.image` | `profiles.error.image` |
| `profiles.notebook_index` | `profiles.notebooks` |
| `profiles.note_index` | `profiles.notebook` |

`profiles.note` 仍用于 Note 内容页；新的 `profiles.notebook` 用于单个 Notebook 的列表与标签页。RC2 还为 404 页增加默认关闭的评论区，并把可信注入扩展为 `head_begin/head_end/body_begin/body_end` 四个位置。完整配置见[主题配置](/wiki/stellar/reference/theme/)，页面覆盖见 [Front Matter](/wiki/stellar/reference/front-matter/)。

主题同时把 `hexo-front-matter` 声明为直接依赖，并整理了 npm、源码与 Blueprint 安装入口；这些工程变化不需要新增站点配置。完整净变化见 [2.0.0-rc.2 Release](https://github.com/xaoxuu/hexo-theme-stellar/releases/tag/2.0.0-rc.2)。

## 已发布记录

{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=10 %}
{% endtimeline %}

## 关注更新

可以在自己的页面中使用同样的时间线语法，参数 `per_page=1` 只显示最近一条发布。未发布计划见[项目进度](/wiki/stellar/support/roadmap/)，其中的功能和发布时间可能调整。
