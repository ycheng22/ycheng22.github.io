import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { URLS } from 'src/app/models/url.constant';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';
import { Journey } from './journey/journey';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, BlogCardComponent, Journey],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly blogPosts = this.blogService.blogPosts;
  readonly urls = URLS;

  readonly pinnedPosts = computed(() => this.blogPosts().filter((post) => post.pinned));

  readonly latestPost = computed(() => this.blogPosts()?.[0]);

  readonly recentPosts = computed(() => this.blogPosts()?.slice(0, 6) || []);

  constructor(private readonly blogService: BlogService) {}

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Offset for any fixed headers or spacing
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
