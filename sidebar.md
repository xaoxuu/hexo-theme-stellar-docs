---
date: 2023-12-06 21:55
updated: 2026-08-30 12:13
title: Region 与 Leftbar 配置
collection:
  profile: wiki
  id: hexo-stellar
---

Stellar v2 使用 `topbar`、`leftbar`、`rightbar` 三个可组合 Region。它们可以单独存在，也可以同时存在：极简站点可以只保留 Topbar，经典博客可以只使用 Leftbar，文档站则可以同时使用顶部主导航、左侧文档树和正文右侧目录。

首页固定使用标准文章 Feed。`appearance.preset` 是整站唯一表面风格入口，Topbar、Leftbar、Rightbar 与通用内容表面会使用同一风格；Leftbar 不再单独维护表面样式。`flat` 保留调整前 Topbar 的半透明、轻模糊与分隔线视觉。

## 站点配置

```yaml blog/_config.stellar.yml
appearance:
  preset: card # card | flat | glass | minimal；整站统一

layout:
  regions:
    topbar:
      widgets: []
    leftbar:
      default_state: expanded # expanded | collapsed
      widgets: [brand, search, menu, actions]
    rightbar:
      widgets: []

  profiles:
    post:
      regions:
        leftbar:
          widgets: [related, recent]
        rightbar:
          widgets: [ghrepo, toc]
```

`leftbar.default_state` 只允许配置在站点级 `layout.regions.leftbar`。最终 Widget 为空时，主题不会生成对应 Region。

Region 也接受数组简写，空键或对象中的空子字段会被当作未配置：

```yaml
layout:
  regions:
    topbar: [brand, search, menu, actions]
    leftbar:
    rightbar: [toc]
```

## Region 级联

最终 Widget 顺序按以下层级解析：

1. 站点全局 `layout.regions`
2. 页面类型 `layout.profiles.<profile>.regions`
3. Wiki、专栏或笔记本 YAML 中的 `regions`
4. 页面 Front Matter 中的 `regions`

每层默认 `inherit: true`，会把本层 `widgets` 追加到已有数组。若要替换已有内容，显式使用 `inherit: false`：

```yaml
regions:
  leftbar:
    inherit: false
    widgets: [tree]
  rightbar:
    widgets: [ghrepo, toc]
```

主题不会自动去重、排序或把 Widget 移到其它 Region。Notebook 的 Note 默认布局使用同形的 `note_defaults.regions`。

## 系统 Widget

以下固定站点元素也是 Widget，可以由用户决定摆放位置：

- `brand`：使用 `site.brand`；Wiki 与 Notebook 可从项目 Identity 生成默认 Brand。
- `menu`：使用 `site.menu` 和当前页面的菜单高亮。
- `search`：使用 `extensions.search`，并保留 Wiki/Notebook 搜索范围。
- `actions`：使用 `site.footer.actions`。
- `wiki_home`：返回 Wiki 总索引。

移动 Widget 只改变位置，不需要复制业务配置。例如 Topbar-only 站点：

```yaml
layout:
  regions:
    topbar:
      widgets: [brand, menu, search, actions]
    leftbar:
      widgets: []
    rightbar:
      widgets: []
  profiles:
    home:
      regions:
        leftbar:
          inherit: false
          widgets: []
    blog_index:
      regions:
        leftbar:
          inherit: false
          widgets: []
```

全局空数组不会清除 Profile 追加的 Widget。要实现真正的 Topbar-only，还需要在会追加 Leftbar Widget 的 Profile 中使用 `inherit: false`。上例同时覆盖首页的 `home` 和分页列表的 `blog_index`。

文档站可以同时使用三个 Region：

```yaml
layout:
  profiles:
    wiki:
      regions:
        topbar:
          widgets: [brand, menu, search, actions]
        leftbar:
          inherit: false
          widgets: [wiki_home, tree]
        rightbar:
          widgets: [ghrepo, toc]
```

## Widget 的位置能力

不同 Widget 支持的位置不同：

| Widget 类型 | Topbar | Leftbar | 折叠 Rail | Rightbar | Drawer |
| :-- | :--: | :--: | :--: | :--: | :--: |
| Brand、Menu、Search、Actions | ✓ | ✓ | ✓ |  | ✓ |
| TOC | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tree、Tagtree |  | ✓ | ✓ | ✓ | ✓ |
| Recent、Related、GitHub、Author |  | ✓ |  | ✓ | ✓ |
| Timeline、Markdown |  | ✓ |  | ✓ | ✓ |

未声明能力的自定义 Widget 默认支持 Leftbar、Rightbar 和 Drawer，不支持 Topbar 或折叠 Rail。主题不会为丰富 Widget 自动生成 Topbar Popover。

如果把 Widget 放在不支持的位置，Doctor 和构建日志会给出 Widget、layout、目标 Region 与支持列表。该实例会被跳过，但不会中断构建；只有 warning 时 Doctor 的 `ok` 仍为 `true`。

## Leftbar 折叠与移动端

桌面 Leftbar 可以折叠为仅图标的窄 Rail。折叠后只显示支持 `leftbarRail` 的 Widget；Timeline、Markdown 等面板内容会隐藏到重新展开。折叠状态保存在浏览器中，并在首屏布局前恢复。

桌面宽度不足时 Main 会先收缩，不产生横向滚动。`769–1180px` 先把 Rightbar 转为 Drawer并保留 Leftbar；`≤768px` 再把 Leftbar 也转为 Drawer。Rightbar 桌面态随正文滚动，只有 TOC 保持 Sticky。

Drawer 复用原 Region 节点，不复制 Widget DOM。Escape 可以关闭 Drawer，焦点会回到触发按钮；关闭的 Drawer 使用 `inert`，减少动画偏好会关闭布局过渡。

## Brand 与搜索配置

Brand 的业务数据统一写在站点配置中：

```yaml
site:
  brand:
    image:
      src: https://example.com/icon.svg
      variant: icon # avatar | icon | plain
      href: /
    name: Stellar
    wordmark:
    tagline:
      text: 每个人的独立博客
      hover:
    href: /
```

站内搜索 Provider 继续配置在 `extensions.search`。Region 中只放置 `search` Widget，不复制 Provider 或索引配置。

## 从旧字段迁移

v2 预发布字段不会继续作为运行时别名：

| 旧写法 | 新写法 |
| :-- | :-- |
| `sidebar.left.widgets` | `regions.leftbar.widgets` |
| `sidebar.right.widgets` | `regions.rightbar.widgets` |
| Profile 的 `sidebar.left/right` | Profile 的 `regions.leftbar/rightbar.widgets` |
| `layout.regions.sidebar/context` | `layout.regions.leftbar/rightbar` |
| `sidebarRail` | `leftbarRail` |
| `appearance.backgrounds.sidebar` | `appearance.backgrounds.leftbar` |
| `note_defaults.sidebar` | `note_defaults.regions` |
| `sidebar.left.search/menu/wiki_home` | 在目标 Region 的 `widgets` 中放置系统 Widget |
| `sidebar.left.brand` | 业务数据改到 `site.brand`，Region 中放置 `brand` |
| `appearance.backgrounds.sidebar.surface` | `appearance.preset`；改为整站统一表面风格 |

Doctor 会直接拒绝旧字段并给出迁移位置。Blueprint `classic-blog` 已更名为 `classic`，Visual Style `stellar` 已更名为 `card`，均不保留别名。

完整字段类型与默认值以主题生成的 v2 Config Reference 为准。
