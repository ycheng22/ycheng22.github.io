# Cheng - Personal Website

A modern, responsive personal website built with Angular 20 and TailwindCSS, featuring a blog system that fetches content from a separate GitHub repository.

## 🚀 Features

- **Modern Design**: Clean, responsive design with TailwindCSS
- **Blog System**: Fetches markdown blog posts from a separate GitHub repository
- **GitHub-Style Markdown**: Renders markdown with syntax highlighting and GitHub-flavored markdown
- **Pinned Posts**: Support for featured/pinned blog posts
- **Search & Filter**: Search through blog posts and filter by pinned status
- **GitHub Pages Ready**: Configured for deployment to GitHub Pages
- **SEO Optimized**: Proper meta tags and structured data
- **Mobile First**: Responsive design that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Angular 20 with standalone components
- **Styling**: TailwindCSS with custom components
- **Markdown**: ngx-markdown with Prism.js syntax highlighting
- **Routing**: Angular Router with withHashLocation for GitHub Pages
- **Deployment**: GitHub Actions + GitHub Pages

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── navbar/         # Navigation component
│   │   ├── footer/        # Footer component
│   │   ├── blog-card/     # Blog post card component
│   │   └── blog-post/     # Individual blog post component
│   ├── pages/             # Page components
│   │   ├── home/          # Home page
│   │   ├── blog/          # Blog listing page
│   │   └── blog-post/     # Individual blog post page
│   ├── services/          # Angular services
│   │   └── blog.service.ts # Blog data service
│   ├── models/            # TypeScript interfaces
│   │   └── blog-post.model.ts
│   ├── app.component.ts   # Root component
│   └── app.routes.ts      # Application routes
├── styles.css             # Global styles and TailwindCSS
└── main.ts               # Application bootstrap
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ycheng22/ycheng22.github.io.git
cd ycheng22.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build:prod
```

## 📝 Blog Setup

### Creating a Blog Repository

1. Create a new GitHub repository for your blog posts (e.g., `blog-posts`)
2. Add markdown files with frontmatter metadata
3. Update the blog service configuration

### Blog Post Format

Create markdown files with the following frontmatter structure:

```markdown
---
title: "Your Blog Post Title"
description: "A brief description of your post"
date: "2024-01-15"
tags: ["angular", "typescript", "web-development"]
pinned: true
author: "Cheng"
---

# Your Blog Post Content

Write your blog post content here using standard markdown syntax.

## Code Examples

```typescript
// Your code examples will be syntax highlighted
const example = 'Hello World';
```

## Lists and More

- Bullet points
- More content
- And so on...
```

### Frontmatter Fields

- `title`: The blog post title
- `description`: Brief description for previews
- `date`: Publication date (YYYY-MM-DD format)
- `tags`: Array of tags for categorization
- `pinned`: Boolean to feature the post
- `author`: Author name

### Updating Blog Configuration

Edit `src/app/services/blog.service.ts` and update:

```typescript
private readonly BLOG_REPO_OWNER = 'your-github-username';
private readonly BLOG_REPO_NAME = 'your-blog-repo-name';
```

## 🚀 Deployment

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings
2. Select "GitHub Actions" as the source
3. Push to the `main` branch to trigger deployment

### Manual Deployment

```bash
npm run build:prod
# Upload the dist/angular-personal-website folder to your hosting provider
```

## 🎨 Customization

### Colors and Theme

Edit `tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

### Styling

- Global styles: `src/styles.css`
- Component styles: Inline with TailwindCSS classes
- Custom CSS: Add to `src/styles.css` with `@layer` directives

### Content

- Home page content: `src/app/pages/home/home.component.ts`
- Navigation: `src/app/components/navbar/navbar.component.ts`
- Footer: `src/app/components/footer/footer.component.ts`

## 📱 Features in Detail

### Blog System
- Fetches markdown files from GitHub repository via API
- Parses frontmatter metadata
- Supports pinned posts
- Search and filter functionality
- Responsive card layout

### Markdown Rendering
- GitHub-flavored markdown (GFM)
- Syntax highlighting with Prism.js
- Sanitized content for security
- Custom styling to match GitHub's appearance

### Responsive Design
- Mobile-first approach
- TailwindCSS utility classes
- Custom breakpoints and spacing
- Accessible navigation

## 🔧 Development

### Available Scripts

- `npm start`: Start development server
- `npm run build`: Build for development
- `npm run build:prod`: Build for production
- `npm test`: Run unit tests
- `npm run watch`: Build and watch for changes

### Code Style

- TypeScript strict mode enabled
- Angular standalone components
- RxJS for reactive programming
- TailwindCSS for styling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: ycheng22@hotmail.com
- **LinkedIn**: [linkedin.com/in/yunpeng-cheng](https://linkedin.com/in/yunpeng-cheng)
- **GitHub**: [github.com/ycheng22](https://github.com/ycheng22)

---

Built with ❤️ using Angular 19 and TailwindCSS

