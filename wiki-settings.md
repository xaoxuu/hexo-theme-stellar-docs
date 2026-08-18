---
date: 2023-12-06 21:55
updated: 2026-08-19 00:58
wiki: hexo-stellar
title: 如何使用文档系统
---

Stellar 独创了其它 Hexo 主题所没有的 Wiki 文档系统，可以自动找到一个项目的所有文档分页，生成一个目录树，还可以手动指定顺序、标题、分组，而非依赖文件路径、文件名来排序和显示。

## 基本流程

{% timeline %}
<!-- node 1/3 创建项目描述文件 -->
在 `blog/source/_data/` 文件夹中创建一个 `wiki` 文件夹，在其中放入各个项目的文档。以 Stellar 项目为例，文件名就是项目的 `id`：
```yaml blog/source/_data/wiki/hexo-stellar.yml
name: Stellar
title: Stellar - 每个人的独立博客
headline: 每个人的独立博客 # 可选：Wiki 卡片营销标题，空时取 title
subtitle: '每个人的独立博客 | Designed by xaoxuu'
tags: 博客主题
available: Web # 可选：Wiki 列表卡片显示“适用于”范围
icon: https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg
cover: https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg
description: Stellar 是一个内置文档系统的简约商务风 Hexo 主题，支持丰富的标签和动态数据组件。
pin: 1 # 置顶轮播排序值（可选，设置即置顶，数字越大越靠前，true 视作 1）
repo: xaoxuu/hexo-theme-stellar
search:
  filter: /wiki/stellar/
  placeholder: 在 Stellar 中搜索...
leftbar: 
  - tree
  - timeline_stellar_releases
  - related
comment_title: '评论区仅供交流，有问题请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues) 反馈。'
comments:
  service: giscus
  giscus:
    data-repo: xaoxuu/hexo-theme-stellar
    data-mapping: number
    data-term: 226
base_dir: /wiki/stellar/
tree:
  '快速开始':
    - index
    - examples
    - releases
  '基本使用':
    - theme-settings
    - pages
    - sidebar
    - tag-plugins
    - tag-plugins/express
    - tag-plugins/data
    - tag-plugins/container
    - comments
  '文档系统':
    - wiki-settings
  '进阶玩法':
    - widgets
    - advanced-settings
    - notes
  '技术支持':
    - articles
    - todo
    - contributors
```

## Wiki 列表卡片

Wiki 总列表使用自适应网格，一行可按可用空间显示多张固定 3:4 的竖版卡片；每列最小宽度为 240px，空间充足时自动均分并铺满容器，空间不足时回落为单列。卡片使用独立的 Wiki 封面组件，不与文章 Hero 卡片共用。只有配置 `cover` 时才显示封面背景；未配置时保持纯色空背景，并在 hover 使用通用 `block-border` 边框。有封面时，原图加载与封面主题色计算均完成后才显示主题色渐变模糊层；平均色计算失败会确认使用主题色回退，加载失败自动降级为空封面，避免空白区域出现亮色蒙版或默认主题色闪现。信息层按自身内容高度贴在封面底部：上方文案区与全宽项目底栏分别设置内边距，项目底栏使用 10% 不透明度黑色轻微区分。内容区使用封面主题色的渐变模糊层：主题色经深色化以保证白字可读，从卡片 50% 开始渐显，在最底部达到不透明；悬浮时显示同源但明度提高 20 个点、跟随全局连续曲率的圆角边框。标签、适用范围与热度统一复用元信息的无背景、无边框主题文字样式，间距为 `.5rem 1rem`；适用范围前置通用多设备图标，热度数值继续取 GitHub star 数据并显示为通用火焰图标。项目区不显示顶部边框，项目图标使用 30% 圆角和 `var(--block)` 背景；未配置 `icon` 时使用内置 Solar `default:documents`，颜色为 `var(--text-p2)`。底部显示 `headline` 营销标题（字号 `1.25rem`、字重 `700`，为空时取 `title`，再回退 `name`）、可选的 `available`、热度，以及图标、`name` 和副标题。副标题优先取显式 `subtitle`；其中包含 ` | ` 且左侧非空时只显示左侧，否则再按 `description`、内容摘要的顺序取值。

