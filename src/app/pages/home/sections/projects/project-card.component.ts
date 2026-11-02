import { Component, Input } from '@angular/core';
import { Project } from '../../../../data/types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  template: `
    <article class="card flex h-full flex-col">
      <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ project.name }}</h3>
      <p class="mt-1 text-sm font-medium text-accent-600 dark:text-accent-400">{{ project.subtitle }}</p>
      <p class="mt-3 text-slate-600 dark:text-slate-300">{{ project.summary }}</p>

      <ul class="mt-4 flex flex-wrap gap-2" aria-label="Results">
        @for (metric of project.metrics; track metric) {
          <li class="badge-metric">{{ metric }}</li>
        }
      </ul>

      <ul class="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        @for (tech of project.stack; track tech) {
          <li class="chip text-xs">{{ tech }}</li>
        }
      </ul>

      <details class="group mt-4 text-sm">
        <summary class="cursor-pointer select-none font-medium text-slate-700 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400">
          Details
        </summary>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-slate-600 dark:text-slate-400">
          @for (detail of project.details; track $index) {
            <li>{{ detail }}</li>
          }
        </ul>
      </details>

      <div class="mt-auto pt-6">
        <a [href]="project.link.url" target="_blank" rel="noopener" class="btn-primary w-full">
          {{ project.link.label }}
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5h5v5M19 5l-8 8M19 14v5H5V5h5" />
          </svg>
        </a>
      </div>
    </article>
  `,
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
