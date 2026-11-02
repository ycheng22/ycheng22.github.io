import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EXPERIENCE } from '../../../../data/experience';


@Component({
  selector: 'app-work-exp',
  imports: [CommonModule],
  templateUrl: 'work-exp.html',
  styleUrls: ['./work-exp.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          '.timeline-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(200, [
              animate(
                '600ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'translateY(0)' }),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class WorkExpComponent {
  experiences = EXPERIENCE;
}
