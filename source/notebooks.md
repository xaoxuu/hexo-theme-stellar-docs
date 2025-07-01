---
wiki: hexo-stellar
title: 实现完整的笔记体系
references:
  - '[PR#464 @calfzhou](https://github.com/xaoxuu/hexo-theme-stellar/pull/464)'
---

感谢 [@calfzhou](https://github.com/calfzhou) 提交 [PR#464](https://github.com/xaoxuu/hexo-theme-stellar/pull/464) 引入了一套全新的笔记系统，并提供了详细的文档说明。

## 笔记 vs 博客/文章、专栏、文档

主要还是组织管理方式的差异。

博客/文章是相对松散的，文章和文章之前一般没有很强的关联性，通常按照发表时间自然排序。博客本质还是一种「日记」，会更在意发表时间，虽然也会更新内容，但不会频繁更新，更新时候也一般以增补修订为主。

专栏是在博客/文章的基础上，加强了前后的关联性和整体性，专栏内的文章有较强的线性顺序和连续要求，并一般将这种顺序落实在发表时间上。其他方面跟博客/文章类似。

文档（wiki）目前主要是为知识库、产品文档场景设计的，通常拥有有限的不常变动的页面数量，各个页面之间有较强的关联性，通过（手动维护）文档树来管理这种关联性。另外相较于博客/文章和专栏，文档页面的内容是根据项目、产品的迭代而持续不断维护更新的，相比发表时间，它更加关注最后更新时间和修改历史。

笔记（note）的页面关联性层面像博客/文章，是比较松散的，一般没有专栏那么强的前后线性顺序，也没有文档那么强的树形结构。但它又不像博客/文章那样，需要按发表时间排序，因为笔记的内容往往是持续更新的，会更加关注最后更新时间。另外，笔记的不同页面之间可以通过引用来形成网状结构，构成知识图谱。笔记的页面数量方面也比较像博客/文章，是没有数量上限的，不像文档那样一般是相对有限的页面数量。另外常见的管理笔记的方式是通过标签（尤其嵌套标签形成的标签树）来分组，标签的好处是一篇笔记可以归属多个标签。

我不用博客/文章来承载笔记，最主要的原因是感觉博客/文章不太适合于承载需要持续更新、变化的内容，而且更加突出最后更新时间而非发表时间。也不太能用文档来承载笔记，一是不太方便手动维护笔记目录结构，二是想更多的借助标签树来进行笔记分组。

系统 | 页面数量 | 组织方式 | 内容更新 | 更关注什么时间
--|--|--|--|--
博客/文章 | 无限，持续增加 | 按发表时间自然排列 | 较少（修补为主） | 发表时间
专栏 | 无限，持续增加 | 按时间线性且聚集 | 较少（修补为主） | 发表时间
文档 | 较少，通常不变 | 树状目录结构 | 持续 | 最后更新时间
笔记 | 无限，持续增加 | 标签树 + 引用网 | 持续 | 最后更新时间

因此我参考 stellar 主题中的文档系统，加入了与其并列的笔记系统。

## 笔记本和笔记，主要的页面

就像文档系统支持任意多个项目一样，笔记系统也支持任意多个笔记本（notebook）。用户可以在 `./source/_data/notebooks/` 中创建 yaml 文件来定义笔记本，一个 yaml 文件对应一个笔记本。笔记（note）本质就是一个普通的页面（page），在 front-matter 中通过 `notebook` 字段指定了所属的笔记本的 id。一篇笔记只能归属于一个笔记本。

我增加了以下的页面：

- 笔记本列表页 `/notebooks/`：类似于文档系统中的 `index_wiki` 页，会列出所有的笔记本。
- 笔记本页即笔记列表页 `/notebooks/{notebook}[/pages/{page}]/`，或笔记本内某个标签的笔记列表页 `notebooks/{notebook}/tags/{tag}[/pages/{page}]/`：类似于博客的近期发布页面，会分页列出一个笔记本内所有的笔记，或者选定的标签下所有的笔记。
- 笔记页 `/notebooks/{notebook}/{note}`：笔记内容页面。

## 笔记本配置

类似于文档系统中的项目，在 `./source/_data/notebooks/` 中的一个 yaml 文件定义了一个笔记本。文件名就是笔记本的 id。文件内容示例（跟 wiki 项目类似，但简单很多，只支持了少量的自定义配置）：

``` yaml
name: Demo
title: Demo Notebook
icon: /images/favicon.png
description: 这是一本用来演示的笔记本
base_dir: /notes/

sort: 1
per_page: 10
order_by: -updated
license: true
share: true

menu_id: notes
# 笔记列表页的左/右侧栏
# leftbar: [tagtree, recent]
# rightbar: []
# 笔记页的左/右侧栏
# note_leftbar: [tagtree, recent]
# note_rightbar: [toc]
```

## 标签树（tagtree）widget

在笔记列表页和笔记页，可以在左侧边栏显示当前笔记本的标签树。笔记的标签定义在 front-matter 中的 `tags` 字段，类似于普通文章。嵌套标签用 `/` 进行分割，就跟文件系统的目录类似，比如 `knowledge/math/probability`。一篇笔记可以有任意多个标签。

标签树组件会以树形结构显示出所有的标签及其层级结构，另外可以配置比如是否自动展开所有标签（默认否）、是否自动展开当前标签（默认是）、是否显示标签的 icon（默认是）。用户可以在主题配置中为任何标签配置 icon，默认使用新增的 `solar:hashtag-linear` icon。

标签树组件看起来大致是这样：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/87935943-58f5-440b-9abb-be6ec25a759a width:300px ratio:560/1000 %}

