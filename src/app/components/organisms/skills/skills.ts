import { Component } from '@angular/core';

interface Skill {
  name: string;
}

interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  public readonly categories: SkillCategory[] = [
    {
      name: 'Languages',
      icon: 'code',
      skills: [
        { name: 'HTML5' },
        { name: 'CSS3' },
        { name: 'JavaScript' },
        { name: 'TypeScript' },
      ],
    },
    {
      name: 'Frontend',
      icon: 'layers',
      skills: [
        { name: 'Angular' },
        { name: 'React' },
        { name: 'RxJS' },
        { name: 'NgRx' },
        { name: 'Redux' },
      ],
    },
    {
      name: 'Styling',
      icon: 'palette',
      skills: [
        { name: 'Sass' },
        { name: 'PostCSS' },
        { name: 'CSS Modules' },
        { name: 'Styled Components' },
        { name: 'Emotion' },
        { name: 'Angular Material' },
        { name: 'Bootstrap' },
        { name: 'Tailwind CSS' },
        { name: 'BEM' },
      ],
    },
    {
      name: 'Testing & Docs',
      icon: 'science',
      skills: [
        { name: 'Jest' },
        { name: 'Vitest' },
        { name: 'Jasmine' },
        { name: 'Karma' },
        { name: 'Storybook' },
      ],
    },
    {
      name: 'Backend & Databases',
      icon: 'dns',
      skills: [
        { name: 'Node.js' },
        { name: 'Express.js' },
        { name: 'MongoDB' },
        { name: 'MySQL' },
      ],
    },
    {
      name: 'Principles & Patterns',
      icon: 'architecture',
      skills: [
        { name: 'Atomic Design' },
        { name: 'OOP' },
        { name: 'Reactive Programming' },
        { name: 'Functional Programming' },
        { name: 'Design Patterns' },
        { name: 'Responsive Design' },
      ],
    },
  ];
}
