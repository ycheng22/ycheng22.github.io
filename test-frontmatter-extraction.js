// Test frontmatter extraction

const markdown = `---
title: "Machine Learning for Credit Risk Assessment: A Practical Approach"
description: "Exploring how machine learning algorithms can be used to predict credit default risk, with practical implementation examples and performance comparisons."
date: "2023-12-20"
tags: ["machine-learning", "credit-risk", "python", "data-science", "finance"]
pinned: false
author: "Cheng"
---

# Machine Learning for Credit Risk Assessment: A Practical Approach

Some content here...`;

const lines = markdown.split('\n');
console.log('Total lines:', lines.length);
console.log('First line:', JSON.stringify(lines[0]));
console.log('Is first line "---"?:', lines[0] === '---');

const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
console.log('Frontmatter end index:', frontmatterEnd);

if (frontmatterEnd > 0) {
  const frontmatterLines = lines.slice(1, frontmatterEnd);
  console.log('Frontmatter lines:');
  frontmatterLines.forEach((line, idx) => {
    console.log(`  [${idx}]: ${JSON.stringify(line)}`);
  });

  const frontmatterContent = frontmatterLines.join('\n');
  console.log('\nFrontmatter content:');
  console.log(frontmatterContent);
}
