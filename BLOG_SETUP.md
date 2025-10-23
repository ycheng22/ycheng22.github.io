# Blog Repository Setup Guide

This guide explains how to set up your blog repository and create blog posts for your personal website.

## Repository Structure

Create a GitHub repository (e.g., `blog-posts`) with the following structure:

```
blog-posts/
├── README.md
├── getting-started-with-angular.md
├── my-journey-in-software-engineering.md
├── building-micro-frontends.md
└── aws-certification-experience.md
```

## Blog Post Format

Each markdown file should follow this structure:

```markdown
---
title: "Your Blog Post Title"
description: "A compelling description that will appear in previews and search results"
date: "2024-01-15"
tags: ["angular", "typescript", "web-development", "tutorial"]
pinned: true
author: "Cheng"
---

# Your Blog Post Title

Write your blog post content here using standard markdown syntax.

## Introduction

Start with an engaging introduction that hooks the reader.

## Main Content

Structure your content with clear headings and sections.

### Code Examples

```typescript
// Your code examples will be syntax highlighted
const example = 'Hello World';

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### Lists and Formatting

- Use bullet points for lists
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- `Inline code` for technical terms

## Conclusion

Wrap up your post with key takeaways and next steps.

## Call to Action

Encourage readers to engage with your content.
```

## Frontmatter Fields Explained

### Required Fields
- `title`: The main title of your blog post
- `description`: Brief description for previews and SEO
- `date`: Publication date in YYYY-MM-DD format
- `author`: Your name

### Optional Fields
- `tags`: Array of relevant tags for categorization
- `pinned`: Set to `true` to feature this post on the home page

## Best Practices

### File Naming
- Use kebab-case for filenames (e.g., `my-awesome-post.md`)
- Keep filenames descriptive but concise
- Avoid special characters and spaces

### Content Guidelines
- Write engaging, informative content
- Use proper markdown formatting
- Include code examples where relevant
- Add images using standard markdown syntax
- Keep paragraphs concise and readable

### SEO Optimization
- Write compelling titles and descriptions
- Use relevant tags
- Structure content with proper headings
- Include internal links where appropriate

## Example Blog Posts

### Getting Started Post
```markdown
---
title: "Getting Started with Angular 19"
description: "Learn the basics of Angular 19 and how to build your first application"
date: "2024-01-15"
tags: ["angular", "tutorial", "web-development"]
pinned: true
author: "Cheng"
---

# Getting Started with Angular 19

Angular 19 brings exciting new features and improvements...
```

### Technical Deep Dive
```markdown
---
title: "Building Micro-Frontends with Angular"
description: "A comprehensive guide to implementing micro-frontend architecture"
date: "2024-01-10"
tags: ["angular", "micro-frontends", "architecture"]
pinned: false
author: "Cheng"
---

# Building Micro-Frontends with Angular

Micro-frontends are becoming increasingly popular...
```

## Updating Your Website

After creating blog posts in your repository:

1. The website will automatically fetch new posts
2. Pinned posts will appear on the home page
3. All posts will be available on the blog page
4. Search and filtering will work with your content

## Troubleshooting

### Posts Not Appearing
- Check that your repository name matches the configuration
- Ensure markdown files have proper frontmatter
- Verify the GitHub API is accessible

### Formatting Issues
- Validate your markdown syntax
- Check that frontmatter is properly formatted
- Ensure code blocks are properly closed

### Performance
- Keep images optimized
- Use appropriate file sizes
- Consider lazy loading for long posts

## Need Help?

If you encounter issues:
1. Check the main README.md for configuration details
2. Verify your blog service settings
3. Test with a simple post first
4. Check browser console for errors

Happy blogging! 🚀

