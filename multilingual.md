---
date: 2026-08-18 14:07
updated: 2026-08-18 15:07
wiki: hexo-stellar
title: 多语言内容体系
---

Stellar 的多语言系统分为两部分：主题内置文案的国际化，以及站点内容的多语言版本管理。

## 主题文案

主题使用 Hexo 的 i18n 机制。站点根目录的 `_config.yml` 中可以配置语言优先级：

```yaml
language:
  - zh-CN
  - en
  - zh-TW
```

主题内置文案位于 `themes/stellar/languages/`，模板通过 `__()` 读取。语言配置只影响主题文案和页面的 `lang`，不会自动翻译文章正文。

## 内容翻译版本

同一内容的不同语言版本使用相同的归一化路径，并通过 URL 第一级语言前缀区分语言：

```text
/wiki/stellar/       → 默认语言，key: wiki/stellar/
/en/wiki/stellar/    → en，key: wiki/stellar/
```

语言切换器会优先跳转到当前页面对应的翻译版本；没有对应版本时显示为不可用，不会生成错误链接。主题也只会为实际存在的翻译版本输出 `hreflang`。

## Wiki 项目的语言视图

Wiki 会在构建阶段为每种配置语言生成独立的数据视图。项目列表、项目树、标签、最近更新、相关文章和搜索索引只使用当前语言的页面，因此英文 Wiki 不会把中文项目树混入侧边栏。

项目可以在 `source/_data/wiki/*.yml` 中使用 `locales` 覆盖当前语言的项目配置：

```yaml
locales:
  en:
    name: Stellar
    title: Stellar - A New Blogging Journey
    search:
      filter: /en/wiki/stellar/
    tree:
      'Getting Started':
        - index
```

未覆盖的字段回退默认项目配置。只要当前语言存在该项目的页面，即使没有专属配置，项目也会保留在当前语言列表中；没有当前语言页面的项目则不会显示。

## 语言入口配置

在 `_config.stellar.yml` 中配置语言入口。`available: false` 用于标记尚未发布的语言，避免出现指向空目录的链接：

```yaml
language_switcher:
  enable: true
  items:
    - code: zh-CN
      title: 简体中文
      url: /
      available: true
    - code: en
      title: English
      url: /en/
      available: false
```

当某个语言版本实际发布后，将对应内容补齐，并把该语言入口设置为 `available: true`。
