---
title: 认识 Stellar
date: 2022-10-21 13:15
updated: 2026-09-30 15:49

---

Stellar 是一个基于 Hexo 的 {% mark  全能个人知识库 %}，开箱即用，内置海量标签和动态数据组件。可用于个人博客、项目文档、知识库、专栏、笔记等。

## 完善的内容组织体系

{% grid bg:box %}
<!-- cell -->

{% quot el:h3 icon:solar:document-text-bold-duotone color:cyan 博客系统 %}

Stellar 具备完整的博客体系，正如其它 Hexo 主题一样。

{% navbar [了解详情](/wiki/stellar/guides/pages/) %}

<!-- cell -->
{% quot el:h3 icon:default:documents color:blue 专栏系统 %}

把博客中的系列文章组织在一起，为读者提供连续阅读的入口。

{% navbar [了解详情](/wiki/stellar/guides/topic/) %}

<!-- cell -->
{% quot el:h3 icon:solar:box-minimalistic-bold-duotone color:green 文档系统 %}

为项目手册、产品说明等文档编排目录，按章节阅读。也支持单个项目成为站点唯一内容。

{% navbar [了解详情](/wiki/stellar/guides/wiki/) %}

<!-- cell -->
{% quot el:h3 icon:solar:document-add-bold-duotone color:purple 笔记系统 %}

用多级标签整理知识，按创建或更新时间浏览笔记。

{% navbar [了解详情](/wiki/stellar/guides/notebook/) %}
{% endgrid %}

## 灵活的排版与表达方式

{% box %}
{% quot el:h3 icon:solar:star-ring-bold-duotone color:red 你的站点，由你定义 %}
从外观预设、配色和字体，到圆角与背景，站点的整体风格都能按你的喜好调整。无论博客、知识库还是项目文档，都能拥有自己的样子。
{% navbar [了解详情](/wiki/stellar/guides/appearance/) %}
{% endbox %}

{% box %}
{% quot el:h3 icon:solar:window-frame-bold-duotone color:orange 灵活的内容布局 %}
分栏、选项卡、折叠块和图库可以在 Markdown 中直接书写，用于并排比较、逐步展开或集中展示。
{% navbar [了解详情](/wiki/stellar/reference/tags/container/) %}
{% endbox %}

{% box %}
{% quot el:h3 icon:solar:notes-bold-duotone color:amber 丰富的表达方式 %}
{% tip 提示 pop:注解 %}、图片、音视频、引用、{% mark 标注 color:amber %}与对话，让重点更醒目，叙述更生动。
{% navbar [了解详情](/wiki/stellar/reference/tags/express/) %}
{% endbox %}

{% box %}
{% quot el:h3 icon:solar:database-bold-duotone color:cyan 静态内容与动态数据 %}
时间线、网站卡片和 GitHub 内容既能直接填写，也能从数据源读取，数据更新无需重新生成整站。
{% navbar [了解详情](/wiki/stellar/reference/tags/data/) %}
{% endbox %}


{% box %}
{% quot el:h3 icon:solar:document-text-bold-duotone color:blue 渲染外部 Markdown %}
用一个链接，将外部 Markdown 文件渲染到页面中。项目 README、共享文档都能自然融入正文，无需反复复制维护。
{% navbar [了解详情](/wiki/stellar/reference/tags/data/#md-渲染外部-markdown-文件) %}
{% endbox %}

## 从蓝图开始，一键启动

{% box %}

{% tabs active:1 %}
<!-- tab 轻博客 -->

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.1.2/stellar/v2/lightblog-home.webp 轻博客首页 %}

没有常驻侧栏，站点名字与菜单放在顶部。适合长文、随笔和低干扰阅读，也是第一次使用时最简单的起点。

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-lightblog --blueprint=lightblog --non-interactive %}

[查看源码](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4011-lightblog) · [从零搭建](/wiki/stellar/start/first-site/)

<!-- tab 极简博客 -->

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.1.2/stellar/v2/minimalblog-home.webp 极简博客首页 %}

保留左侧站点身份和主菜单，把视觉装饰降到最低。文章、分类、标签和归档各自承担一种查找方式，页面把注意力留给正文。

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-minimalblog --blueprint=minimalblog --non-interactive %}

[查看源码](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4012-minimalblog) · [调整导航](/wiki/stellar/guides/layout/)

<!-- tab 个人知识库 -->

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.1.2/stellar/v2/knowledge-home.webp Stellar 个人知识库首页 %}

“个人知识库”把近期文章、专栏和两套 Wiki 放在一个站点里。博客记录变化，Wiki 保存以后还会反复查阅的内容。

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-knowledge --blueprint=knowledge --non-interactive %}

[查看源码](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4021-knowledge) · [用 Wiki 整理内容](/wiki/stellar/guides/wiki/)

<!-- tab 项目文档 -->

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.1.2/stellar/v2/docs-home.webp Stellar 单项目文档站首页 %}

“项目文档”没有博客列表，打开就是项目首页。左侧目录负责阅读顺序，右侧目录帮助读者浏览当前页面。

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-docs --blueprint=docs --non-interactive %}

[查看源码](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4031-docs) · [建立项目文档](/wiki/stellar/guides/wiki/)

<!-- tab 笔记本 -->

{% image https://cdn.jsdelivr.net/gh/cdn-x/wiki@1.1.2/stellar/v2/notebook-home.webp 笔记本首页 %}

把站点当成一本持续生长的笔记本：先用笔记本与层级标签整理零散想法，主页保留一栏随时间发布的近况。

{% copy curl -fsSL https://github.com/xaoxuu/hexo-theme-stellar-examples/raw/main/install.sh | sh -s -- create stellar-notebook --blueprint=notebook --non-interactive %}

[查看源码](https://github.com/xaoxuu/hexo-theme-stellar-examples/tree/main/case4041-notebook) · [用笔记本整理内容](/wiki/stellar/guides/notebook/)

{% endtabs %}

{% endbox %}

## 关于 Stellar

{% quot 真正的简约不止删繁就简，而是在纷繁中建立秩序。 %}

{% image https://star-history.dera.page/svg?repos=xaoxuu/hexo-theme-stellar&type=date&legend=top-left %}

{% box %}
{% friends api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/contributors?per_page=100&direction=asc %}
{% endbox %}


{% navbar [源代码](https://github.com/xaoxuu/hexo-theme-stellar) [版本记录](/wiki/stellar/support/releases/) [社区文章](/wiki/stellar/support/articles/) [参与贡献](/wiki/stellar/support/community/) %}

{% rating id:default 给 Stellar 五星好评吧～ %}
