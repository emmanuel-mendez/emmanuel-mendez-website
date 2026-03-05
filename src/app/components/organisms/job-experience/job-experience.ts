import { Component } from '@angular/core';

export interface JobExperienceItem {
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  sector: string;
  typeOfCommerce: string;
  startDate: string;
  endDate: string | null;
  responsibilities: string[];
  keyAccomplishments: string[];
}

@Component({
  selector: 'app-job-experience',
  imports: [],
  templateUrl: './job-experience.html',
  styleUrl: './job-experience.css',
})
export class JobExperience {
  public readonly experiences: JobExperienceItem[] = [
    {
      role: 'Frontend Developer',
      company: 'Genera LLC - Destiny',
      companyUrl: 'https://www.destiny.ws/',
      location: 'Miami, USA',
      sector: 'Digital Production',
      typeOfCommerce: 'B2B',
      startDate: 'Sep 2021',
      endDate: null,
      responsibilities: [
        'Create responsive and scalable landing pages, web applications and emails',
        'Maintain Angular legacy projects',
        'Upgrade React and Angular projects to their latest versions',
        'Effectively communicate and collaborate with international colleagues in the US, India, Colombia, and Venezuela using English',
      ],
      keyAccomplishments: [
        'Propose and lead the training and implementation of methodologies, tools and technologies such as atomic design, test driven development, global state management, Docker and documentation of UI components with Storybook.',
        'Write technical manuals of best practices in Angular, CSS, Webiny and Docker.',
        'Create customizable and reusable templates for frontend projects and monorepos with dynamic components.',
        'Implement Atomic Design and define the nomenclature, organization and variants of UI components in constant communication and collaboration with the general design manager.',
      ],
    },
  ];
}
