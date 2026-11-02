import { Component } from '@angular/core';
import { EXPERIENCE } from '../../../../data/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  template: `
    <section id="experience" class="section">
      <h2 class="section-title">Experience</h2>
      <p class="section-lead">Production software in auto finance, and research before that.</p>

      <ol class="relative border-l border-slate-200 dark:border-slate-800 ml-5 md:ml-6">
        @for (exp of experiences; track exp.company) {
          <li class="relative pl-10 md:pl-12 pb-12 last:pb-0">
            <!-- Timeline node -->
            <span
              class="absolute -left-5 md:-left-6 top-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white ring-4 ring-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-950"
            >
              @if (exp.logo) {
                <img [src]="exp.logo" [alt]="exp.company + ' logo'" width="40" height="40" loading="lazy" decoding="async" class="h-full w-full object-contain p-1.5" />
              }
            </span>

            <div class="card">
              <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ exp.role }}</h3>
                  <p class="font-medium text-slate-600 dark:text-slate-400">{{ exp.company }}</p>
                </div>
                <p class="font-mono text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ exp.period }}</p>
              </div>

              <ul class="mt-4 space-y-3">
                @for (highlight of exp.highlights; track $index) {
                  <li class="flex gap-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span class="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent-500" aria-hidden="true"></span>
                    <span class="highlight" [innerHTML]="highlight"></span>
                  </li>
                }
              </ul>

              <ul class="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                @for (tag of exp.tags; track tag) {
                  <li class="chip text-xs">{{ tag }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .highlight ::ng-deep b {
      font-weight: 600;
      color: inherit;
    }
  `,
})
export class ExperienceComponent {
  readonly experiences = EXPERIENCE;
}
