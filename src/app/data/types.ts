// Shapes of the content shown on the home page (data lives in the sibling files)

export interface Profile {
  name: string;
  headline: string;
  tagline: string;
  credentials: string[];
  heroMetrics: string[];
  links: { linkedIn: string; github: string };
}

export interface Project {
  name: string;
  subtitle: string;
  summary: string;
  metrics: string[];
  stack: string[];
  details: string[];
  link: { label: 'Live demo' | 'GitHub'; url: string };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[]; // may contain <b>…</b>; rendered via [innerHTML]
  tags: string[];
  icon: 'work' | 'research' | 'intern';
  logo?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location?: string;
  logo?: string;
  note?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'Certified' | 'Passed';
  image?: string;
}
