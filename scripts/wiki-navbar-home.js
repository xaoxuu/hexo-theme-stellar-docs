/* global hexo */
'use strict';

// Wiki 封面导航栏左上角的站点名链接，主题模板里写的是站内根路径（pretty_url('/')）。
// 主站用它是正确的，但文档站挂在 /wiki/stellar/ 下，同一份模板会让它指向文档首页
// 而不是主站。按站点要求固定为主站地址。
const HOME = 'https://xaoxuu.com';

hexo.extend.filter.register('after_render:html', function (html) {
  if (!html.includes('wiki-navbar-home')) return html;
  return html.replace(/<a\b[^>]*class="[^"]*\bwiki-navbar-home\b[^"]*"[^>]*>/g, tag =>
    tag.replace(/href="[^"]*"/, `href="${HOME}"`)
  );
}, 9000);
