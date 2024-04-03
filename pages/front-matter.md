---
wiki: hexo-stellar
title: front-matter 全部字段索引
---

所有字段均为可选，如有遗漏或错误欢迎点击右侧的【编辑本文】提交 PR 进行补充。

## Hexo 内置字段

| 参数              | 描述                                                         | 默认值                                                       |
| :---------------- | :---------- | :------------------ |
| `layout`          | 布局                                                         | [`config.default_layout`](https://hexo.io/zh-cn/docs/configuration#文章) |
| `title`           | 标题                                                         | 文章的文件名                                                 |
| `date`            | 建立日期                                                     | 文件建立日期                                                 |
| `updated`         | 更新日期                                                     | 文件更新日期                                                 |
| `comments`        | 开启文章的评论功能                                           | `true`                                                       |
| `tags`            | 标签（不适用于分页）                                         |                                                              |
| `categories`      | 分类（不适用于分页）                                         |                                                              |
| `permalink`       | 覆盖文章的永久链接，永久链接应该以 `/` 或 `.html` 结尾       | `null`                                                       |
| `excerpt`         | 纯文本的页面摘要。使用 [该插件](https://hexo.io/zh-cn/docs/tag-plugins#文章摘要和截断) 来格式化文本 |                                                              |
| `disableNunjucks` | 启用时禁用 Nunjucks 标签 `{{ }}`/`{% %}` 和 [标签插件](https://hexo.io/zh-cn/docs/tag-plugins) 的渲染功能 | false                                                        |
| `lang`            | 设置语言以覆盖 [自动检测](https://hexo.io/zh-cn/docs/internationalization#路径) | 继承自 `_config.yml`                                         |
| `published`       | 文章是否发布                                                 | 对于 `_posts` 下的文章为 `true`，对于 `_draft` 下的文章为 `false` |

> 详见：https://hexo.io/zh-cn/docs/front-matter

## Stellar 特有字段

| 参数          | 描述                                                         | 默认值 | 可用版本       |
| :------------ | :------------- | :------ | :-------------- |
| wiki          | 该页面所属的 wiki 项目                                       |        |                |
| menu_id       | 高亮的菜单按钮 id                                            |        |                |
| sidebar       | 侧边栏配置                                                   |        | 1.0.0 ~ 1.26.8 |
| leftbar       | 左侧边栏配置                                                 |        | 1.27.0 ~       |
| rightbar      | 右侧边栏配置                                                 |        | 1.27.0 ~       |
| comment_title | 评论区标题                                                   |        |                |
| banner        | 页面顶部横幅背景                                             |        |                |
| banner_info   | 横幅信息，包含 avatar/title/subtitle 子配置                  |        |                |
| logo          | 左侧边栏顶部 logo 区域信息，包含 icon/avatar/title/subtitle 子配置 |        |                |
| indent        | 段落是否缩进                                                 | false  |                |
| topic         | 所属话题/专栏                                                |        |                |

