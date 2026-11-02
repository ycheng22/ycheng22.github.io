// Frontmatter parsing for blog posts in blogs-repo/.
// Ported from the former BlogService.parseFrontmatter so the build and the app agree.

function unquote(value) {
  const v = value.trim();
  const first = v[0];
  if ((first === '"' || first === "'") && v.endsWith(first) && v.length >= 2) {
    return v.slice(1, -1);
  }
  return v;
}

function toBool(value) {
  return unquote(value).toLowerCase() === 'true';
}

function parseTags(value) {
  // Accepts ["a", "b"], ['a', 'b'] or a, b
  return value
    .trim()
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((tag) => unquote(tag))
    .filter((tag) => tag.length > 0);
}

function parseFields(text) {
  const data = {};
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    const colon = line.indexOf(':');
    if (colon <= 0) continue;

    const key = line.substring(0, colon).trim().toLowerCase();
    const value = line.substring(colon + 1).trim();

    switch (key) {
      case 'title':
      case 'description':
      case 'date':
      case 'author':
      case 'background':
        data[key] = unquote(value);
        break;
      case 'tags':
        data.tags = parseTags(value);
        break;
      case 'pinned':
        data.pinned = toBool(value);
        break;
      case 'showbackground':
        data.showBackground = toBool(value);
        break;
      case 'isnotebook':
        data.isNotebook = toBool(value);
        break;
      case 'numberoflike':
        data.numberOfLike = parseInt(unquote(value), 10) || 0;
        break;
    }
  }
  return data;
}

/**
 * Split a markdown file into frontmatter fields and body.
 * Handles CRLF line endings and files without frontmatter.
 * @param {string} raw
 * @returns {{ data: object, body: string }}
 */
function parseFrontmatter(raw) {
  const lines = raw.split(/\r?\n/);
  if (lines[0].trim() !== '---') {
    return { data: {}, body: lines.join('\n') };
  }
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (end < 0) {
    return { data: {}, body: lines.join('\n') };
  }
  return {
    data: parseFields(lines.slice(1, end).join('\n')),
    body: lines.slice(end + 1).join('\n'),
  };
}

module.exports = { parseFrontmatter };
