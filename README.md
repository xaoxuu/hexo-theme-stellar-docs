# Stellar v2 文档

本仓库维护的公开文档，正文位于 `source/`，分为 `start/`、`guides/`、`reference/`、`migration/` 与 `support/`；[首页](source/index.md)提供阅读入口。仓库自带站点配置与构建，运行 `npm run g` 生成挂在主站 `/wiki/stellar/` 下的静态站点。

配置参考为人工维护的说明，以目标主题的默认配置、Schema 和消费者为事实来源。维护流程见 [AGENTS.md](AGENTS.md)。

[source/redirects.json](source/redirects.json) 是旧页面到新页面的迁移数据。本仓库据此生成静态跳转页；旧 URL 中的章节 hash 不参与迁移。缺失目标页面、重定向链和循环会阻止构建。

普通内容维护可以直接调整标题并更新当前内链。新增或修正 URL 迁移时再维护映射表，并验证目标页面、canonical 和搜索／站点地图排除。迁移字段的历史依据见[发布基线映射](source/migration/fields.md)，AI 执行步骤见[迁移契约](source/migration/ai.md)。
