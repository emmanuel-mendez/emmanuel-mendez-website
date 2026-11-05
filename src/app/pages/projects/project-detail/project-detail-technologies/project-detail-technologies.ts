import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-detail-technologies',
  templateUrl: './project-detail-technologies.html',
  styleUrl: './project-detail-technologies.css',
})
export class ProjectDetailTechnologies {
  public readonly technologies = input.required<readonly string[]>();
}