## 笔记本列表页

主体部分是以卡片形式显示的笔记本列表，跟 index wiki 页面类似，支持通过 sort 对笔记本进行排序，但目前不支持笔记本上的 tag。示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/b6c66171-9f87-4594-9038-e67a9d2cdcf3 width:500px ratio:627/529 %}

默认的左侧边栏是 recent 组件，列出所有笔记本中最近更新的几篇笔记。跟 index wiki 页面的 recent 组件类似，会在笔记标题前面加上笔记本的名称。示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/4616fa3c-11fc-4bd1-aae4-64f29f9dfacb width:300px ratio:279/387 %}

## 笔记列表页

主体部分是分页的笔记卡片，跟博客的近期发布页面类似，但默认按照笔记的更新时间逆序排列。支持在笔记的 front-matter 中通过 `pin` 或 `sticky` 字段来置顶笔记。卡片会显示笔记的更新时间和标签。示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/cff0595b-e6b2-4992-a18e-6f69d08d804c width:500px ratio:1374/1820 %}

笔记卡片支持类似于博客文章的 cover，但目前不支持 poster。示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/4a70cb9e-8a6b-4922-8b2f-82ecb78bc0e2 width:500px ratio:627/615 %}

默认的左侧边栏是 tagtree 和 recent 组件。tagtree 组件会高亮当前选中的标签，如果没有选中标签，则高亮「全部笔记」。recent 组件会列出当前笔记本内最近更新的几篇笔记。

搜索框会限定在当前笔记本中进行搜索。暂时不支持仅在当前选中的标签内搜索。

## 笔记页

主体部分就是笔记（本质就是一个 page）的内容。顶部优先展示更新时间，鼠标悬浮时展开发表时间。示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/972f5e84-1f1a-4706-b018-c88b3fcea06c width:300px ratio:296/65 %}

底部展示该笔记所属的所有标签，样式类似于博客的标签页，示例：

{% image https://github.com/xaoxuu/hexo-theme-stellar/assets/3761553/4f0eade5-457b-4e64-9367-b9a34cdc7ec5 width:300px ratio:382/88 %}

另外跟博客、文档类似，可以控制是否显示许可协议和分享按钮。

默认的左侧边栏和搜索框跟笔记列表页类似。
