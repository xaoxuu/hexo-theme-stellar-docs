---
title: 站点示例
date: 2023-12-06 21:55
updated: 2026-09-30 14:13
---

## 官方蓝图

[Stellar Examples](https://github.com/xaoxuu/hexo-theme-stellar-examples) 维护 5 个包含真实内容、可以直接运行的蓝图，创建器与站点示例都以仓库中的 `blueprints.json` 为准：

| Blueprint | 示例 | 适合…… |
| :--- | :--- | :--- |
| `lightblog` | [轻博客](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4011-lightblog) | 只想安静写文章，不需要常驻侧栏 |
| `minimalblog` | [极简博客](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4012-minimalblog) | 想要极简侧栏，把注意力留给长文和笔记 |
| `knowledge` | [个人知识库](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4021-knowledge) | 想把文章、项目资料和长期主题放在一起 |
| `docs` | [项目文档](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4031-docs) | 正在给一个项目维护完整文档 |
| `notebook` | [笔记本](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4041-notebook) | 想用笔记本和标签整理零散想法与长期笔记 |

拿不准时从 `lightblog` 开始，其它能力等真的用到再加。蓝图是独立站点：它不会覆盖或自动升级已有站点，目录名与内容都可以自由修改。

## 本地运行

克隆仓库并安装一次依赖，然后用 Blueprint ID 启动对应示例：

```sh
git clone https://github.com/xaoxuu/hexo-theme-stellar-examples.git
cd hexo-theme-stellar-examples
npm ci
npm run dev -- --site lightblog
```

把 `lightblog` 换成上表中的 ID 即可打开其它蓝图；各示例使用独立端口，可以同时运行。

## 创建站点副本

交互式创建见[环境与安装](/wiki/stellar/start/install/)。需要脚本化时指定蓝图并跳过交互：

```sh
curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create my-site --blueprint=lightblog --non-interactive
```

创建器需要 Node.js 22+、Git 与 npm；它会检查目标目录、展示完整计划并拒绝覆盖已有文件。Windows 使用 PowerShell 7+ 时可传入同样的参数：

```powershell
& ([scriptblock]::Create((Invoke-RestMethod https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.ps1))) -CliArguments @('create', 'my-site', '--blueprint=lightblog', '--non-interactive')
```

## 社区站点

下面的站点带有各自的内容和定制，并不代表 v2 的默认样式。可以参考它们的内容组织、页面排版和定制方式。

{% sites api:https://raw.github.xaox.cc/xaoxuu/hexo-theme-stellar-showcase/output/v2/data.json %}

如果也想把自己的站点放进来，可以到 [Showcase 仓库](https://github.com/xaoxuu/hexo-theme-stellar-showcase/issues)提交资料。
