---
title: 外观与排版
date: 2023-12-06 21:55
updated: 2026-09-12 01:21
---

外观预设控制站点的整体样式，文章风格控制正文排版。选好预设后，还可以分别调整颜色、字体、圆角和背景。

## 从一套预设开始

```yaml blog/_config.stellar.yml
appearance:
  preset: minimal
  color_scheme: auto
  colors:
    primary: '#39a7b5'
    accent: '#ee7858'
    link: '#287cc1'
```

预设支持 `card`、`glass`、`minimal`、`flat`，配色模式支持 `auto/light/dark`。访客切换入口由 `features.color_scheme_switch.enabled` 控制。

## 字体与正文

```yaml blog/_config.stellar.yml
appearance:
  typography:
    font_family:
      body: 'system-ui, "Microsoft Yahei", sans-serif'
      code: 'Menlo, Consolas, monospace'
    font_size:
      root: 16px
      inline_code: 85%
      code_block: 0.8125rem
    content_align: left
```

外部或本地字体先通过自己的 CSS 声明 `@font-face`，再把字体名放入候选列表。样式表可以经[自定义样式](/wiki/stellar/guides/customization/)加载；检查字体授权、文件路径与浏览器实际加载结果。

## 圆角与背景

```yaml blog/_config.stellar.yml
appearance:
  shape:
    corner: superellipse(1.25)
    radius:
      card: 16px
      image: 16px
  backgrounds:
    leftbar:
      type: gradient
    page:
      image: /images/background.webp
```

圆角曲线支持 `round/scoop/bevel/notch/square` 及 `superellipse(...)`。背景、渐变、遮罩与字号的完整配置见[外观参考](/wiki/stellar/reference/theme/#外观)。使用连续曲率时检查目标浏览器的最终效果。

## 阅读增强

> 版本范围：本页按 rc.4 之后的当前开发版源码核对（截至 2026-09-12）。其中新增或调整的配置不代表已发布 rc.4 的行为；使用 npm 候选版时请对照对应版本源码。

```yaml blog/_config.stellar.yml
features:
  card_hover:
    spotlight: true
    tilt: true
  reveal:
    enabled: true
    duration: 800
    interval: 200
    distance: 8
    blur: 4
  lazy_loading:
    transition: fade
    auto_aspect_ratio: true
```

卡片效果、滚动动画和图片懒加载各自独立。代码复制是内置交互，不需要重复加载一套插件。这些功能所需的脚本由主题自动加载。

外观配置在重新生成后生效。字体或圆角未按预期显示时，可检查浏览器是否加载了字体文件、是否支持所选圆角样式。

`font_smoothing` 位于 `appearance.typography`，支持 auto、none、antialiased（默认）。`font_weight` 可把设计字重映射到字体提供的字重，例如 `font_weight: {500: 600}`；内置键为 100、200、300、400、500、600、700、800、900，目标为 1–1000，映射只执行一次。

Reveal 的 duration、interval 单位为毫秒且非负；interval 为 0 时同时播放。distance 单位为像素，负数从上方进入，0 关闭位移；blur 为非负像素，0 关闭模糊。首屏可见内容直接显示；系统偏好减少动态效果或浏览器缺少动画能力时保持可读。
