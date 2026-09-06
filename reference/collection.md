---
title: Collection 配置
date: 2026-09-05 20:49
updated: 2026-09-06 22:41
---

Collection 文件位于 `source/_data/wiki/`、`source/_data/topic/` 或 `source/_data/notebooks/`。文件路径提供 profile，文件名提供 ID；`name` 是必填非空名称。只需填写当前集合要修改的配置，其余值由主题提供。

## 基本信息、路径与展示

| 字段 | 类型／默认 | 适用范围与行为 |
| :--- | :--- | :--- |
| `name` | 非空 string，必填 | 全部；集合名称 |
| `headline/tagline/description/audience` | string / null | 全部；标题、辅助文案、描述及受众 |
| `tags` | string array，省略为空 | 全部；集合分类信息 |
| `icon/cover` | string / null | 身份图标与集合列表封面 |
| `route.path` | string，省略由 profile 与 ID 派生 | 集合路径，规范化为相对路径 |
| `route.start` | string / null | 仅 Topic，入口文章 |
| `navigation.tree` | array / object | 仅 Wiki，页面键列表或分组树 |
| `listing.priority` | 非负整数 / null | 仅 Wiki 集合；在支持置顶的列表中使用 |
| `listing.order` | 非负整数 / null | Wiki、Notebook；当前 Wiki 书架另按 shelf 顺序 |
| `listing.excerpt_length` | 非负整数 / null | Topic、Notebook，0 关闭自动摘要 |
| `listing.per_page` | 非负整数 / null | 仅 Notebook，0 不分页，null 继承 Hexo |
| `listing.sort.field/direction` | date/updated/title；asc/desc，可省略 | Topic、Notebook；默认分别 date desc、updated desc |
| `visibility.listed/searchable` | boolean，默认 true | 全部；控制集合上架及成员的列表／搜索默认值，不删除路由 |

没有集合封面时不跨字段使用 `icon` 或横幅补齐；成员文章的根级 `cover/tagline` 也不继承集合对应字段。

## Hero 与横幅

`hero` 仅用于 Wiki：

| 字段 | 类型与用途 |
| :--- | :--- |
| `hero.enabled` | boolean / null，是否启用首页 Hero |
| `hero.background.image` | string / null，背景图片 |
| `hero.background.effect` | object / null；`type` 为 `ferrofluid`、`galaxy` 或 `light-rays`，`options` 为对应效果参数 |
| `hero.background.effect.runtime` | `pause_when_hidden/respect_reduced_motion` 可选 boolean，均默认 true |
| `hero.preview.type` | terminal / image |
| `hero.preview.src/alt` | 图片地址与替代文字 |
| `hero.preview.commands` | 数组，条目 `label/codes` |
| `hero.actions` | 数组，条目 `title/url/icon` |

Wiki、Topic、Notebook 等集合都支持内容横幅 `banner.enabled/image/avatar/headline/tagline`，分别是 boolean/null 与 string/null。页面按字段覆盖集合横幅。Hero、集合封面、图标与内容横幅互不替代。

### Hero 背景效果

`hero.background.image` 与动态效果可以同时配置：图片位于 Canvas 下方，动态效果加载失败时仍保留图片。没有图片时，Galaxy 和普通 Light Rays 使用黑色静态底色，Ferrofluid 使用其 `backgroundColor`；`lightMode: true` 的 Light Rays 使用白色底色。Canvas 不接收指针事件，不会遮挡 Hero 中的链接和按钮。

#### Ferrofluid

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: ferrofluid
      options:
        colors: ['#ffffff', '#06B6D4', '#E0F2FE']
        backgroundColor: '#03010A'
        speed: 0.5
        flowDirection: down
        mouseInteraction: true