`available` 是可选字符串；未配置时不会显示“适用于”。配置 `repo: owner/repo` 时会动态显示 GitHub star，仓库不存在或请求失败时自动隐藏。

<!-- node 2/3 设置布局模板和项目名称 -->
在此文档项目的 `md` 文件的 `front-matter` 部分指定所属的项目 `id` （即上一步创建的文件名 `id.yml`）
```yaml blog/source/wiki/stellar/index.md
---
wiki: hexo-stellar # 这是项目id，对应 /data/wiki/hexo-stellar.yml
title: 这是分页标题
---
```

<!-- node 3/3 将此项目「上架」 -->
在 `blog/source/_data/` 文件夹中创建一个 `wiki.yml` 文件，在其中写入需要显示的项目 `id`：

```yaml blog/source/_data/wiki.yml
- hexo-stellar
- 其它项目
```

这样在项目列表（wiki）页面就可以看到刚刚创建的项目了。

{% endtimeline %}

## 项目分页索引

指定项目所在文件夹和目录树：

```yaml blog/source/_data/wiki/hexo-stellar.yml
base_dir: /wiki/stellar/
tree:
  '快速开始':
    - index # 会被关联到 /wiki/stellar/index.md
    - examples # 会被关联到 /wiki/stellar/examples.md
    - releases
  '基本使用':
    - theme-settings
    - pages
    - sidebar
    - tag-plugins
    - tag-plugins/express
    - tag-plugins/data
    - tag-plugins/container
    - comments
  '文档系统':
    - wiki-settings
  '进阶玩法':
    - widgets
    - advanced-settings
    - notes
  '技术支持':
    - articles
    - todo
    - contributors
```

如果目录树不需要分组，可以这样写：

```yaml blog/source/_data/wiki/hexo-stellar.yml
base_dir: /wiki/stellar/
tree:
  - index # 会被关联到 /wiki/stellar/index.md
  - examples # 会被关联到 /wiki/stellar/examples.md
  - ...
```


## 是否显示封面

项目可以显示一个全屏封面，封面占据一个屏幕的高度，会居中依次显示项目的 logo、标题、描述。开启项目封面方法如下：

```yaml blog/source/_data/wiki/hexo-stellar.yml
cover: https://res.xaox.cc/gh/cdn-x/wiki@main/stellar/icon.svg
coverpage: true # 默认是 true
```

如果 logo 中已经包含了项目标题，可以这样设置不显示项目标题：

```yaml blog/source/_data/wiki/hexo-stellar.yml
coverpage: [logo, description]
```

## 项目首页 Hero 封面

开启 `coverpage` 后，项目首页会渲染为全屏双栏 Hero。`cover` 仍只用于 Wiki 列表卡片；首页背景请使用新的 `background` 字段。它可以是静态图片 URL，也可以是内置动态背景名 `galaxy`。静态图在底部 20% 会渐变模糊并过渡到站点背景色。

```yaml blog/source/_data/wiki/hexo-stellar.yml
background: galaxy # 或 https://res.xaox.cc/hero.webp
preview:
  type: terminal # terminal | image
  commands:
    - label: npm
      codes: |
        npm i hexo-theme-stellar
        npx hexo config theme stellar
    - label: pnpm
      codes: |
        pnpm add hexo-theme-stellar
        pnpm exec hexo config theme stellar
actions:
  - title: 在线演示
    url: https://example.com
    icon: default:monitor
```

终端模式的 `commands[].codes` 支持多行文本，访客可切换安装方式并一次复制完整命令。图片预览改为：

```yaml
preview:
  type: image
  src: https://res.xaox.cc/demo.webp
  alt: Stellar 首页预览
```

