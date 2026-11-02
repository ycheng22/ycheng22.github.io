import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { AboutComponent } from './sections/about/about.component';
import { ContactComponent } from './sections/contact/contact.component';
import { EducationComponent } from './sections/education/education.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { HeroComponent } from './sections/hero/hero.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { WritingComponent } from './sections/writing/writing.component';

// Home page = sections stacked in order; content lives in src/app/data/
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RevealDirective,
    HeroComponent,
    ProjectsComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    WritingComponent,
    AboutComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
