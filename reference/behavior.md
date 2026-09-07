---
title: 配置与行为
date: 2026-09-05 20:49
updated: 2026-09-07 20:24
---

本页说明配置的覆盖顺序、内容归属、排序和错误处理。完整字段见[主题配置](/wiki/stellar/reference/theme/)、[Collection](/wiki/stellar/reference/collection/)与 [Front Matter](/wiki/stellar/reference/front-matter/)。

## 配置覆盖顺序与空值

| 对象 | 从低到高的来源 |
| :--- | :--- |
| Region | 主题全局 → 类型默认／profile → Collection → Front Matter |
| active_menu | profile → Collection → Front Matter |
| breadcrumb | Collection → Front Matter，再结合页面上下文 |
| article | 主题文章默认 → Collection → Front Matter |
| 内容 footer | Article 默认 → Collection 共享默认 → Collection → Front Matter |
| comments | 主题评论默认 → Collection → Front Matter |
| source | Collection → Front Matter |

对象保留未覆盖的字段；数组整体替换，明确的空数组表示清空。Region 的 `widgets` 省略时继承。只有声明支持 null 的字段才按其语义使用 null：

- Region `enabled`、menu、actions 以及 Brand 整体 null：继承；Brand false：隐藏。
- Brand 具体名称、图片等字段 null：隐藏对应内容。
- 全局 Provider null：在允许关闭的服务上关闭；页面 comments.provider null：继承。
- Collection 的内容页脚默认继承 Article 许可协议与标签开关，但关闭分享；`true` 恢复对应的全局 Article 值，`false` 或 `[]` 关闭。null 保持当前继承层级。
- Notebook per_page null：继承 Hexo；0：不分页。

空 YAML 值会进入相应字段的空值处理，不应通过批量把所有值改成 null 来迁移。各字段的具体用法见对应配置参考。

## Collection 归属

显式 `collection.profile/id` 优先表达意图，但不能与可推导的唯一归属冲突。Wiki 会结合标准目录、集合路由与目录树识别页面；Notebook 可根据 `source/notebooks/<id>/` 识别；Topic 的入口文章可从 `route.start` 匹配。只有唯一候选时才推导。

多个候选、引用不存在的集合、身份与目录不一致时必须修正来源或声明，主题不会随意挑选集合。普通 Post/Page 无需声明；Topic 成员属于 posts，Wiki/Notebook 属于 pages。

不同内容类型支持的功能不同。例如，Wiki 支持 Hero 和目录树，Notebook 支持笔记列表设置；字段需要写在支持它的页面或集合中。

`profiles.notebooks.path: null` 只关闭“全部笔记本”总索引，并移除 Note Brand 返回按钮和面包屑中的总索引链接。各 Notebook 的集合、标签与详情路由仍会生成；没有显式 `route.path` 的 Notebook 会直接从自身 ID 派生路径。

## 排序与可见性

`listing.priority` 是非负整数，大于零才置顶；优先级越大越靠前。页面优先级只支持 Post、Topic、Notebook。未置顶文章的顺序由所在列表和 Hexo 配置决定。

Notebook 集合按 `listing.order` 升序，笔记先按置顶再按 `listing.sort` 排序，默认 updated desc。Wiki 首页书架当前按 `wiki.shelf` 中 ID 的声明顺序展示；文档目录按 `navigation.tree`，不能把集合 order 等同于目录顺序。

Topic 系列导航和相应索引当前只按 date 排序；配置接受 updated/title，但使用这两个值时保留输入顺序。专栏总索引再按各系列首项日期降序展示。希望按时间连贯阅读时使用 date asc。

Collection 的 `visibility.listed/searchable` 是成员页默认，Front Matter 可显式覆盖。`listed: false` 还会隐藏 Collection 总入口，并把成员从列表与 recent 中排除；`searchable: false` 把成员从站内搜索排除。两者不代表内容未生成或受到访问保护，详情路由仍存在；robots 和 sitemap 由站点维护。Wiki 的 shelf 状态只控制总入口上架，不会隐式隐藏成员页面。

## 图片与 Brand 来源

页面 `cover/tagline` 只属于自己的列表呈现；Collection 对应字段不向成员卡片继承。`banner` 控制内容横幅，Hero 仅属于 Wiki 首页；这些语义字段不会互相替代。

Wiki/Notebook 默认使用 Collection Brand，Topic 使用站点 Brand。Brand 来源与 regular/compact 样式独立。Collection 缺图时使用无图样式或对应图标；仓库统计使用 Collection 自己的仓库，没有仓库时不生成该区域。

`fallbacks` 用于头像、链接卡片和 SEO 图片等场景，不会为所有缺图组件补上远程图片。

## 错误恢复与 Doctor

站点生成和配置热重载会忽略可恢复的错误，例如未知字段、错误值或无效列表项，继续使用有效配置。终端会记录文件、字段、原因及处理方式。非空列表若全部无效，恢复可能回到继承／默认值；用户明确的 `[]` 仍表示清空。

根结构、YAML 语法、内容标识、归属冲突、无法确定的路由以及内容类型不支持的配置会导致失败。热重载遇到致命配置错误时保留上一次有效配置；普通构建需修正错误后重试。

Doctor 严格检查配置文件，即使站点生成时忽略了错误，Doctor 仍会报告问题。仅有 Widget 位置或实例 warning 时 `ok` 仍为 true，但应按报告检查缺失的组件。

## 浏览器脚本与远程服务

主题自动加载浏览器功能。若站点使用 Babel 或压缩工具处理生成文件，需保留 `public/js/runtime/**/*.js` 的原生 ESM 和相对导入，不能转成 CommonJS。

远程服务不可用时，组件会保留静态内容或显示空状态。请求缓存、超时和资源加载由主题管理，没有对应的 YAML 配置项。Doctor 不验证远程登录、服务权限或浏览器的实际视觉效果。
