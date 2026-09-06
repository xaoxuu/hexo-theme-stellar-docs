---
title: CLI 命令
date: 2026-09-05 20:49
updated: 2026-09-06 02:23
---

命令在博客根目录运行，使用该站点实际安装的 Hexo 和主题。本页介绍 `doctor` 检查命令和 `new note` 笔记创建命令。

## doctor

```sh
npx hexo stellar doctor
npx hexo stellar doctor --format json --silent
```

`--format` 支持 text（默认）和 json。JSON 模式配合 Hexo 全局 `--silent` 抑制日志，方便机器读取。

Doctor 读取默认 `source/` 下的 Markdown 与 `_data/wiki|topic|notebooks` YAML、根 `_config.yml` 与可选 `_config.stellar.yml`，并核对 Node ≥22、Hexo ≥8、主题是否启用、配置格式、内容归属、页面类型支持的字段和 Widget 位置。它不是对 Hexo 所有自定义配置文件及插件的通用检查器；使用自定义 source_dir 或多配置构建时还要验证实际构建输入。

| JSON 字段 | 含义 |
| :--- | :--- |
| `ok` | issues 为空时 true |
| `environment` | node、hexo、baseDir |
| `checked` | themeConfig（是否存在覆盖文件）、collections、pages |
| `issues` | 错误数组 |
| `warnings` | Widget 实例或位置等警告数组 |

每项 issue 包含 `code/source/path/actualType/expected/migration`。warning 提供 code、severity、source、path、widget、layout、region、supported。`migration` 是诊断参考标识，不是保证可直接访问的 URL。

| migration 标识 | 对应参考 |
| :--- | :--- |
| `start/requirements`、`start/install` | [环境与安装](/wiki/stellar/start/install/) |
| `configuration/v2`、`configuration/<配置域>` | [主题配置](/wiki/stellar/reference/theme/)与[字段映射](/wiki/stellar/migration/fields/) |
| `content-schema/collection` | [Collection](/wiki/stellar/reference/collection/) |
| `content-schema/front-matter` | [Front Matter](/wiki/stellar/reference/front-matter/) |
| `content-schema/profile-capabilities` | [各集合类型支持的功能](/wiki/stellar/reference/collection/#各集合类型支持的功能) |
| 归属相关标识 | [归属规则](/wiki/stellar/reference/behavior/#Collection-归属) |

有 issues 时命令设置退出码 1；正常通过为 0，只有 warnings 仍通过。命令格式错误或其它异常也会返回非零退出码，具体原因见终端报错。操作与排障步骤见 [Doctor 指南](/wiki/stellar/support/doctor/)。

## new note

```sh
npx hexo stellar new note --notebook dev --title "网络排查" --tags "web/network,tools" --dry-run
npx hexo stellar new note --notebook dev --title "网络排查" --tags "web/network,tools"
```

`--notebook` 与 `--title` 必填且不得包含路径或文件系统保留字符。Notebook 必须存在于站点 source_dir 下的 `_data/notebooks/<id>.yml` 或 `.yaml`；`--tags` 可选，逗号分隔，自动去重。

`--dry-run` 只打印计划。实际写入固定在博客根目录的 `source/notebooks/<id>/<title>.md`，不随 Collection route.path 改变；生成内容包含日期、标题和可选 tags，由标准目录推导归属。命令拒绝覆盖同名文件。自定义 source_dir 时尤其应先核对 dry-run 输出。

命令会校验 Notebook 配置和新页面，写入失败时会清理本次创建的内容。它不会创建 Notebook、迁移已有站点或部署。
