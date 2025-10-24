import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogCardComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  allPosts$: Observable<BlogPost[]>;
  filteredPosts$: Observable<BlogPost[]>;
  availableTags$: Observable<string[]>;
  searchTerm = '';
  selectedTag = 'all';

  constructor(private readonly blogService: BlogService) {
    this.allPosts$ = this.blogService.blogPosts$;
    this.filteredPosts$ = this.allPosts$;
    
    // Extract unique tags from all posts
    this.availableTags$ = this.allPosts$.pipe(
      map(posts => {
        const allTags = posts.flatMap(post => post.tags);
        return [...new Set(allTags)].sort();
      })
    );
  }

  filterPosts(): void {
    this.filteredPosts$ = this.allPosts$.pipe(
      map(posts => {
        let filtered = posts;
        
        // Apply tag filter
        if (this.selectedTag !== 'all') {
          filtered = filtered.filter(post => 
            post.tags.includes(this.selectedTag)
          );
        }
        
        // Apply search filter
        if (this.searchTerm.trim()) {
          const searchLower = this.searchTerm.toLowerCase();
          filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(searchLower) ||
            post.description.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }
        
        return filtered;
      })
    );
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.filterPosts();
  }
}
