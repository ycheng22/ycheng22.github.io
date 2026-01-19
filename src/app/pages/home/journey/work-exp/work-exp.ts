import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
  tags: string[];
  icon: 'work' | 'research' | 'intern';
  logo?: string;
}

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
  experiences: Experience[] = [
    {
      company: 'American Credit Acceptance',
      role: 'Software Engineer',
      period: 'Jul 2022 – Current',
      highlights: [
        'Implemented a micro-frontend application used by <b>300+ agents</b>, directly increasing loan collections and generating over <b>$1.7M</b> in business value.',
        'Optimized and maintained a mobile payment application to streamline payment collection workflows, resulting in an additional <b>$1.1M</b> in business value.',
        'Engineered a full-stack real-time dashboard to track agent performance, providing live, actionable feedback and custom coaching tips.',
      ],
      tags: ['AWS', 'Angular', '.NET', 'SQL', 'CI/CD', 'Atlassian'],
      icon: 'work',
      logo: '/img/aca_logo.png',
    },
    {
      company: 'University of Houston',
      role: 'Research Assistant',
      period: 'May 2017 – May 2022',
      highlights: [
        'Developed a Python-based solution to reconstruct protein phases from X-ray crystallography data using iterative direct phasing methods.',
        'Orchestrated high-performance computing scripts on computer clusters.',
      ],
      tags: ['Python', 'Matlab', 'HPC', 'Linux'],
      icon: 'research',
      logo: '/img/uh_logo.png',
    },
    {
      company: 'Accenture',
      role: 'Research Intern',
      period: 'Mar 2016 - Jun 2016',
      highlights: [
        'Implemented a risk-based security assessment for power networks, designing automated alert systems for critical risk thresholds.',
        'Utilized Monte Carlo simulations to model stochastic load variations, accurately calculating security indices under iterative random load conditions.',
      ],
      tags: ['Python', 'Simulation'],
      icon: 'intern',
      logo: '/img/accenture_logo.png',
    },
  ];
}
