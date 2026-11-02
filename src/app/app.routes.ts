import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Cheng — Software Engineer',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blog',
    title: 'Blog — Cheng',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'blog/:slug',
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