```

| 参数 | 类型／默认 | 用途 |
| :--- | :--- | :--- |
| `colors` | 十六进制颜色数组，`['#ffffff', '#ffffff', '#ffffff']` | 按流体表面高度分配的颜色，支持 1–8 项；单色会统一整个效果 |
| `backgroundColor` | 六位十六进制颜色，`#03010A` | 无背景图片时的静态底色与文字自适应取色基准 |
| `speed` | number，0.5 | 流体运动速度倍率 |
| `scale` | number，1.6 | 整体特征尺寸；数值越大，显示的流体块越大、数量越少 |
| `turbulence` | number，1 | 流动区域的扭曲程度 |
| `fluidity` | number，0.1 | 两层流体之间的融合平滑度 |
| `rimWidth` | number，0.2 | 发光轮廓宽度 |
| `sharpness` | number，2.5 | 轮廓高光对比度 |
| `shimmer` | number，1.5 | 轮廓颗粒与断裂强度；0 表示平滑线条 |
| `glow` | number，2 | 轮廓整体亮度倍率 |
| `flowDirection` | string，`down` | 主要流动方向：`up`、`down`、`left`、`right` |
| `opacity` | number，1 | Canvas 输出透明度 |
| `mouseInteraction` | boolean，true | 是否响应鼠标并在指针附近产生磁性扰动 |
| `mouseStrength` | number，1 | 鼠标扰动强度 |
| `mouseRadius` | number，0.35 | 鼠标扰动的衰减半径 |
| `mouseDampening` | number，0.15 | 鼠标跟随缓动时间常数，单位为秒；0 表示立即跟随 |
| `paused` | boolean，false | 是否绘制初始帧后停止 WebGL 更新 |
| `dpr` | positive number / null，null | Canvas 像素密度；null 或省略时使用设备 DPR |
| `mixBlendMode` | string / null，null | 应用于 Canvas 的 CSS `mix-blend-mode` 值，例如 `screen` 或 `lighten` |

颜色可省略开头的 `#`；在 YAML 中使用带 `#` 的颜色时需要加引号。React 组件专用的 `className` 不属于主题配置。

#### Light Rays

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: light-rays
      options:
        raysOrigin: top-center
        raysColor: '#00ffff'
        raysSpeed: 1.5
        lightSpread: 0.8
        rayLength: 1.2
        followMouse: true
        mouseInfluence: 0.1
        noiseAmount: 0.1
        distortion: 0.05
```

| 参数 | 类型／默认 | 用途 |
| :--- | :--- | :--- |
| `raysOrigin` | string，`top-center` | 光源方向：`top-left`、`top-center`、`top-right`、`left`、`right`、`bottom-left`、`bottom-center`、`bottom-right` |
| `raysColor` | 六位十六进制颜色，`#ffffff` | 光束颜色；`#` 可省略，在 YAML 中带 `#` 时需要加引号 |
| `raysSpeed` | number，1 | 光束变化速度 |
| `lightSpread` | number，0.5 | 光束扇面的扩散程度 |
| `rayLength` | number，3 | 光束延伸距离 |
| `pulsating` | boolean，false | 是否加入周期性明暗脉冲 |
| `fadeDistance` | number，1 | 光束随距离淡出的范围 |
| `saturation` | number，1 | 光束颜色饱和度 |
| `followMouse` | boolean，true | 是否让光束方向跟随鼠标 |
| `mouseInfluence` | number，0.1 | 鼠标对光束方向的影响强度 |
| `noiseAmount` | number，0 | 光束中的噪声强度 |
| `distortion` | number，0 | 光束路径的波动和扭曲强度 |
| `lightMode` | boolean，false | 使用适合浅色背景的深色光束表现 |

#### Galaxy

```yaml blog/source/_data/wiki/handbook.yml
hero:
  enabled: true
  background:
    effect:
      type: galaxy
      options:
        starSpeed: 2
        hueShift: 140
        mouseInteraction: true
```

| 参数 | 类型／默认 | 用途 |
| :--- | :--- | :--- |
| `focal` | number array，`[0.5, 0.5]` | 星河透视焦点 |
| `rotation` | number array，`[1, 0]` | 星河旋转向量 |
| `starSpeed` | number，2 | 星点纵深移动速度 |
| `density` | number，2 | 星点密度 |
| `hueShift` | number，140 | 色相偏移角度 |
| `disableAnimation` | boolean，false | 固定在初始画面 |
| `speed` | number，0.5 | 整体动画速度 |
| `mouseInteraction` | boolean，true | 是否响应鼠标移动 |
| `glowIntensity` | number，0.2 | 星点辉光强度 |
| `saturation` | number，0.1 | 星点颜色饱和度 |
| `mouseRepulsion` | boolean，true | 鼠标是否排斥附近星点 |
| `repulsionStrength` | number，0.1 | 鼠标排斥强度 |
| `twinkleIntensity` | number，0.1 | 星点闪烁强度 |
| `rotationSpeed` | number，0.1 | 自动旋转速度 |
| `autoCenterRepulsion` | number，0 | 中心自动排斥强度 |
| `transparent` | boolean，true | 是否使用透明 Canvas；false 时会覆盖背景图片 |

