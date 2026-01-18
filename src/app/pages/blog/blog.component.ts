import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogCardComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  readonly allPosts = this.blogService.blogPosts;
  readonly searchTerm = signal('');
  readonly selectedTag = signal('all');
  readonly showPinned = signal(false);

  readonly availableTags = computed(() => {
    const allTags = this.allPosts().flatMap((post) => post.tags || []);
    return [...new Set(allTags)].sort();
  });

  readonly filteredPosts = computed(() => {
    let filtered = this.allPosts();

    // Apply pinned filter (only when explicitly requested)
    if (this.showPinned()) {
      filtered = filtered.filter((post) => post.pinned);
    }

    // Apply tag filter
    if (this.selectedTag() !== 'all') {
      filtered = filtered.filter((post) => post.tags && post.tags.includes(this.selectedTag()));
    }

    // Apply search filter
    const searchLower = this.searchTerm().trim().toLowerCase();
    if (searchLower) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchLower))),
      );
    }

    return filtered;
  });

  constructor(private readonly blogService: BlogService) {}

  filterByTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  filterByPinned(showPinned: boolean): void {
    this.showPinned.set(showPinned);
  }
}
