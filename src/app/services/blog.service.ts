import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { BlogPost, BlogPostSummary } from '../models/blog-post.model';

const BLOGS_BASE = '/blogs-repo';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogPostsSignal = signal<BlogPostSummary[]>([]);
  // Post metadata only, already sorted (pinned first, newest first) by the build script
  public blogPosts = this.blogPostsSignal.asReadonly();

  private index$: Observable<BlogPostSummary[]>;

  constructor(private http: HttpClient) {
    this.index$ = this.http.get<BlogPostSummary[]>(`${BLOGS_BASE}/index.json`).pipe(
      catchError((error) => {
        console.error('Error loading blog index:', error?.message ?? error);
        return of([]);
      }),
    );
    this.index$.subscribe((posts) => this.blogPostsSignal.set(posts));
  }

  // Full post (markdown body, plus notebook JSON for notebook posts); null if missing
  loadPost(slug: string): Observable<BlogPost | null> {
    const cached = this.blogPosts().find((post) => post.slug === slug);
    const summary$ = cached ? of(cached) : this.index$.pipe(map((posts) => posts.find((p) => p.slug === slug)));

    return summary$.pipe(
      switchMap((summary) => {
        if (!summary) return of(null);
        const mdUrl = `${BLOGS_BASE}/${summary.file}`;

        return this.http.get(mdUrl, { responseType: 'text' }).pipe(
          map((raw): BlogPost => ({ ...summary, content: stripFrontmatter(raw) })),
          switchMap((post) => {
            if (!post.isNotebook) return of(post);
            return this.http.get(mdUrl.replace(/\.md$/, '.ipynb')).pipe(
              map((notebookData) => ({ ...post, notebookData })),
              catchError(() => of(post)),
            );
          }),
        );
      }),
      catchError((error) => {
        console.error(`Error loading post ${slug}:`, error?.message ?? error);
        return of(null);
      }),
    );
  }
}

function stripFrontmatter(raw: string): string {
  const lines = raw.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return lines.join('\n');
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  return end < 0 ? lines.join('\n') : lines.slice(end + 1).join('\n');
}
