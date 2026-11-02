import { Component } from '@angular/core';
import { SKILL_GROUPS } from '../../../../data/skills';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="section">
      <h2 class="section-title">Skills</h2>
      <p class="section-lead">What I use to build, evaluate, and ship.</p>
      <div class="grid gap-6 md:grid-cols-2">
        @for (group of groups; track group.title) {
          <div class="card">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">{{ group.title }}</h3>
            <ul class="mt-4 flex flex-wrap gap-2">
              @for (skill of group.skills; track skill) {
                <li class="chip">{{ skill }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
})
export class SkillsComponent {
  readonly groups = SKILL_GROUPS;
}
