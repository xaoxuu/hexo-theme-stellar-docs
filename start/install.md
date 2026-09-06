---
title: 环境与安装
date: 2022-10-21 13:15
updated: 2026-09-06 02:23
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

v2 目前处于开发阶段，通过源码使用。`npm install hexo-theme-stellar` 安装的是 npm 上公开的稳定版，它不保证已经是 v2。

{% tabs %}

<!-- tab v2 开发版 -->

在博客根目录添加主题源码，再安装主题自己的依赖：

```sh
git submodule add https://github.com/xaoxuu/hexo-theme-stellar.git themes/stellar
npm install --prefix themes/stellar
```

打开博客根目录的 `_config.yml`，设置：

```yaml blog/_config.yml
theme: stellar
```

源码会跟随主题仓库继续变化。准备长期使用或反馈问题时，记下当前 commit：

```sh
git -C themes/stellar rev-parse HEAD
```

<!-- tab npm 稳定版 -->

如果你只想使用已经公开发布的稳定版本：

```sh
npm install hexo-theme-stellar
```

然后在 `_config.yml` 中设置 `theme: stellar`。用下面的命令确认实际装到哪个版本：

```sh
npm ls hexo-theme-stellar
```

本套 Wiki 讲的是 v2。版本号仍为 1.x 时，请查看对应版本的 Release 和旧文档，不要直接复制这里的 v2 配置。

{% endtabs %}

同一个站点不要同时保留 npm 包和 `themes/stellar` 源码。两份主题都在时，Hexo 实际加载哪一份很容易和你的判断不同。

## 确认安装完成

```sh
npx hexo stellar doctor
npx hexo generate
```

Doctor 会检查 Node、Hexo、主题配置和内容文件。第一次运行时还没有 `_config.stellar.yml` 也没关系，v2 可以直接使用默认配置。

生成完成后继续[创建第一个站点](/wiki/stellar/start/first-site/)。命令报错时，可按[Doctor 与问题排查](/wiki/stellar/support/doctor/)处理。

## 更新主题

源码安装需要更新子模块引用并重新安装依赖；npm 安装则更新到一个明确发布的版本。动手前记下当前版本、锁文件和自己的主题改动，更新后再跑一次 Doctor 和生成。

修改过主题源码时，更新需要合并自己的改动，避免覆盖定制内容。
