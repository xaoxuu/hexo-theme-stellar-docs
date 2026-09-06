---
title: 环境与安装
date: 2022-10-21 13:15
updated: 2026-09-07 00:36
---

在已有 Hexo 站点中安装 Stellar，需要确认运行环境、选择主题版本，并设置 `theme: stellar`。还没有站点时，从[创建第一个站点](/wiki/stellar/start/first-site/)开始。

## 环境要求

Stellar v2 需要 **Node.js 22 或更高版本、Hexo 8 或更高版本**。在博客目录运行：

```sh
node --version
npx hexo version
```

如果电脑里装过多个 Node，终端显示的版本才是这次真正会用到的版本。

## 选择安装版本

{% box %}
{% tabs %}

<!-- tab 从蓝图安装 -->

蓝图会创建一套已经配置好的独立站点，并安装它锁定的 Stellar 版本。选择最接近目标站点的蓝图，复制对应命令即可。

**安装方法**

{% tabs active:2 %}

<!-- tab 留白 · 轻博客 -->

适合长文、随笔与低干扰阅读：

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-lightblog --blueprint=lightblog --non-interactive %}
{% copy cd stellar-lightblog && npm run server %}

<!-- tab 星迹 · 博客 -->

适合使用经典侧栏整理文章、分类、标签与专栏：

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-blog --blueprint=blog --non-interactive %}
{% copy cd stellar-blog && npm run server %}

<!-- tab 个人知识库 -->

适合把博客文章、项目资料和长期主题放在同一个站点：

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-knowledge --blueprint=knowledge --non-interactive %}
{% copy cd stellar-knowledge && npm run server %}

<!-- tab 项目文档 -->

适合为单个项目维护首页、文档目录与内容页面：

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-docs --blueprint=docs --non-interactive %}
{% copy cd stellar-docs && npm run server %}

{% endtabs %}

创建器会自动安装依赖。蓝图已经包含站点配置与主题依赖，不需要再执行其它安装 Tab 的命令。创建器不会覆盖非空目录；创建完成后，主题版本以站点的 `package.json` 和锁文件为准。完整目录和源码见 [Stellar Examples](https://github.com/xaoxuu/hexo-theme-stellar-examples)。

{% note color:blue 适用范围 想直接从可运行示例开始，再逐步替换内容和配置。蓝图是创建起点，不会覆盖或自动升级已有站点。 %}

<!-- tab 稳定版 -->

**安装方法**

1. 在博客根目录安装 npm 已公开的版本：
{% copy npm install hexo-theme-stellar %}

2. 在 `blog/_config.yml` 文件中找到并修改：
{% copy theme: stellar %}

3. 确认实际安装版本：
{% copy npm ls hexo-theme-stellar %}

**更新方法**

1. 安装一个明确的稳定版本：
{% copy npm install hexo-theme-stellar@版本号 %}

2. 查看 [更新日志](https://github.com/xaoxuu/hexo-theme-stellar/releases)，按说明完成迁移。

{% note color:green 适用范围 只要已经发布到 npm，就使用稳定版安装方式。若实际安装仍显示 1.x，就不能直接使用本套 v2 配置。锁定部署时可以在包名后指定完整版本号。 %}

<!-- tab 最新版 -->

**安装方法**

1. 在博客根目录把官方仓库的 `main` 分支添加为子模块，并安装主题自身的依赖：
{% copy git submodule add -b main https://github.com/xaoxuu/hexo-theme-stellar.git themes/stellar %}
{% copy npm install --prefix themes/stellar %}

2. 在 `blog/_config.yml` 文件中找到并修改：
{% copy theme: stellar %}

**更新方法**

1. 更新到官方 `main` 的最新提交，并重新安装依赖：
{% copy git -C themes/stellar pull --ff-only origin main %}
{% copy npm install --prefix themes/stellar %}

2. 运行 Doctor 和生成；长期使用或反馈问题时，用 `git -C themes/stellar rev-parse HEAD` 记录实际提交。

{% note color:blue 适用范围 官方 submodule 始终跟随 main 的当前源码，可能包含尚未发布到 npm 的变化；更新前查看 CHANGELOG 与迁移说明。 %}

<!-- tab DIY -->

**安装方法**

1. 先把 [Stellar 官方仓库](https://github.com/xaoxuu/hexo-theme-stellar) Fork 到自己的 GitHub 账号。

2. 把 `YOUR_GITHUB_NAME` 替换为自己的用户名，将 Fork 的 `main` 分支添加为子模块，并安装主题依赖：
{% copy git submodule add -b main https://github.com/YOUR_GITHUB_NAME/hexo-theme-stellar.git themes/stellar %}
{% copy npm install --prefix themes/stellar %}

3. 在 `blog/_config.yml` 文件中找到并修改：
{% copy theme: stellar %}

**更新方法**

1. 把官方更新合并到自己的 Fork 后，在博客根目录执行：
{% copy git -C themes/stellar pull --ff-only origin main %}
{% copy npm install --prefix themes/stellar %}

2. 查看 [更新日志](https://github.com/xaoxuu/hexo-theme-stellar/releases)，按说明完成迁移。

{% note color:yellow 适用范围 需要长期修改主题源码，并愿意自行同步官方更新和处理冲突。不要直接把修改提交到官方 submodule。 %}

{% endtabs %}
{% endbox %}

## 确认安装完成

```sh
npx hexo stellar doctor
npx hexo generate
```

Doctor 会检查 Node、Hexo、主题配置和内容文件。第一次运行时还没有 `_config.stellar.yml` 也没关系，v2 可以直接使用默认配置。

生成完成后继续[创建第一个站点](/wiki/stellar/start/first-site/)。命令报错时，可按[Doctor 与问题排查](/wiki/stellar/support/doctor/)处理。

## 更新前后检查

更新前记录主题版本或 commit、锁文件和自己的主题改动；更新后重新安装依赖，再运行 Doctor 与生成。修改过主题源码时，应先合并自己的改动，避免更新时覆盖定制内容。
