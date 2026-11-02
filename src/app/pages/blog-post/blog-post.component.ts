import '../../markdown/prism';
import { Component, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs/operators';
import { BlogPostComponent } from '../../components/blog-post/blog-post.component';
import { BlogPost } from '../../models/blog-post.model';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post-page',
  standalone: true,
  imports: [RouterModule, BlogPostComponent],
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostPageComponent {
  // undefined = loading, null = not found
  private readonly postState = toSignal(
    this.route.params.pipe(
      map((params) => params['slug'] as string),
      switchMap((slug) => this.blogService.loadPost(slug).pipe(startWith(undefined))),
    ),
    { initialValue: undefined as BlogPost | null | undefined },
  );

  readonly blogPost = computed(() => this.postState() ?? undefined);
  readonly loading = computed(() => this.postState() === undefined);
  readonly postNotFound = computed(() => this.postState() === null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly blogService: BlogService,
    title: Title,
  ) {
    effect(() => {
      const post = this.blogPost();
      if (post) title.setTitle(`${post.title} — Cheng`);
    });
  }
}
