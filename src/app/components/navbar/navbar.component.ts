import { Component, inject, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PROFILE } from '../../data/profile';
import { ThemeService } from '../../services/theme.service';
import { ICONS } from '../../shared/icons';

interface NavItem {
  label: string;
  fragment?: string; // home-page section; omitted for routed pages
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgTemplateOutlet],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  readonly links = PROFILE.links;
  readonly icons = ICONS;
  readonly mobileMenuOpen = signal(false);

  readonly items: NavItem[] = [
    { label: 'Projects', route: '/', fragment: 'projects' },
    { label: 'Experience', route: '/', fragment: 'experience' },
    { label: 'Blog', route: '/blog' },
    { label: 'About', route: '/', fragment: 'about' },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
