import { Injectable } from '@angular/core';

export type Project = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  technologies: readonly string[];
  year: number;
  link?: string;
  sourceCode?: string;
  content: string;
};

const PROJECTS: readonly Project[] = [
  {
    slug: 'emmanuel-mendez-website',
    title: 'Emmanuel Mendez Website',
    description:
      'Personal portfolio website built with Angular featuring server-side rendering, responsive design, and light/dark theme switching.',
    icon: 'web',
    technologies: ['Angular', 'TypeScript', 'CSS', 'SSR'],
    year: 2025,
    link: 'https://emmanuel-mendez-website.vercel.app/',
    sourceCode: 'https://github.com/emmanuel-mendez/emmanuel-mendez-website',
    content:
      'A personal portfolio website showcasing professional experience, skills, and projects. Built with Angular 21, it features server-side rendering for optimal SEO, responsive design with mobile-first approach, and light/dark theme support using CSS light-dark() function.',
  },
];

@Injectable({ providedIn: 'root' })
export class ProjectsData {
  public readonly projects: readonly Project[] = PROJECTS;

  public getBySlug(slug: string): Project | undefined {
    return this.projects.find((project) => project.slug === slug);
  }
}
