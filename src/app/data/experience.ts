import { Experience } from './types';

export const EXPERIENCE: Experience[] = [
  {
    company: 'American Credit Acceptance',
    role: 'Software Engineer',
    period: 'Jul 2022 – Current',
    highlights: [
      '<b>Internal AI Agent Platform:</b> Built and scaled an enterprise AI agent platform to <b>100+ users</b>, with security guardrails for handling financial data.',
      '<b>Micro-frontend Negotiation Platform for FinTech:</b> Developed a full-stack micro-frontend application for <b>350+ agents</b>, integrating Speedpay, SendGrid, and SMS solution (Solution By Text) to optimize payment workflows; this initiative increased loan collections and generated over <b>$1.7M</b> in business value.',
      '<b>Mobile-First Loan Payment Portal:</b> Optimized and maintained a mobile-first web application backed by <b>.NET APIs</b> to streamline payment collection workflows. Enabled customer self-service features for auto-pay enrollment, payment extensions, and history checks, resulting in an additional <b>$1.1M</b> in business value.',
      '<b>Performance Dashboard:</b> Engineered a full-stack <b>Angular/.NET</b> dashboard to track agent performance, providing live, actionable feedback and custom coaching tips. Integrated <b>AWS Step Functions</b> and eliminated system bottlenecks by refactoring queries and implementing <b>Redis cache</b>.',
      '<b>Vehicle Repossession System:</b> Optimized and maintained a critical suite of <b>.NET worker</b> services hosted on <b>on-premise infrastructure</b>. Enhanced backend performance to ensure the reliable processing of high-volume repossession data, directly mitigating credit risk.'
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
      'Developed advanced Python algorithms to retrieve protein phases from X-ray data using iterative direct phasing methods.',
      'Designed and executed automated scripts for high-performance cluster computing.',
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
