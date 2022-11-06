---
layout: wiki
wiki: Stellar
order: 1000
title: 感谢开发者和点赞名单
---

{% tabs align:left %}

<!-- tab 开发者 -->
{% users api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/contributors?per_page=100&direction=asc %}

<!-- tab 点赞的用户 -->
{% quot icon:hashtag 1-100 %}
{% users api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/stargazers?per_page=100&page=1 %}
{% quot icon:hashtag 101-200 %}
{% users api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/stargazers?per_page=100&page=2 %}
{% quot icon:hashtag 201-300 %}
{% users api:https://api.github.com/repos/xaoxuu/hexo-theme-stellar/stargazers?per_page=100&page=3 %}

{% endtabs %}

{% image https://api.star-history.com/svg?repos=xaoxuu/hexo-theme-stellar&type=Date %}