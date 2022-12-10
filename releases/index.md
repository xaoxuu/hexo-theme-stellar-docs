---
layout: wiki
wiki: Stellar
order: 20
title: 更新日志和近期计划
---

版本命名规范：【大版本.小版本.修复版本】

- 大版本：较大范围改动和设计调整、重构
- 小版本：较小范围改动、增加删除功能，也可能包含部分修复
- 修复版本：仅包含修复，可放心无缝升级

{% ablock 如何关注主题更新 color:green %}
例如，您可以在自己博客任意位置用时间线标签显示主题最近一个版本更新内容：
```
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=1 %}
{% endtimeline %}
```

{% endablock %}

{% tabs align:left %}

<!-- tab 更新日志 -->
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/releases?per_page=10 %}
{% endtimeline %}

<!-- tab Todo -->
{% timeline api:https://api.github.xaox.cc/repos/xaoxuu/hexo-theme-stellar/issues?labels=todo&per_page=20 %}
{% endtimeline %}

{% endtabs %}