三种效果都支持运行时策略：

```yaml blog/source/_data/wiki/handbook.yml
hero:
  background:
    effect:
      type: light-rays
      runtime:
        pause_when_hidden: true
        respect_reduced_motion: true
```

`pause_when_hidden` 控制 Hero 离开视口或页面进入后台时是否暂停；`respect_reduced_motion` 控制系统请求减少动态效果时是否停止加载。两项默认都是 true。效果参数中的未知字段、错误类型、非法方向或颜色，以及 Ferrofluid 超过八项的颜色数组或非正数 DPR，都会在构建期报错。

## Region 与 Brand

顶部栏、左侧栏、右侧栏（Region）使用 `enabled/widgets`，Topbar 和 Leftbar 还支持 `brand/menu`，Leftbar 支持 `footer.actions`。它们沿用[主题结构](/wiki/stellar/reference/theme/#布局、Brand-与导航)，但作为局部覆盖：省略继承，数组整体替换，`[]` 清空。

Collection 的 `leftbar.brand` 额外支持 `source: site/collection`、`back_button`、`search`。Wiki/Notebook 默认来源是 collection，Topic 默认 site；返回与集合搜索开关只在 collection 来源有效。`style: regular/compact` 与来源独立。Brand 整体可为 false 或 null；null 继承，false 隐藏。具体字段 null 隐藏对应内容。

## 成员默认值

| 配置域 | 字段 | 来源与默认 |
| :--- | :--- | :--- |
| 导航 | `active_menu`、`breadcrumb` | 菜单 ID/null、boolean/null；导航按页面类型及集合上下文生成 |
| 排版 | `article.style/paragraph_indent/author/ai_label` | 继承主题排版；作者/AI 标记由集合或页面指定 |
| 页脚 | `footer.references/license/share/show_tags` | 许可协议和标签继承 Article；分享默认关闭；页面可覆盖 |
| 评论 | `comments.enabled/title/id/provider/options` | 继承全局服务，可按集合或页面替换 |
| 源码 | `source.repository/branch` | string/null；GitHub owner/repo 与分支 |
| 可见性 | `visibility.listed/searchable` | Collection 值是成员默认；Page 可再覆盖 |

具体取值见 [Front Matter](/wiki/stellar/reference/front-matter/)，它与 Collection 共用这些内容覆盖结构。对象逐字段覆盖并不意味着所有 null 都有相同效果，详见[行为规则](/wiki/stellar/reference/behavior/#配置覆盖顺序与空值)。

Wiki、Topic、Notebook Collection 的 `footer.share` 默认关闭。设置 `true` 会恢复全局 `article.footer.share`，数组显式选择服务，`false` 或 `[]` 关闭；许可协议同样可用 `true` 恢复全局 Article 文案。Collection 的 `visibility.listed: false` 会隐藏集合总入口，并成为成员页的默认列表状态；`searchable: false` 成为成员页的默认搜索状态。页面可以显式改回 `true`，详情路由仍然生成。

## 各集合类型支持的功能

| Profile | Collection 专属能力 | 成员页面可置顶 |
| :--- | :--- | :--- |
| Wiki | Hero、目录树、listing.priority/order | 否 |
| Topic | route.start、listing.excerpt_length/sort | 是 |
| Notebook | listing.order/excerpt_length/per_page/sort | 是 |

配置项需要符合所属集合类型。例如，Notebook 不能使用 Wiki 的 Hero；即使 YAML 格式正确，Doctor 和站点生成仍会报错。`visibility` 是三类 Collection 的共享字段；`render`、`seo`、`inject` 只能写在页面中。
