# Stellar主题文档更新记录

## 1.24.2

### 功能新增

1. audio 标签组件现在支持 netease 歌曲歌单 [#audio-音频标签](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#audio-%E9%9F%B3%E9%A2%91%E6%A0%87%E7%AD%BE)
   - 歌曲 `{% audio netease:1856385686 %}`
   - 歌单 `{% audio type:0 netease:9145113820 autoplay:1 %}`
   - 音乐外链不支持autoplay参数

2. video 标签组件支持设置最大宽度 [#video-视频标签](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#video-%E8%A7%86%E9%A2%91%E6%A0%87%E7%AD%BE)
   - `{% video bilibili:BV1GP4y1d729 width:100% autoplay:1 %}`
   - `{% video https://...mov width:100% %}`
   - `width` 须**设置单位**，如80%、500px、10em...
   - 视频外链不支持autoplay参数

## 1.24.1

### 功能新增

video 标签组件现在支持 bilibili [#video](https://xaoxuu.com/wiki/stellar/tag-plugins/express/#video-%E8%A7%86%E9%A2%91%E6%A0%87%E7%AD%BE)

使用方法 `{% video bilibili:BV1GP4y1d729 %}`

## 1.24.0 

### ⚠️ 配置变更

[grid-网格分区容器](https://xaoxuu.com/wiki/stellar/tag-plugins/container/index.html#grid-%E7%BD%91%E6%A0%BC%E5%88%86%E5%8C%BA%E5%AE%B9%E5%99%A8) 写法变更，从原来的 `<!-- cell left/right -->` 变为 `<!-- cell -->` 。不再支持 `left/right` ，同时该组件**支持设置列数、列宽、间距、圆角**了。此处给出查找替换用的正则表达式

```
<!--\s*cell\s+(left|right)\s*-->
替换为
<!-- cell -->
```

### 功能新增

1. 新增 [md 标签组件](https://xaoxuu.com/wiki/stellar/tag-plugins/data/#md-%E6%B8%B2%E6%9F%93%E5%A4%96%E9%83%A8-markdown-%E6%96%87%E4%BB%B6)，使用方法为 `{% md https://...md %}` 同时侧边栏 markdown 小组件也支持渲染外部 markdown 文件，在小组件配置中加入 src 字段即可，具体看[#markdown](https://xaoxuu.com/wiki/stellar/widgets/#markdown)

2. 新增 [audio 组件](https://xaoxuu.com/wiki/stellar/tag-plugins/express/index.html#audio-%E9%9F%B3%E9%A2%91%E6%A0%87%E7%AD%BE)，使用方法为 `{% audio https://...mp3 %}`

3. 新增 [video 组件](https://xaoxuu.com/wiki/stellar/tag-plugins/express/index.html#video-%E8%A7%86%E9%A2%91%E6%A0%87%E7%AD%BE)，使用方法为 `{% video https://...mov %}`

4. 设置好默认作者或者文章作者后（1.23.0版本支持），在 [license](https://xaoxuu.com/wiki/stellar/pages/#许可协议) 中可以使用 ${author.name} 来自动替换为当前文章作者名字，`_config.stellar.yml` 和 `_data/wiki/hexo-stellar.yml` 中的 license 均可。

## 1.23.0

waiting for write...