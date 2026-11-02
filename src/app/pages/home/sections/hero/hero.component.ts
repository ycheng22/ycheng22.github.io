import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROFILE } from '../../../../data/profile';
import { ICONS } from '../../../../shared/icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section id="top" class="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <!-- Soft indigo/cyan glow echoing the logo -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(79,70,229,0.14),transparent),radial-gradient(ellipse_50%_40%_at_80%_30%,rgba(6,182,212,0.10),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_30%_20%,rgba(99,102,241,0.22),transparent),radial-gradient(ellipse_50%_40%_at_80%_30%,rgba(34,211,238,0.12),transparent)]"
      ></div>

      <div class="relative max-w-[1100px] mx-auto px-4 sm:px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <p class="text-lg font-medium text-slate-600 dark:text-slate-400">
          I'm {{ profile.name }} <span class="wave inline-block" role="img" aria-label="Waving hand">👋</span>
        </p>
        <h1 class="mt-3 text-[40px] md:text-[56px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
          {{ profile.headline }}
        </h1>
        <p class="mt-5 max-w-2xl text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
          {{ profile.tagline }}
        </p>
        <p class="mt-4 text-sm md:text-base text-slate-500 dark:text-slate-400">
          {{ profile.credentials.join(' · ') }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a routerLink="/" fragment="projects" class="btn-primary px-5 py-2.5">View projects</a>
          <a [href]="profile.links.linkedIn" target="_blank" rel="noopener" class="btn-secondary px-5 py-2.5">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="icons.linkedIn" /></svg>
            LinkedIn
          </a>
          <a [href]="profile.links.github" target="_blank" rel="noopener" class="btn-secondary px-5 py-2.5">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="icons.github" /></svg>
            GitHub
          </a>
        </div>

        <ul class="mt-10 flex flex-wrap gap-2" aria-label="Selected results">
          @for (metric of profile.heroMetrics; track metric) {
            <li class="badge-metric text-sm">{{ metric }}</li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .wave {
      animation: wave 2.5s ease-in-out infinite;
      transform-origin: 70% 70%;
    }
    @keyframes wave {
      0%, 60%, 100% { transform: rotate(0deg); }
      10%, 30% { transform: rotate(14deg); }
      20% { transform: rotate(-8deg); }
      40% { transform: rotate(-4deg); }
      50% { transform: rotate(10deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .wave { animation: none; }
    }
  `,
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly icons = ICONS;
}
