/* global hexo */
'use strict';

// 文档站挂在主站的 /wiki/stellar/ 子路径下，而主题生成 canonical 时只拼接
// canonical.host 与页面自身的路径，不含站点的 root 前缀，因此在这里补齐。
//
// 不能把前缀写进 canonical.host：主题会把它的 base64 传给客户端，与
// location.hostname 比对来判断当前主机是否为主站，带路径会让所有页面被
// 误判为“非法克隆站”，并注入 noindex。
const PREFIX = '/wiki/stellar';

hexo.extend.filter.register('after_render:html', function (html) {
  if (!html.includes('rel="canonical"')) return html;
  return html.replace(/(<link rel="canonical" href=")([^"]+)(")/g, (matched, head, href, tail) => {
    let url;
    try {
      url = new URL(href);
    } catch (e) {
      return matched;
    }
    if (url.pathname === `${PREFIX}/` || url.pathname.startsWith(`${PREFIX}/`)) return matched;
    url.pathname = `${PREFIX}${url.pathname}`;
    return `${head}${url.href}${tail}`;
  });
}, 9000);
