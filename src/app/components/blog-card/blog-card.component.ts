import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <article class="card hover:shadow-md transition-shadow duration-200">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-2">
          <h3 class="text-lg font-semibold text-gray-900 line-clamp-2">
            {{ blogPost.title }}
          </h3>
          <span *ngIf="blogPost.pinned" 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            📌 Pinned
          </span>
        </div>
      </div>
      
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ blogPost.description }}
      </p>
      
      <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div class="flex items-center space-x-4">
          <span>{{ formatDate(blogPost.date) }}</span>
          <span *ngIf="blogPost.readingTime">{{ blogPost.readingTime }} min read</span>
        </div>
        <div *ngIf="blogPost.tags.length > 0" class="flex flex-wrap gap-1">
          <span *ngFor="let tag of blogPost.tags.slice(0, 2)" 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {{ tag }}
          </span>
          <span *ngIf="blogPost.tags.length > 2" 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            +{{ blogPost.tags.length - 2 }}
          </span>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <a [routerLink]="['/blog', blogPost.slug]" 
           class="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
          Read more →
        </a>
        <span class="text-xs text-gray-400">by {{ blogPost.author }}</span>
      </div>
    </article>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class BlogCardComponent {
  @Input() blogPost!: BlogPost;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}

