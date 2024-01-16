---
layout: wiki
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
subtitle: '每个人的独立博客 | Designed by xaoxuu'
tags: 博客主题
icon: /assets/wiki/stellar/icon.svg
cover: /assets/wiki/stellar/icon.svg
description: Stellar 是一个内置文档系统的简约商务风 Hexo 主题，支持丰富的标签和动态数据组件。
repo: xaoxuu/hexo-theme-stellar
search:
  filter: /wiki/stellar/
  placeholder: 在 Stellar 中搜索...
sidebar: 
  - toc
  - timeline_stellar_releases
  - related
comment_title: '评论区仅供交流，有问题请提 [issue](https://github.com/xaoxuu/hexo-theme-stellar/issues) 反馈。'
comments:
  service: giscus
  giscus:
    data-repo: xaoxuu/hexo-theme-stellar
    data-mapping: number
    data-term: 226
path: /wiki/stellar/
toc:
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
    - fcircle
  '技术支持':
    - articles
    - todo
    - contributors
```

<!-- node 2/3 设置布局模板和项目名称 -->
在此文档项目的 `md` 文件的 `front-matter` 部分设置布局模板为 `wiki` 并且指定所属的项目 `id` （即上一步创建的文件名 `id.yml`）
```yaml blog/source/wiki/stellar/index.md
---
layout: wiki  # 使用wiki布局模板
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
path: /wiki/stellar/
toc:
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
    - fcircle
  '技术支持':
    - articles
    - todo
    - contributors
```

如果目录树不需要分组，可以这样写：

```yaml blog/source/_data/wiki/hexo-stellar.yml
path: /wiki/stellar/
toc:
  - index # 会被关联到 /wiki/stellar/index.md
  - examples # 会被关联到 /wiki/stellar/examples.md
  - ...
```


## 是否显示封面

项目可以显示一个全屏封面，封面占据一个屏幕的高度，会居中依次显示项目的 logo、标题、描述。开启项目封面方法如下：

```yaml blog/source/_data/wiki/hexo-stellar.yml
cover: /assets/wiki/stellar/icon.svg
coverpage: true # 默认是 true
```

如果 logo 中已经包含了项目标题，可以这样设置不显示项目标题：

```yaml blog/source/_data/wiki/hexo-stellar.yml
coverpage: [logo, description]
```

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
sidebar:
  - toc
  - timeline_stellar_releases
  - related
```

> todo

## 在目录树中隐藏某篇文章

可以在 `front-matter` 中不设置 `title` 标题，或者将 `title` 改为 `seo_title`：

```yaml blog/source/xxx/xxx.md
seo_title: 原本的标题
```

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
