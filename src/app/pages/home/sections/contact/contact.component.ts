import { Component } from '@angular/core';
import { PROFILE } from '../../../../data/profile';
import { ICONS } from '../../../../shared/icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <section id="contact" class="section">
      <div class="card relative overflow-hidden text-center py-14">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(79,70,229,0.12),transparent)] dark:bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(99,102,241,0.22),transparent)]"
        ></div>
        <div class="relative">
          <h2 class="section-title">Open to AI engineering roles</h2>
          <p class="mt-2 text-lg text-slate-600 dark:text-slate-400">The fastest way to reach me is LinkedIn.</p>
          <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a [href]="links.linkedIn" target="_blank" rel="noopener" class="btn-primary px-6 py-3 text-base">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="icons.linkedIn" /></svg>
              Message me on LinkedIn
            </a>
            <a [href]="links.github" target="_blank" rel="noopener" class="btn-secondary px-6 py-3 text-base">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path [attr.d]="icons.github" /></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ContactComponent {
  readonly links = PROFILE.links;
  readonly icons = ICONS;
}
