import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input() blogPost!: BlogPost;
  @Input() variant: 'default' | 'featured' | 'compact' = 'default';

  constructor(private router: Router) {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  navigateToPost(): void {
    this.router.navigate(['/blog', this.blogPost.slug]);
  }

  getBlogIcon(): string {
    const icons = ['💻', '🚀', '⚡', '🔧', '📚', '🌟', '🎯', '💡'];
    const hash = this.blogPost.slug.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return icons[Math.abs(hash) % icons.length];
  }
}
