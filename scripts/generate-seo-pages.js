// Postbuild: write crawlable HTML shells and SEO files into dist/.
// Each route gets a copy of index.html with its own <title>, description, canonical and Open Graph tags,
// so link previews and crawlers see the right metadata before the Angular app boots.
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://ycheng22.github.io';
const SITE_NAME = 'Cheng';
const DIST = path.join(__dirname, '..', 'dist');
const INDEX_JSON = path.join(__dirname, '..', 'blogs-repo', 'index.json');
const DEFAULT_BACKGROUND = '/blogs-repo/images/default_img.png';
const FEED_SIZE = 20;

const escapeHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const absoluteUrl = (p) => (/^https?:\/\//.test(p) ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${p}`);

// Encode each path segment (slugs may contain spaces)
const postPath = (slug) => `/blog/${encodeURIComponent(slug)}/`;

const isoDate = (d) => {
  const date = new Date(d);
  return isNaN(date) ? null : date.toISOString().slice(0, 10);
};

function seoBlock({ title, description, url, type = 'website', image }) {
  const tags = [
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(url)}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(url)}">`,
  ];
  if (image) tags.push(`<meta property="og:image" content="${escapeHtml(image)}">`);
  tags.push(`<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">`);
  return `<!-- seo:start -->\n  ${tags.join('\n  ')}\n  <!-- seo:end -->`;
}

function renderPage(template, meta) {
  if (!/<!-- seo:start[\s\S]*?<!-- seo:end -->/.test(template)) {
    throw new Error('dist/index.html is missing the <!-- seo:start --> ... <!-- seo:end --> block');
  }
  return template
    // Function replacers so "$" in titles/descriptions is never read as a replacement pattern
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, () => seoBlock(meta))
    .replace(/\s*<!-- jsonld:start[\s\S]*?<!-- jsonld:end -->/, () => '');
}

function writeFile(relPath, content) {
  const file = path.join(DIST, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function sitemap(posts) {
  const urls = [
    { loc: `${SITE_URL}/` },
    { loc: `${SITE_URL}/blog/`, lastmod: posts.map((p) => isoDate(p.date)).filter(Boolean).sort().pop() },
    ...posts.map((p) => ({ loc: `${SITE_URL}${postPath(p.slug)}`, lastmod: isoDate(p.date) })),
  ];
  const body = urls
    .map((u) => `  <url>\n    <loc>${escapeHtml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function rss(posts) {
  const latest = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, FEED_SIZE);
  const items = latest
    .map((p) => {
      const link = `${SITE_URL}${postPath(p.slug)}`;
      const date = new Date(p.date);
      return [
        '    <item>',
        `      <title>${escapeHtml(p.title)}</title>`,
        `      <link>${escapeHtml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeHtml(link)}</guid>`,
        isNaN(date) ? null : `      <pubDate>${date.toUTCString()}</pubDate>`,
        `      <description>${escapeHtml(p.description)}</description>`,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Cheng's Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Notes on software, data, cloud, and AI engineering.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function main() {
  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const posts = JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8'));

  writeFile(
    'blog/index.html',
    renderPage(template, {
      title: `Blog — ${SITE_NAME}`,
      description: 'Technical blog posts by Cheng on software, data, cloud, and AI engineering.',
      url: `${SITE_URL}/blog/`,
    }),
  );

  for (const post of posts) {
    const hasImage = post.background && post.background !== DEFAULT_BACKGROUND;
    writeFile(
      path.join('blog', post.slug, 'index.html'),
      renderPage(template, {
        title: `${post.title} — ${SITE_NAME}`,
        description: post.description,
        url: `${SITE_URL}${postPath(post.slug)}`,
        type: 'article',
        image: hasImage ? absoluteUrl(post.background) : undefined,
      }),
    );
  }

  // GitHub Pages serves 404.html for unknown paths; the app then shows its own not-found page
  writeFile('404.html', template.replace(/\s*<!-- jsonld:start[\s\S]*?<!-- jsonld:end -->/, () => ''));
  writeFile('sitemap.xml', sitemap(posts));
  writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  writeFile('feed.xml', rss(posts));

  console.log(`SEO: wrote ${posts.length} post pages, blog index, 404.html, sitemap.xml, robots.txt, feed.xml`);
}

main();
