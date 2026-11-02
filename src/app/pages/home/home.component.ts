import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROFILE } from '../../data/profile';
import { BlogCardComponent } from '../../components/blog-card/blog-card.component';
import { BlogService } from '../../services/blog.service';
import { Journey } from './journey/journey';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, BlogCardComponent, Journey, HeroComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly blogPosts = this.blogService.blogPosts;
  readonly urls = PROFILE.links;

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
        behavior: 'smooth',
      });
    }
  }
}
