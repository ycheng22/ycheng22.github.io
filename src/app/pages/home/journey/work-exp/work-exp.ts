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
        'Architected a micro-frontend application used by 300+ agents, directly increasing loan collections and generating over $1M in business value.',
        'Optimized and maintained a mobile payment application to streamline payment collection workflows, resulting in an additional $1M+ in business value.',
        'Engineered a full-stack real-time dashboard to track agent performance, providing live, actionable feedback and custom coaching tips.',
      ],
      tags: ['AWS', 'Angular', '.NET', 'SQL', 'CI/CD', 'Docker'],
      icon: 'work',
    },
    {
      company: 'University of Houston',
      role: 'Research Assistant',
      period: 'May 2017 – May 2022',
      highlights: [
        'Engineered a Python-based solution to reconstruct protein phases from X-ray crystallography data using iterative direct phasing methods.',
        'Orchestrated high-performance computing scripts on computer clusters, significantly improving convergence rates by implementing a novel data weighting strategy.',
      ],
      tags: ['Python', 'HPC', 'Data Analysis'],
      icon: 'research',
    },
    {
      company: 'Accenture',
      role: 'Research Intern',
      period: 'Mar 2016 - Jun 2016',
      highlights: [
        'Implemented a risk-based security assessment for power networks, designing automated alert systems for critical risk thresholds.',
        'Utilized Monte Carlo simulations to model stochastic load variations, accurately calculating security indices under iterative random load conditions.',
      ],
      tags: ['Security', 'Monte Carlo', 'Modeling'],
      icon: 'intern',
    },
  ];
}
