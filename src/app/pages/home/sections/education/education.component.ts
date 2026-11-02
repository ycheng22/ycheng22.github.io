import { Component } from '@angular/core';
import { CERTIFICATIONS } from '../../../../data/certifications';
import { EDUCATION } from '../../../../data/education';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section id="education" class="section">
      <h2 class="section-title">Education</h2>
      <p class="section-lead">Physics, computer science, and now AI.</p>

      <ul class="grid gap-4">
        @for (edu of education; track edu.school) {
          <li class="card flex gap-4 items-start">
            <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700">
              @if (edu.logo) {
                <img [src]="edu.logo" [alt]="edu.school + ' logo'" width="48" height="48" loading="lazy" decoding="async" class="h-full w-full object-contain p-1" />
              } @else {
                <svg class="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.5V16c0 1.5 3 3 6.5 3s6.5-1.5 6.5-3v-5.5" />
                </svg>
              }
            </span>
            <div class="flex-1">
              <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 class="font-semibold text-slate-900 dark:text-white">{{ edu.degree }}</h3>
                <p class="font-mono text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ edu.period }}</p>
              </div>
              <p class="text-slate-600 dark:text-slate-400">
                {{ edu.school }}@if (edu.location) {<span> · {{ edu.location }}</span>}
              </p>
              @if (edu.note) {
                <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">{{ edu.note }}</p>
              }
            </div>
          </li>
        }
      </ul>

      <h3 class="mt-12 mb-4 text-xl font-semibold text-slate-900 dark:text-white">Certifications</h3>
      <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        @for (cert of certifications; track cert.name) {
          <li class="card flex flex-col items-center text-center">
            @if (cert.image) {
              <img [src]="cert.image" [alt]="cert.name + ' badge'" width="80" height="80" loading="lazy" decoding="async" class="h-20 w-20 object-contain" />
            } @else {
              <span class="flex h-20 w-20 items-center justify-center rounded-full bg-accent-50 font-mono text-sm font-semibold text-accent-700 dark:bg-accent-500/10 dark:text-accent-300">
                {{ cert.name.split(' ')[0] }}
              </span>
            }
            <p class="mt-3 font-semibold text-slate-900 dark:text-white">{{ cert.name }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ cert.issuer }}</p>
            <span class="mt-2 badge-metric">{{ cert.status }}</span>
          </li>
        }
      </ul>
    </section>
  `,
})
export class EducationComponent {
  readonly education = EDUCATION;
  readonly certifications = CERTIFICATIONS;
}
