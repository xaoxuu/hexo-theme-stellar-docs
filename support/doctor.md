---
title: 问题排查
date: 2026-09-05 20:49
updated: 2026-09-06 02:23
---

## 运行 Doctor

在博客根目录运行：

```sh
npx hexo stellar doctor
```

查看报告的 source、path、actualType、expected 和 migration。先定位文件和字段，再查[配置参考](/wiki/stellar/reference/theme/)或[字段映射](/wiki/stellar/migration/fields/)。机器输出和扫描范围见 [CLI](/wiki/stellar/reference/cli/#doctor)。

## 报告怎么处理

| 现象 | 下一步 |
| :--- | :--- |
| Node / Hexo 版本不满足 | 检查终端实际运行的版本，满足安装要求后重试 |
| 未知字段或错误类型 | 核对作用域、snake_case 命名和当前字段结构 |
| Collection 不存在／多个候选／显式冲突 | 检查集合文件名、route、目录树及页面归属 |
| profile 不支持字段 | 查阅该内容类型支持的字段，移除或调整不适用的配置 |
| Widget warning | 根据 layout、region、supported 调整实例；该 Widget 已被跳过 |
| JSON 混有日志 | 使用 `npx hexo stellar doctor --format json --silent` |

## 为什么构建能成功，Doctor 却失败

构建可丢弃未知字段、错误值或无效列表项，保留有效配置；Doctor 严格检查原始输入，所以仍会报告这些问题。因此，页面能够打开时仍可能有配置未生效。

YAML 语法、根结构、内容标识、归属冲突或内容类型不支持的字段等错误会导致失败。开发预览的主题配置热重载遇到致命错误时保留上次有效配置，终端会说明原因；页面显示旧效果可能是新配置没有成功应用。

## 配置通过但效果不对

运行站点自己的完整构建，检查最终页面。菜单与 Widget 需要核对所属侧栏和页面类型；图片需要区分卡片封面、横幅与头像；搜索需要检查 `scope` 和 `visibility`；评论和数据服务需要核对接口地址及账号参数。

Doctor 不访问第三方账户，也不验证浏览器样式或部署状态。自定义 source_dir、多配置与后处理需验证实际构建输入，不能只依赖默认扫描。

## 提供可复现的问题报告

说明目标行为、实际行为、复现步骤，附主题 commit／版本、Node/Hexo、相关配置、Doctor 和构建输出。只提供与问题有关的内容，分享前移除密钥与私人信息。

先搜索[现有 Issues](https://github.com/xaoxuu/hexo-theme-stellar/issues)，再按问题模板反馈。源码与文档问题分别说明所属仓库。
