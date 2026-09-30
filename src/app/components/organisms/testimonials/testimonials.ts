import { Component } from '@angular/core';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {

  public readonly testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
      text: 'Emmanuel delivered exceptional work on our frontend. His attention to detail and expertise in Angular made our project a great success.',
    },
    {
      id: 2,
      name: 'Carlos Rivera',
      role: 'CTO',
      company: 'StartupXYZ',
      text: 'Working with Emmanuel was a pleasure. He built clean, maintainable code and consistently met deadlines. Highly recommended!',
    },
    {
      id: 3,
      name: 'Sophia Lee',
      role: 'UX Designer',
      company: 'Creative Studio',
      text: 'Emmanuel translated our designs into pixel-perfect components with outstanding responsiveness. His CSS skills are top-notch.',
    },
    {
      id: 4,
      name: 'Marcus Thompson',
      role: 'Engineering Lead',
      company: 'FinTech Solutions',
      text: 'Impressive problem-solving ability and a deep understanding of modern web technologies. Emmanuel elevated our team standards.',
    },
    {
      id: 5,
      name: 'Laura Müller',
      role: 'Project Lead',
      company: 'Digital Agency',
      text: "Emmanuel's commitment to quality and best practices is evident in every line of code. A reliable and talented professional.",
    },
    {
      id: 6,
      name: 'David Chen',
      role: 'Software Architect',
      company: 'CloudBase',
      text: 'His knowledge of Angular, TypeScript, and UI/UX principles is outstanding. Emmanuel consistently delivers beyond expectations.',
    },
  ];
}
