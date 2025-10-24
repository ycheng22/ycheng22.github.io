import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BlogService } from '../../services/blog.service';
import { BlogPost } from '../../models/blog-post.model';
import { BlogPostComponent } from '../../components/blog-post/blog-post.component';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogPostComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostPageComponent implements OnInit {
  blogPost$: Observable<BlogPost | undefined>;
  postNotFound = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService
  ) {
    this.blogPost$ = this.route.params.pipe(
      map(params => params['slug']),
      switchMap(slug => this.blogService.getPostBySlug(slug))
    );
  }

  ngOnInit(): void {
    this.blogPost$.subscribe(post => {
      this.postNotFound = post === undefined;
    });
  }
}

