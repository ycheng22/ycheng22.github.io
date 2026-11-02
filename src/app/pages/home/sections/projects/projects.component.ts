import { Component } from '@angular/core';
import { PROJECTS } from '../../../../data/projects';
import { ProjectCardComponent } from './project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  template: `
    <section id="projects" class="section">
      <h2 class="section-title">Projects</h2>
      <p class="section-lead">Independent AI projects, each evaluated with measured results.</p>
      <div class="grid gap-6 lg:grid-cols-3">
        @for (project of projects; track project.name) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
