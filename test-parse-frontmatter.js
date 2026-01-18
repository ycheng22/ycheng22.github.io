// Test the complete parseFrontmatter logic

function parseFrontmatter(content) {
  const metadata = {};
  const lines = content.split('\n');

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) return; // Skip empty lines

    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();
      const cleanKey = key.toLowerCase();

      switch (cleanKey) {
        case 'title':
          metadata.title = value.replace(/['"]/g, '');
          break;
        case 'description':
          metadata.description = value.replace(/['"]/g, '');
          break;
        case 'date':
          metadata.date = value.replace(/['"]/g, '');
          break;
        case 'tags':
          // Handle JSON array format: ["tag1", "tag2"] or comma-separated string: tag1, tag2
          const trimmedValue = value.trim();
          if (trimmedValue.startsWith('[') && trimmedValue.endsWith(']')) {
            // JSON array format
            try {
              metadata.tags = JSON.parse(trimmedValue);
            } catch (e) {
              console.warn('Failed to parse tags as JSON:', trimmedValue, e);
              // Fallback to comma-separated parsing if JSON parse fails
              metadata.tags = trimmedValue
                .replace(/[\[\]'"]/g, '')
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
            }
          } else {
            // Comma-separated string format
            metadata.tags = value
              .replace(/['"]/g, '')
              .split(',')
              .map((tag) => tag.trim())
              .filter((tag) => tag.length > 0);
          }
          break;
        case 'pinned':
          // Handle boolean: true, false, "true", "false", True, False, etc.
          const normalizedValue = value.replace(/['"]/g, '').toLowerCase().trim();
          metadata.pinned = normalizedValue === 'true';
          break;
        case 'author':
          metadata.author = value.replace(/['"]/g, '');
          break;
      }
    }
  });

  return metadata;
}

const frontmatterContent = `title: "Machine Learning for Credit Risk Assessment: A Practical Approach"
description: "Exploring how machine learning algorithms can be used to predict credit default risk, with practical implementation examples and performance comparisons."
date: "2023-12-20"
tags: ["machine-learning", "credit-risk", "python", "data-science", "finance"]
pinned: false
author: "Cheng"`;

const result = parseFrontmatter(frontmatterContent);
console.log('Parsed metadata:', JSON.stringify(result, null, 2));
