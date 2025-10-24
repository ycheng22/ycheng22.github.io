import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent {
  @Input() blogPost!: BlogPost;

  markdownOptions = {
    breaks: true,
    gfm: true,
    tables: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  };

  constructor(private markdownService: MarkdownService) {
    // Note: Custom renderer configuration removed due to API changes in ngx-markdown
    // The styling will be handled through CSS classes instead
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}