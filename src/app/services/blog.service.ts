import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, catchError, of, switchMap, forkJoin } from 'rxjs';
import { BlogPost, BlogPostMetadata } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly GITHUB_API_BASE = 'https://api.github.com/repos';
  private readonly BLOG_REPO_OWNER = 'ycheng22'; // Update this with your GitHub username
  private readonly BLOG_REPO_NAME = 'blog-posts'; // Update this with your blog repository name
  
  private blogPostsSubject = new BehaviorSubject<BlogPost[]>([]);
  public blogPosts$ = this.blogPostsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBlogPosts();
  }

  private loadBlogPosts(): void {
    this.fetchBlogPosts().subscribe({
      next: (posts) => this.blogPostsSubject.next(posts),
      error: (error) => console.error('Error loading blog posts:', error)
    });
  }

  private fetchBlogPosts(): Observable<BlogPost[]> {
    // Load posts from local static folder (blogs-repo) included in the build output.
    const localIndexUrl = '/blogs-repo/index.json';

    return this.http.get<any[]>(localIndexUrl).pipe(
      map(files => files.filter(file => file?.name?.endsWith?.('.md'))),
      switchMap(mdFiles => {
        if (mdFiles.length === 0) return of([]);

        const postObservables = mdFiles.map(file => {
          const localFile = { name: file.name, download_url: `/blogs-repo/${file.name}` };
          return this.fetchBlogPost(localFile);
        });

        return forkJoin(postObservables).pipe(map(posts => this.sortPosts(posts)));
      }),
      catchError(error => {
        console.error('Error fetching local blog index:', error);
        return of([]);
      })
    );
  }

  // Extracted helper for sorting posts
  private sortPosts(posts: BlogPost[]): BlogPost[] {
    posts.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return posts;
  }

  private fetchBlogPost(file: any): Observable<BlogPost> {
    const contentUrl = file.download_url;
    
    return this.http.get(contentUrl, { responseType: 'text' }).pipe(
      map(content => this.parseMarkdownFile(file.name, content)),
      catchError(error => {
        console.error(`Error fetching content for ${file.name}:`, error);
        return of(this.createEmptyBlogPost(file.name));
      })
    );
  }

  private parseMarkdownFile(filename: string, content: string): BlogPost {
    const slug = filename.replace('.md', '');
    const lines = content.split('\n');
    
    // Extract frontmatter
    let metadata: BlogPostMetadata = {
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: '',
      date: new Date().toISOString(),
      tags: [],
      pinned: false,
      author: 'Cheng'
    };

    if (lines[0] === '---') {
      const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
      if (frontmatterEnd > 0) {
        const frontmatterLines = lines.slice(1, frontmatterEnd);
        const frontmatterContent = frontmatterLines.join('\n');
        
        try {
          // Simple frontmatter parser
          const frontmatter = this.parseFrontmatter(frontmatterContent);
          metadata = { ...metadata, ...frontmatter };
        } catch (error) {
          console.warn('Error parsing frontmatter:', error);
        }
      }
    }

    // Extract content (everything after frontmatter)
    const contentStart = lines[0] === '---' ? lines.findIndex((line, index) => index > 0 && line === '---') + 1 : 0;
    const markdownContent = lines.slice(contentStart).join('\n');

    // Generate description if not provided in frontmatter
    let description = metadata.description;
    if (!description || description.trim() === '') {
      // Extract first paragraph or first few sentences as description
      const cleanContent = markdownContent
        .replace(/^#+\s+/gm, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
        .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
        .replace(/`([^`]+)`/g, '$1') // Remove inline code
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();
      
      // Take first 150 characters and ensure it ends at a sentence
      description = cleanContent.substring(0, 150);
      const lastSentenceEnd = Math.max(description.lastIndexOf('.'), description.lastIndexOf('!'), description.lastIndexOf('?'));
      if (lastSentenceEnd > 50) {
        description = description.substring(0, lastSentenceEnd + 1);
      } else {
        description = description + '...';
      }
    }

    // Calculate reading time (average 200 words per minute)
    const wordCount = markdownContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: metadata.title,
      description: description,
      content: markdownContent,
      date: metadata.date,
      tags: metadata.tags,
      pinned: metadata.pinned,
      author: metadata.author,
      readingTime
    };
  }

  private parseFrontmatter(content: string): Partial<BlogPostMetadata> {
    const metadata: Partial<BlogPostMetadata> = {};
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
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
                // Fallback to comma-separated parsing if JSON parse fails
                metadata.tags = trimmedValue.replace(/[\[\]'"]/g, '').split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
              }
            } else {
              // Comma-separated string format
              metadata.tags = value.replace(/['"]/g, '').split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
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

  private createEmptyBlogPost(filename: string): BlogPost {
    const slug = filename.replace('.md', '');
    return {
      slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: 'Blog post content could not be loaded.',
      content: 'Sorry, this blog post could not be loaded at this time.',
      date: new Date().toISOString(),
      tags: [],
      pinned: false,
      author: 'Cheng',
      readingTime: 1
    };
  }

  getPinnedPosts(): Observable<BlogPost[]> {
    return this.blogPosts$.pipe(
      map(posts => posts.filter(post => post.pinned))
    );
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.blogPosts$.pipe(
      map(posts => posts.find(post => post.slug === slug))
    );
  }

  refreshPosts(): void {
    this.loadBlogPosts();
  }
}

