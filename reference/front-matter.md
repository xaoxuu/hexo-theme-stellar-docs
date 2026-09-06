---
title: Front Matter
date: 2025-07-06 13:34
updated: 2026-09-06 15:51
---

Front Matter 是 Markdown 开头的 YAML 配置。主题字段使用 `snake_case`，第三方参数使用服务方原有的名称。Doctor 会报告不支持的主题字段，旧字段需要按[迁移说明](/wiki/stellar/migration/fields/)修改。

## Hexo 与外部字段

`title/date/updated/layout/tags/categories/description/excerpt/permalink/lang/language/published/photos/link/keywords/robots/sitemap/abbrlink/disableNunjucks` 由 Hexo 或对应插件定义，沿用各自的用法。插件的全站设置仍需写在相应配置文件中。

## 归属

```yaml blog/source/wiki/handbook/install.md
collection:
  profile: wiki
  id: handbook
```

`profile` 可选 wiki/topic/notebook，ID 是集合文件名。声明 collection 时两个字段必须同时有效。唯一候选可省略，推导规则见[行为参考](/wiki/stellar/reference/behavior/#Collection-归属)。普通文章和独立页面无需填写 Collection。

## 图片与文章信息

| 字段 | 类型与默认行为 |
| :--- | :--- |
| `cover/tagline` | string/null，当前页面列表封面与小字；省略不从集合继承 |
| `banner.enabled` | boolean/null，内容横幅开关；省略或 null 继承 |
| `banner.image/avatar/headline/tagline` | string/null，横幅图片、头像、标题和小字；覆盖集合值 |
| `article.style` | tech/story/null，继承主题或集合 |
| `article.paragraph_indent` | auto/always/never/null，继承；auto 随排版决定 |
| `article.author` | string/null，引用 authors.yml 的作者 ID |
| `article.ai_label` | manual/reviewed/polished/generated/null |
| `source.repository/branch` | string/null，继承集合的仓库与分支 |

作者档案由站点 `source/_data/authors.yml` 提供。第一位作者作为默认作者；个人资料页路径前缀由 `profiles.author.path` 设置。

## 导航与 Region

`active_menu` 为 string/null，匹配固定菜单 ID；`breadcrumb` 为 boolean/null。三个 Region 可覆盖 `enabled/widgets`；Topbar、Leftbar 支持 `brand/menu`，Leftbar 还有 `footer.actions`。

结构见[主题 Region](/wiki/stellar/reference/theme/#布局、Brand-与导航)。页面 Leftbar Brand 可覆盖图片、名称、标语、链接与 style；Collection 专属的 source/back_button/search 选择放在集合文件中。

## 可见性与优先级

| 字段 | 默认值 | 限制 |
| :--- | :--- | :--- |
| `visibility.listed` | 普通内容 true；集合成员继承 Collection | boolean，主题列表可见性 |
| `visibility.searchable` | 普通内容 true；集合成员继承 Collection | boolean，站内搜索可见性 |
| `listing.priority` | 0 | 非负整数；Post、Topic、Notebook 页面支持，Wiki、普通 Page 不支持 |

这两个可见性开关不控制直接访问、robots 或站点地图。正整数 priority 才置顶；列表自己的排序规则仍适用于普通内容。

## 页脚

`footer.references` 使用 Markdown 字符串数组，每项按 Markdown 渲染。虽然配置检查允许对象项，但当前模板不能保证将 title/url 对象显示为链接，因此请使用字符串。`footer.license` 接受文案字符串、false、true（恢复全局 Article 文案）或 null（继承）。`footer.share` 支持服务数组、false（隐藏）、true（恢复全局 Article 服务）或 null（继承）。`footer.show_tags` 为 boolean/null，也控制 Notebook 正文末尾的标签行。

普通 Post 默认使用 `article.footer`；Wiki、Topic、Notebook Collection 默认继承全局许可协议和标签开关，但关闭分享。页面省略或填写 null 时继承当前 Collection，仍可用 true 恢复全局 Article 值。

服务列表见[主题内容参考](/wiki/stellar/reference/theme/#文章、笔记与设置页)。这里的 footer 是内容页脚，与主题根级 footer 的站点分栏不同。

## 评论

| 字段 | 类型与语义 |
| :--- | :--- |
| `comments.enabled` | boolean/null，false 关闭，null 继承 |
| `comments.title/id` | string/null，标题和线程标识 |
| `comments.provider` | string/null，选用服务；null 继承全局服务 |
| `comments.options` | 第三方参数对象，与选中的全局 Provider 参数合并 |

不要用页面 `comments: false` 代替对象结构。切换 Provider 时核对线程映射，操作示例见[评论指南](/wiki/stellar/guides/comments/)。

## 渲染、SEO 与注入

| 字段 | 类型与用途 |
| :--- | :--- |
| `render.math` | false / katex / mathjax；省略沿用全局渲染配置 |
| `render.diagrams` | false / mermaid / 参数对象；省略沿用全局配置 |
| `seo.open_graph` | 参数对象，当前页面 Open Graph 覆盖 |
| `inject.head_end/body_end` | 可信 HTML 字符串，追加至相应位置 |

数学和图表设置决定浏览器加载哪种渲染工具，Hexo 使用的 Markdown 渲染器也需要支持相应语法。详见[第三方集成](/wiki/stellar/guides/integrations/)。
