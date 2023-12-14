---
layout: wiki
wiki: hexo-stellar
title: 使用「memos」极简版
---

需要有自己的 memos 账号，可以在别人部署的 memos 上注册，或者自建 memos 服务，详见官方文档：

{% link https://usememos.com %}

## 作为侧边栏组件使用

### 创建个人的 memos 时间线组件

```yaml blog/source/_data/widgets.yml
timeline:
  layout: timeline
  title: 近期动态
  api: https://memos.xaox.cc/api/v1/memo?creatorId=1&limit=10
  type: memos
  hide: user,footer
```

### 创建多人的 memos 时间线组件

```yaml blog/source/_data/widgets.yml
timeline:
  layout: timeline
  title: 近期动态
  api: https://s.dusays.com/api/v1/memo/all?limit=10
  type: memos
  hide: footer
```

## 作为标签组件使用

### 创建个人的 memos 时间线组件

```
{% timeline api:https://memos.xaox.cc/api/v1/memo?creatorId=1&limit=10 type:memos avatar:/assets/xaoxuu/avatar/rect-256@2x.png %}
{% endtimeline %}
```

{% timeline api:https://memos.xaox.cc/api/v1/memo?creatorId=1&limit=10 type:memos avatar:/assets/xaoxuu/avatar/rect-256@2x.png %}
{% endtimeline %}

### 创建多人的 memos 时间线组件

```
{% timeline api:https://s.dusays.com/api/v1/memo/all?limit=10 type:memos %}
{% endtimeline %}
```

{% timeline api:https://s.dusays.com/api/v1/memo/all?limit=10 type:memos %}
{% endtimeline %}