---
layout: wiki
wiki: hexo-stellar
title: 侧边栏配置
---

## Logo

左上角的 logo 和标题取自站点根目录的配置文件：

```yaml blog/_config.yml
title: 网站名称
avatar: 头像
```

设置鼠标指上 `subtitle` 后翻转另一行字（您可以将鼠标移至左上角的Stellar查看效果）

```yaml blog/_config.stellar.yml
logo:
  subtitle: '' # '文字1 | 文字2' (鼠标放上去会切换到文字2)
```

如果您想用一个图片作为 logo，可以直接在主题配置文件 sidebar.logo 中设置：

```yaml blog/_config.stellar.yml
logo:
  avatar: '[${config.avatar}](/about/)' # you can set avatar link in _config.yml or '[https://xxx.png](/about/)'
  title: '[${config.title}](/)' # you can set html tag like: '[<img no-lazy height="32px" src="xxx"/>](/)'
```

## Background（背景）

此功能在 {% mark 1.26.0 %} 中支持，可以设置：纯色/渐变色/图片作为背景。

```yaml blog/_config.stellar.yml
style:
  ...
  sidebar:
    # background: 'linear-gradient(to bottom, #20E2D744, #F9FEA544)'
    background: 'url(https://gcore.jsdelivr.net/gh/cdn-x/placeholder@1.0.13/image/sidebar-bg1@small.jpg)'
    blur: true # 在图片上层增加高斯模糊效果（同时附带饱和度增强效果）
```

{% folding 关于linear-gradient的用法示例 child:codeblock %}
```css
/* 渐变轴为 45 度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 色标：从下到上，从蓝色开始渐变，到高度 40% 位置是绿色渐变开始，最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 颜色提示：从左到右的渐变，由红色开始，沿着渐变长度到 10% 的位置，然后在剩余的 90% 长度中变成蓝色 */
linear-gradient(.25turn, red, 10%, blue);

/* 多位置色标：45% 倾斜的渐变，左下半部分为红色，右下半部分为蓝色，中间有一条硬线，在这里渐变由红色转变为蓝色 */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```
{% endfolding %}

## Navbar（主导航栏）

自己可以增加任意的键值对，键：就是 menu_id，后面需要用到，值：就是显示的 md 链接，方括号内支持文字和图片标签

```yaml blog/_config.stellar.yml
# 侧边栏主功能导航菜单
menubar:
  columns: 4 # 一行多少个
  items: # 可按照自己需求增加，符合以下格式即可
    # - id: post # 页面中高亮的 menu_id
    #   theme: '#1BCDFC' # 高亮时的颜色，仅 svg 中 fill="currentColor" 时有效
    #   icon: solar:documents-bold-duotone # 支持 svg/img 标签，可以定义在 icons.yml 文件中，也支持外部图片的 URL
    #   title: 博客 # 标题
    #   url: / # 跳转链接，支持相对路径和绝对路径
    # - id: wiki
    #   theme: '#3DC550'
    #   icon: solar:notebook-bookmark-bold-duotone
    #   title: 文档
    #   url: /wiki/
    # - id: explore
    #   theme: '#FA6400'
    #   icon: solar:planet-bold-duotone
    #   title: 探索
    #   url: /explore/
    # - id: social
    #   theme: '#F44336'
    #   icon: solar:chat-square-like-bold-duotone
    #   title: 社交
    #   url: /friends/
```

侧边栏宽度有限，如何在不影响观感的情况下设置更多的主导航栏按钮呢？建议设置一个「更多」按钮，然后在「更多」页面的侧边栏放上列表组件。

## Search（搜索）

{% tabs align:left %}

<!-- tab local_search -->

在 {% mark 1.17.1 color:dark %} 版本后开始支持，无需安装插件，默认开启。

```yaml blog/_config.stellar.yml
# 文章搜索
search:
  service: local_search # local_search, todo...
  local_search: # 在 front-matter 中设置 indexing:false 来避免被搜索索引
    field: all # post, page, all
    path: /search.json # 搜索文件存放位置
    content: true # 是否搜索内容
    codeblock: true # 是否搜索代码块（需要content: true)
```

<!-- tab others -->

请提交PR...

{% endtabs %}

在 `_config.stellar.yml` 中设置搜索选项，现在 `search` 组件的位置固定，暂不支持更改。

但你仍可以在某些页面中通过覆盖 search 组件的 filter 参数来定制化搜索范围，例如 `wiki` 或 `笔记` 页面的配置中:

```yaml blog/source/_data/wiki/xxx.yml
search:
  filter: /wiki/stellar/
  placeholder: 在 Stellar 中搜索...
```

## Footer（页脚）

```yaml blog/_config.stellar.yml
footer:
  social:
    github:
      icon: '<img src="/assets/placeholder/social/08a41b181ce68.svg"/>'
      url: https://
    music:
      icon: '<img src="/assets/placeholder/social/3845874.svg"/>'
      url: https://
    unsplash:
      icon: '<img src="/assets/placeholder/social/3616429.svg"/>'
      url: https://
    comments:
      icon: '<img src="/assets/placeholder/social/942ebbf1a4b91.svg"/>'
      url: https://
```

## 自定义组件

Stellar 支持丰富的自定义小组件，详见这篇文档：

{% link https://xaoxuu.com/wiki/stellar/widgets/ desc:true %}