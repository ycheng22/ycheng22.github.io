const fs = require('fs');
const path = require('path');

const BLOGS_DIR = path.join(__dirname, '..', 'blogs-repo');
const INDEX_FILE = path.join(BLOGS_DIR, 'index.json');

function generateIndex() {
  if (!fs.existsSync(BLOGS_DIR)) {
    console.error(`Blogs directory not found: ${BLOGS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOGS_DIR)
    .filter(f => f.toLowerCase().endsWith('.md'))
    // Exclude README.md (case-insensitive)
    .filter(f => f.toLowerCase() !== 'readme.md')
    .sort();

  const index = files.map(name => ({ name }));

  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2) + '\n', 'utf8');
  console.log(`Generated ${INDEX_FILE} with ${index.length} entries.`);
}

if (require.main === module) {
  generateIndex();
} else {
  module.exports = { generateIndex };
}
