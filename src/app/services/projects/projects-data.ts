import { Injectable } from '@angular/core';

export type Project = {
  slug: string;
  title: string;
  rol: 'owner' | 'collaborator';
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
    rol: 'owner',
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
  {
    slug: 'ui-component-library',
    title: 'UI Component Library',
    rol: 'collaborator',
    description:
      'Reusable Angular component library built with atomic design principles, fully documented with Storybook and unit tested.',
    icon: 'widgets',
    technologies: ['Angular', 'TypeScript', 'Storybook', 'Jest'],
    year: 2024,
    sourceCode: 'https://github.com/emmanuel-mendez',
    content:
      'A comprehensive Angular component library following atomic design methodology. Components are organized into atoms, molecules, organisms, and templates. Fully documented with Storybook for interactive development and visual testing. Unit tested with Jest for reliability.',
  },
  {
    slug: 'state-management-dashboard',
    title: 'State Management Dashboard',
    rol: 'collaborator',
    description:
      'Frontend dashboard application with advanced global state management, reactive data streams, and dynamic data visualizations.',
    icon: 'dashboard',
    technologies: ['Angular', 'RxJS', 'TypeScript', 'CSS'],
    year: 2023,
    sourceCode: 'https://github.com/emmanuel-mendez',
    content:
      'A frontend dashboard application demonstrating advanced state management patterns with RxJS. Features reactive data streams, dynamic chart visualizations, and efficient data caching strategies for optimal performance.',
  },
  {
    slug: 'ecommerce-storefront',
    title: 'E-commerce Storefront',
    rol: 'collaborator',
    description:
      'Mock storefront experience with product discovery, category navigation, and a responsive shopping cart.',
    icon: 'shopping_bag',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    year: 2025,
    sourceCode: 'https://github.com/emmanuel-mendez',
    content:
      'A mock e-commerce storefront focused on product browsing, category filters, and a responsive shopping experience.',
  },
  {
    slug: 'task-planner',
    title: 'Task Planner',
    rol: 'collaborator',
    description:
      'Mock productivity app for organizing tasks, tracking progress, and reviewing upcoming work.',
    icon: 'task_alt',
    technologies: ['TypeScript', 'RxJS', 'CSS'],
    year: 2022,
    sourceCode: 'https://github.com/emmanuel-mendez',
    content:
      'A mock task planning application that demonstrates a clear workflow for organizing and tracking personal work.',
  },
];

@Injectable({ providedIn: 'root' })
export class ProjectsData {
  public readonly projects: readonly Project[] = PROJECTS;

  public getBySlug(slug: string): Project | undefined {
    return this.projects.find((project) => project.slug === slug);
  }
}
