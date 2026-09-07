---
title: 版本记录
date: 2023-12-06 21:55
updated: 2026-09-07 22:06
---

## 当前文档版本

本套文档当前对应 `2.0.0-rc.2`，实际已发布版本以[主题 Releases](https://github.com/xaoxuu/hexo-theme-stellar/releases)与安装包为准。通过 npm 安装后用 `npm ls hexo-theme-stellar` 确认版本；源码安装用 `git -C themes/stellar rev-parse HEAD` 记录 commit。不同版本的字段和默认值可能不同。

从 v1 版本更新时，先完成[迁移流程](/wiki/stellar/migration/v1-to-v2/)。更新前保存当前版本，按发布说明检查不兼容的变化，更新后生成并预览站点。

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
