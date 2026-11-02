import { Component, computed } from '@angular/core';
import { PROFILE } from '../../data/profile';
import { ICONS } from '../../shared/icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly currentYear = computed(() => new Date().getFullYear());
  readonly links = PROFILE.links;
  readonly icons = ICONS;
}
