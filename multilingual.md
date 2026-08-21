---
date: 2026-08-18 14:07
updated: 2026-08-21 23:17
title: 多语言内容体系
collection:
  type: wiki
  id: hexo-stellar
---

Stellar 将“主题内置文案翻译”和“站点内容多语言”视为两个独立问题。

## 主题内置文案

主题使用 Hexo i18n。站点根目录 `_config.yml` 中配置语言：

```yaml
language: zh-CN
```

主题翻译文件位于 `themes/stellar/languages/`，模板通过 `__()` 读取。该配置只影响主题按钮、提示语和页面 `lang`，不会翻译文章正文。

## 多语言站点

v2 不提供同一构建中的内容自动分流，也不支持在 Wiki YAML 中写 `locales` 覆盖。推荐每种语言独立维护和部署一套 Hexo 站点：

- 每个站点拥有独立的 `source`、配置和构建产物。
- 各语言分别维护文章、Wiki、菜单、Logo、侧边栏和 SEO。
- 主题不猜测不同语言页面之间的翻译关系。
- 不自动拼接当前页面路径，避免不同语言 permalink 不一致导致 404。

## 语言入口

可以在各语言站点的主菜单中配置指向其它站点的普通链接：

```yaml blog/_config.stellar.yml
menubar:
  items:
    - id: zh-CN
      title: 简体中文
      url: https://xaoxuu.com/
    - id: en
      title: English
      url: https://en.example.com/
```

`url` 可以是独立域名、子域名或其它站点地址。主题不会自动识别或切换翻译版本。
