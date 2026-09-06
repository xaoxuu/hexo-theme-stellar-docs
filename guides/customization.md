---
title: 自定义样式与脚本
date: 2023-12-06 21:55
updated: 2026-09-06 02:28
---

颜色、字体、布局和侧栏可以通过主题配置调整。需要额外样式或第三方功能时，可用 `inject` 加载自己的 CSS 和脚本。

## 加载自定义 CSS

把自己的 CSS 放到 `source/assets/custom.css`，在主题配置中加载：

```yaml blog/_config.stellar.yml
inject:
  head_end: '<link rel="stylesheet" href="/assets/custom.css">'
```

`inject.head_end/body_end` 会原样插入 HTML，不进行转义，应只填写可信内容。页面也可用同名 `inject` 字段追加本页资源。

## 字体、代码与图标

字体通过 `@font-face` 引入后，在 `appearance.typography.font_family` 选择。外部代码高亮样式使用 `appearance.code_block.highlight_stylesheet`，同时确保 Hexo 的代码高亮设置与实际输出匹配。

站点图标库在 `source/_data/icons.yml` 中定义，菜单和标签通过图标 ID 引用。图标与资源路径先验证存在，再在正文复用。

## 第三方脚本

统计等第三方脚本可通过 `inject` 接入，参数、数据和隐私设置需按服务方说明配置。主题自己的脚本由主题加载，旧版资源字段不再用于替换这些脚本。

若站点构建包含 Babel 或压缩，`public/js/runtime/**/*.js` 必须保留原生 ESM 及相对导入；普通脚本仍按站点流程处理。

资源未生效时，检查生成 HTML 中的链接与浏览器控制台；同一脚本应避免重复加载。若直接修改主题源码，建议在自己的 Git 分支中保存定制，并执行相关主题检查。
