import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogCardComponent } from '../../../../components/blog-card/blog-card.component';
import { BlogService } from '../../../../services/blog.service';

const MAX_POSTS = 6;

@Component({
  selector: 'app-writing',
  standalone: true,
  imports: [RouterModule, BlogCardComponent],
  template: `
    <section id="writing" class="section">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-10">
        <div>
          <h2 class="section-title">Writing</h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">Notebooks and notes on agents, LLM APIs, and engineering.</p>
        </div>
        <a routerLink="/blog" class="font-medium text-accent-600 hover:text-accent-700 dark:text-accent-400">View all posts →</a>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        @for (post of posts(); track post.slug) {
          <app-blog-card [blogPost]="post" />
        }
      </div>
    </section>
  `,
})
export class WritingComponent {
  private readonly blogPosts = inject(BlogService).blogPosts;

  // AI notebooks first (in index order), then the newest other posts
  readonly posts = computed(() => {
    const all = this.blogPosts();
    const notebooks = all.filter((p) => p.isNotebook);
    const others = all
      .filter((p) => !p.isNotebook)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return [...notebooks, ...others].slice(0, MAX_POSTS);
  });
}
