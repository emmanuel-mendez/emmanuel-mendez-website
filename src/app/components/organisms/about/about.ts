import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  public readonly skills: { group: string; tags: string[] }[] = [
    {
      group: 'Languages & Frameworks',
      tags: ['TypeScript', 'Angular', 'React', 'NgRx', 'Redux', 'RxJS'],
    },
    {
      group: 'Testing & Documentation',
      tags: ['Jest', 'Jasmine', 'Karma', 'Storybook'],
    },
    {
      group: 'Styling',
      tags: [
        'PostCSS',
        'Sass',
        'CSS Modules',
        'Styled Components',
        'Emotion',
        'Bootstrap',
        'Tailwind CSS',
        'Angular Material',
      ],
    },
    {
      group: 'Principles & Patterns',
      tags: [
        'OOP',
        'Reactive Programming',
        'Functional Programming',
        'Design Patterns',
        'Atomic Design',
        'Programming Principles',
      ],
    },
  ];
}
