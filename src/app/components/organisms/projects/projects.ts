import { Component } from '@angular/core';

interface Project {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  link?: string;
  sourceCode?: string;
}

@Component({
  selector: 'app-projects-section',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsSection {
  public readonly projects: Project[] = [
    {
      title: 'Emmanuel Mendez Website',
      description:
        'Personal portfolio website built with Angular featuring server-side rendering, responsive design, and light/dark theme switching.',
      icon: 'web',
      technologies: ['Angular', 'TypeScript', 'CSS', 'SSR'],
      link: 'https://emmanuel-mendez-website.vercel.app/',
      sourceCode: 'https://github.com/emmanuel-mendez/emmanuel-mendez-website',
    },
    {
      title: 'UI Component Library',
      description:
        'Reusable Angular component library built with atomic design principles, fully documented with Storybook and unit tested.',
      icon: 'widgets',
      technologies: ['Angular', 'TypeScript', 'Storybook', 'Jest'],
      sourceCode: 'https://github.com/emmanuel-mendez',
    },
    {
      title: 'State Management Dashboard',
      description:
        'Frontend dashboard application with advanced global state management, reactive data streams, and dynamic data visualizations.',
      icon: 'dashboard',
      technologies: ['Angular', 'RxJS', 'TypeScript', 'CSS'],
      sourceCode: 'https://github.com/emmanuel-mendez',
    },
  ];
}
