const fs = require('fs');
const path = require('path');
const { parseFrontmatter } = require('./lib/frontmatter');

const BLOGS_DIR = path.join(__dirname, '..', 'blogs-repo');
const INDEX_FILE = path.join(BLOGS_DIR, 'index.json');
const DEFAULT_BACKGROUND = '/blogs-repo/images/default_img.png';
const DEFAULT_AUTHOR = 'Cheng';

function titleFromSlug(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

// Site-relative asset paths must start with "/" so they work from /blog/<slug>
function toAbsolute(url) {
  return /^(https?:)?\/\//.test(url) || url.startsWith('/') ? url : `/${url}`;
}

// First sentence(s) of the body, stripped of markdown, ~150 chars
function descriptionFromBody(body) {
  const clean = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#+\s+.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return '';
  let description = clean.substring(0, 150);
  const lastSentenceEnd = Math.max(
    description.lastIndexOf('.'),
    description.lastIndexOf('!'),
    description.lastIndexOf('?'),
  );
  return lastSentenceEnd > 50 ? description.substring(0, lastSentenceEnd + 1) : description + '...';
}

// Notebook posts keep their text in the .ipynb; the .md is only a frontmatter stub
function notebookText(slug) {
  const file = path.join(BLOGS_DIR, `${slug}.ipynb`);
  if (!fs.existsSync(file)) return { prose: '', all: '' };
  const cells = JSON.parse(fs.readFileSync(file, 'utf8')).cells || [];
  const text = (c) => [].concat(c.source || []).join('');
  return {
    prose: cells.filter((c) => c.cell_type === 'markdown').map(text).join('\n\n'),
    all: cells.map(text).join('\n\n'),
  };
}

function buildEntry(file) {
  const raw = fs.readFileSync(path.join(BLOGS_DIR, file), 'utf8');
  const { data, body } = parseFrontmatter(raw);
  const slug = file.replace(/\.md$/i, '');
  const nb = data.isNotebook ? notebookText(slug) : null;
  const title = data.title || titleFromSlug(slug);

  return {
    slug,
    file,
    title,
    description: data.description || descriptionFromBody(nb ? nb.prose : body) || title,
    date: data.date || fs.statSync(path.join(BLOGS_DIR, file)).mtime.toISOString().slice(0, 10),
    tags: data.tags || [],
    pinned: data.pinned || false,
    author: data.author || DEFAULT_AUTHOR,
    readingTime: Math.max(1, Math.ceil((nb ? nb.all : body).split(/\s+/).filter(Boolean).length / 200)),
    numberOfLike: data.numberOfLike || 0,
    background: data.background && !data.background.includes('default_img') ? toAbsolute(data.background) : DEFAULT_BACKGROUND,
    showBackground: data.showBackground || false,
    isNotebook: data.isNotebook || false,
  };
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function generateIndex() {
  if (!fs.existsSync(BLOGS_DIR)) {
    console.error(`Blogs directory not found: ${BLOGS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .filter((f) => f.toLowerCase() !== 'readme.md');

  const index = sortPosts(files.map(buildEntry));

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2) + '\n', 'utf8');
  console.log(`Generated ${INDEX_FILE} with ${index.length} entries.`);
}

if (require.main === module) {
  generateIndex();
} else {
  module.exports = { generateIndex };
}
