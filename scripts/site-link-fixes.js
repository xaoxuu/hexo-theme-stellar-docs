/* global hexo */
'use strict';

// 文档站挂在主站的 /wiki/stellar/ 子路径下，主题里有几处「站点自身链接」是按
// root 为 / 的前提写的，在这里按本站情况修正，避免生成坏地址：
//
// 1. 文章横幅的面包屑「主页」：模板用 pretty_url(config.root)，而 pretty_url 内部
//    还会再走一次 url_for，root 被叠加两次变成 /wiki/stellar/wiki/stellar/。
//    该地址还会被 link_prefetch（flying-pages）预取，控制台因此出现 404。
// 2. Wiki 封面导航栏的站点名链接：模板写的是站内根路径 pretty_url('/')，
//    在文档站会指向文档首页；本站要求它固定指向主站。
const HOME = 'https://xaoxuu.com';
const ROOT = '/wiki/stellar/';

hexo.extend.filter.register('after_render:html', function (html) {
  let out = html;
  // 1. 折叠重复叠加的 root
  const doubled = `${ROOT}${ROOT.slice(1)}`;
  if (out.includes(doubled)) {
    out = out.split(doubled).join(ROOT);
  }
  // 2. 导航栏站点名链接固定指向主站
  if (out.includes('wiki-navbar-home')) {
    out = out.replace(/<a\b[^>]*class="[^"]*\bwiki-navbar-home\b[^"]*"[^>]*>/g, tag =>
      tag.replace(/href="[^"]*"/, `href="${HOME}"`)
    );
  }
  return out;
}, 9000);
