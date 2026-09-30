/* global hexo */
'use strict';

// 站点自有的 URL 迁移。文档仓库持有唯一映射表（redirects.json）。
// 与主站版本的唯一差异：正文位于站点根目录，产物根就是 /wiki/stellar/，
// 因此生成路由时要剥掉对外前缀，否则会生成 .../wiki/stellar/wiki/stellar/... 的双重路径。
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('cheerio');

const PREFIX = '/wiki/stellar/';
const SCRIPT_ID = 'stellar-doc-redirect';
const mapFile = path.join(hexo.source_dir, 'redirects.json');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function routePath(url) {
  if (!url.startsWith(PREFIX)) {
    throw new Error(`Stellar docs: URL ${url} 不在 ${PREFIX} 前缀下`);
  }
  return `${url.slice(PREFIX.length)}index.html`;
}

function checkUrl(value) {
  if (typeof value !== 'string' || !value.startsWith(PREFIX)) {
    throw new Error(`Stellar docs: invalid migration URL ${value}`);
  }
  const parsed = new URL(value, 'https://docs.invalid');
  if (parsed.origin !== 'https://docs.invalid' || parsed.search ||
      !parsed.pathname.endsWith('/') || parsed.pathname !== value ||
      /[\\\s]/.test(parsed.pathname) || parsed.hash) {
    throw new Error(`Stellar docs: invalid migration URL ${value}`);
  }
}

function readMap() {
  const map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
  if (map.version !== 1 || !Array.isArray(map.entries)) throw new Error('Stellar docs: invalid redirect map');
  const sources = new Set();
  for (const entry of map.entries) {
    checkUrl(entry.from);
    checkUrl(entry.to);
    if (sources.has(entry.from)) throw new Error(`Stellar docs: duplicate source ${entry.from}`);
    sources.add(entry.from);
  }
  for (const entry of map.entries) {
    if (sources.has(entry.to)) {
      throw new Error(`Stellar docs: redirect chain or cycle ${entry.from} -> ${entry.to}`);
    }
  }
  return map.entries;
}

function redirectScript(entry) {
  const json = JSON.stringify({ to: entry.to })
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  return `<script id="${SCRIPT_ID}">(function () {
    var config = ${json};
    var target = new URL(config.to, location.href);
    target.search = location.search;
    if (target.href !== location.href) location.replace(target.href);
  }());</script>`;
}

function redirectPage(entry) {
  const canonical = new URL(entry.to, hexo.config.url).href;
  return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="robots" content="noindex,follow">' +
    `<link rel="canonical" href="${escapeHtml(canonical)}">` +
    '<title>文档已迁移 · Stellar</title>' + redirectScript(entry) +
    '</head><body><p>这份文档已迁移到 v2 文档的新位置。</p>' +
    `<p><a href="${escapeHtml(entry.to)}">打开新文档</a></p>` +
    '<noscript><p>浏览器未启用 JavaScript，请使用上方链接。</p></noscript>' +
    '</body></html>';
}

async function routeHtml(route) {
  const stream = hexo.route.get(route);
  if (!stream) throw new Error(`Stellar docs: missing route ${route}`);
  const chunks = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks).toString('utf8');
}

hexo.extend.generator.register('stellar-doc-redirects', function (locals) {
  const entries = readMap();
  const pages = new Set(locals.pages.toArray().map(page => page.path));
  return entries.map(entry => {
    const output = routePath(entry.from);
    if (pages.has(output)) throw new Error(`Stellar docs: redirect collides with a page ${output}`);
    return { path: output, data: redirectPage(entry) };
  });
});

hexo.extend.filter.register('after_generate', async function () {
  const entries = readMap();
  for (const target of new Set(entries.map(entry => entry.to))) {
    await routeHtml(routePath(target));
  }
  // Redirects are raw generator routes: they never become content/search/sitemap entries.
  for (const entry of entries) {
    const html = await routeHtml(routePath(entry.from));
    if (!load(html)(`#${SCRIPT_ID}`).length) {
      throw new Error(`Stellar docs: another generator overwrote ${entry.from}`);
    }
  }
});
