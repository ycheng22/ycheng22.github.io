import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  pinnedPosts$: Observable<BlogPost[]>;
  latestPost$: Observable<BlogPost | undefined>;

  constructor(private readonly blogService: BlogService) {
    this.pinnedPosts$ = this.blogService.getPinnedPosts();
    this.latestPost$ = this.blogService.blogPosts$.pipe(
      map(posts => posts?.[0])
    );
  }

}