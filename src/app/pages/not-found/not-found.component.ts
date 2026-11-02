import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div class="text-center">
        <p class="text-6xl font-bold text-slate-300 mb-4">404</p>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Page not found</h1>
        <p class="text-slate-600 dark:text-slate-400 mb-6">The page you're looking for doesn't exist or has moved.</p>
        <div class="flex gap-3 justify-center">
          <a routerLink="/" class="btn-primary">Home</a>
          <a routerLink="/blog" class="btn-secondary">Blog</a>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