Hero 顶部左侧是无背景的站点标题按钮，文字取站点 `title`、颜色沿用 Hero 的 `--text-banner`，点击返回网站首页。封面左侧会自动显示 `name`、`headline`（为空时回退 `title`）和 `description`；主标题会随背景明暗切换为高对比的黑或白，并保留同源主题色的柔和发光轮廓。配置 `repo` 时，内置“源码”按钮及 GitHub 最新 tag 版本信息会自动出现；版本信息加载期间不显示占位文字或边框，成功后淡入，并以新标签页打开 GitHub 返回的链接（缺失时回退到对应 tag 页面）。无 tag 或请求失败时，该按钮会自动移除。“源码”按钮背景与边框使用 `--text-banner`，文字与图标反转相同颜色，始终与背景形成相反关系。最新版本标签的边框取同源主题色的 50% 透明度，文字不受影响。内置“文档”按钮固定跳转到当前首页正文，`actions` 用于追加在线演示等自定义按钮。直接打开不带 hash 的项目首页时，页面默认停在 Hero 顶部；仅显式访问 `#start` 或点击“文档”按钮时才定位到正文。内置按钮、终端复制、未命名命令序号与辅助标签会随站点 `language` 切换；`actions[].title` 是项目自定义文案，不会由主题翻译。`background` 图和内置动态背景都会沿用 Wiki 列表封面的文字自适应逻辑：标题取高对比色，说明与玻璃按钮取同源主题色；终端预览则将该主题色与透明色各混合 50%，再叠加背景模糊，主题色尚不可用时回退站点背景色。图标使用主题内置的 `default:*` 名称，例如 `default:monitor`。

## 项目文档标签

如果您有很多项目，有些项目是有相关性的，可以相同的 `tags` 值：

```yaml blog/source/_data/wiki/hexo-stellar.yml
tags: 博客主题
```

也可以设置多个 `tags` 值：

```yaml blog/source/_data/wiki/hexo-stellar.yml
tags: [博客主题, 开源项目]
```


## 项目的 GitHub 仓库信息

设置了 `repo` 值就会在右上角显示项目仓库的相关链接：

```yaml blog/source/_data/wiki/hexo-stellar.yml
repo: xaoxuu/hexo-theme-stellar
```

> 提示：如果项目首页（如 `source/wiki/{id}/index.md`）正文为空，且配置了 `repo`（可选 `branch`），该页会自动以 GitHub 仓库的 README.md 作为主页正文——标题自动适配文章格式，相对图片/链接解析到仓库镜像地址，右侧目录也会在渲染后自动生成。`branch` 缺省使用仓库默认分支；首页正文非空时以本地内容为准。

> 说明：正文为空的 README 主页（以及其它 wiki 页）的 meta description / og:description / JSON-LD 描述会优先取用项目 YAML 中的 `description` 作为备用方案；页面 front matter 显式设置 `description`（或 `open_graph.description`）时以页面级描述为准。

## 项目评论设置

如果希望项目的所有分页使用相同的评论数据，可以在这里覆盖评论配置：

```yaml blog/source/_data/wiki/hexo-stellar.yml
comment_title: '评论区仅供交流，有问题请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues) 反馈。'
comments:
  giscus:
    data-repo: xaoxuu/hexo-theme-stellar
    data-mapping: number
    data-term: 226
```

## 侧边栏组件

如果您希望自定义某个项目的侧边栏组件，可以设置 `sidebar` 值：

可以覆盖组件：
```yaml blog/source/_data/wiki/hexo-stellar.yml
leftbar:
  - tree
  - timeline_stellar_releases
  - related
```

> todo

## 在目录树中隐藏某篇文章

可以在 `front-matter` 中不设置 `title` 标题，或者将 `title` 改为 `seo_title`：

```yaml blog/source/xxx/xxx.md
title: 原本的标题
```

> todo

## 显示许可协议

沿用主题配置文件中设置的：
```yaml blog/source/_data/wiki/hexo-stellar.yml
license: true
```

也可以指定协议内容：
```yaml blog/source/_data/wiki/hexo-stellar.yml
license: '本文采用 [署名-非商业性使用-相同方式共享 4.0 国际](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议，转载请注明出处。'
```

## 显示分享

```yaml blog/source/_data/wiki/hexo-stellar.yml
share: true
```


## 修改 wiki 路径

修改如下配置：

```yaml blog/_config.stellar.yml
site_tree:
  wiki:
    base_dir: wiki # books / products ...
```
