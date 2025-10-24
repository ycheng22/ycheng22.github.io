# Sample Blog Posts

This directory contains sample blog posts that demonstrate the format and structure for your personal website's blog system.

## Blog Post Format

Each markdown file should follow this structure:

```markdown
---
title: "Your Blog Post Title"
description: "A compelling description that will appear in previews and search results"
date: "2024-01-15"
tags: ["angular", "typescript", "web-development"]
pinned: true
author: "Cheng"
---

# Your Blog Post Title

Write your blog post content here using standard markdown syntax...
```

## Frontmatter Fields

- `title`: The main title of your blog post
- `description`: Brief description for previews and SEO
- `date`: Publication date in YYYY-MM-DD format
- `tags`: Array of relevant tags for categorization
- `pinned`: Set to `true` to feature this post on the home page
- `author`: Your name

## Sample Posts Included

1. **Building Micro-Frontends with Angular** - Technical deep dive into micro-frontend architecture
2. **AWS Solutions Architect Certification Journey** - Personal experience and study tips
3. **From Physics to Software Engineering** - Career transition story
4. **Building Real-Time Performance Dashboards** - Full-stack development tutorial
5. **Machine Learning for Credit Risk Assessment** - Data science and ML implementation

## Setting Up Your Blog Repository

1. Create a new GitHub repository (e.g., `blog-posts`)
2. Upload these sample markdown files
3. Update the blog service configuration in your website:
   ```typescript
   // src/app/services/blog.service.ts
   private readonly BLOG_REPO_OWNER = 'your-github-username';
   private readonly BLOG_REPO_NAME = 'blog-posts';
   ```
4. Your website will automatically fetch and display the blog posts

## Best Practices

- Use descriptive filenames (kebab-case)
- Include relevant tags for better categorization
- Write engaging descriptions for SEO
- Use proper markdown formatting
- Include code examples with syntax highlighting
- Add images using standard markdown syntax

## Content Ideas

- Technical tutorials and guides
- Career experiences and lessons learned
- Project showcases and case studies
- Industry insights and trends
- Personal development and learning
- Book reviews and recommendations
- Conference talks and presentations

Happy blogging! 🚀
