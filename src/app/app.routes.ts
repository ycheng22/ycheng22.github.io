import { provideMarkdown } from 'ngx-markdown';
import { HomeComponent } from './pages/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Cheng — AI Engineer',
    // Eager: the home page is the landing page, so skip the extra chunk round-trip
    component: HomeComponent
  },
  {
    path: 'blog',
    title: 'Blog — Cheng',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
    // Markdown rendering is only needed on post pages
    providers: [provideMarkdown()],
    // Replaced with the post title once the post loads
    title: 'Blog — Cheng',
    loadComponent: () => import('./pages/blog-post/blog-post.component').then(m => m.BlogPostPageComponent)
  },
  {
    path: '**',
    title: 'Page Not Found — Cheng',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
