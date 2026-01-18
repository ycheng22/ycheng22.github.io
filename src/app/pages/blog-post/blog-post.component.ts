import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { BlogPostComponent } from '../../components/blog-post/blog-post.component';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogPostComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostPageComponent {
  readonly postNotFound = signal(false);

  private readonly slugSignal = toSignal(this.route.params.pipe(map((params) => params['slug'])), {
    initialValue: '',
  });

  readonly blogPost = computed(() => {
    const slug = this.slugSignal();
    if (!slug) return undefined;
    return this.blogService.getPostBySlug(slug)();
  });

  constructor(private readonly route: ActivatedRoute, private readonly blogService: BlogService) {
    effect(() => {
      this.postNotFound.set(this.blogPost() === undefined);
    });
  }
}
