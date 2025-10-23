import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  template: `
    <article class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center space-x-2 mb-4">
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
            {{ blogPost.title }}
          </h1>
          <span *ngIf="blogPost.pinned" 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
            📌 Pinned
          </span>
        </div>
        
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <div class="flex items-center space-x-2">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ formatDate(blogPost.date) }}</span>
          </div>
          
          <div *ngIf="blogPost.readingTime" class="flex items-center space-x-2">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ blogPost.readingTime }} min read</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ blogPost.author }}</span>
          </div>
        </div>
        
        <div *ngIf="blogPost.tags.length > 0" class="flex flex-wrap gap-2 mb-6">
          <span *ngFor="let tag of blogPost.tags" 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors">
            {{ tag }}
          </span>
        </div>
        
        <div *ngIf="blogPost.description" class="text-lg text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500">
          {{ blogPost.description }}
        </div>
      </header>
      
      <!-- Content -->
      <div class="prose prose-lg max-w-none markdown-body">
        <markdown [data]="blogPost.content">
        </markdown>
      </div>
      
      <!-- Footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600">
            <p>Written by <span class="font-medium">{{ blogPost.author }}</span></p>
            <p>Published on {{ formatDate(blogPost.date) }}</p>
          </div>
          
          <div class="flex space-x-4">
            <button (click)="sharePost()" 
                    class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
              </svg>
              Share
            </button>
          </div>
        </div>
      </footer>
    </article>
  `,
  styles: []
})
export class BlogPostComponent {
  @Input() blogPost!: BlogPost;

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  sharePost(): void {
    if (navigator.share) {
      navigator.share({
        title: this.blogPost.title,
        text: this.blogPost.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      });
    }
  }
}

