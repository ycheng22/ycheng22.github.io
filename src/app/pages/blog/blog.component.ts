import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogPost } from '../../models/blog-post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogCardComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  allPosts$: Observable<BlogPost[]>;
  filteredPosts$: Observable<BlogPost[]>;
  availableTags$: Observable<string[]>;
  searchTerm = '';
  selectedTag = 'all';
  showPinned = false;

  constructor(private readonly blogService: BlogService) {
    this.allPosts$ = this.blogService.blogPosts$;
    this.filteredPosts$ = this.allPosts$;

    // Extract unique tags from all posts
    this.availableTags$ = this.allPosts$.pipe(
      map((posts) => {
        debugger;
        const allTags = posts.flatMap((post) => post.tags || []);
        const uniqueTags = [...new Set(allTags)].sort();
        console.log('Available tags:', uniqueTags); // Debug log
        return uniqueTags;
      }),
    );
  }

  filterPosts(): void {
    this.filteredPosts$ = this.allPosts$.pipe(
      map((posts) => {
        let filtered = posts;

        // Apply pinned filter (only when explicitly requested)
        if (this.showPinned) {
          filtered = filtered.filter((post) => post.pinned);
        }
        // When showPinned is false, show all posts (no filter applied)

        // Apply tag filter
        if (this.selectedTag !== 'all') {
          filtered = filtered.filter((post) => post.tags && post.tags.includes(this.selectedTag));
        }

        // Apply search filter
        if (this.searchTerm.trim()) {
          const searchLower = this.searchTerm.toLowerCase();
          filtered = filtered.filter(
            (post) =>
              post.title.toLowerCase().includes(searchLower) ||
              post.description.toLowerCase().includes(searchLower) ||
              (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchLower))),
          );
        }

        return filtered;
      }),
    );
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filterPosts();
  }

  filterByPinned(showPinned: boolean): void {
    this.showPinned = showPinned;
    this.filterPosts();
  }
}
