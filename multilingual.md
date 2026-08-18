---
date: 2026-08-18 14:07
updated: 2026-08-18 14:07
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

同一内容的不同语言版本使用相同的 `translation_key`，并分别声明 `lang`：

```yaml
lang: zh-CN
translation_key: stellar-multilingual
```

英文版本使用相同的 key：

```yaml
lang: en
translation_key: stellar-multilingual
```

语言切换器会优先跳转到当前页面对应的翻译版本；没有对应版本时显示为不可用，不会生成错误链接。主题也只会为实际存在的翻译版本输出 `hreflang`。

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
