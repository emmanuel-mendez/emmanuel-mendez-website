import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-detail-section',
  templateUrl: './project-detail-section.html',
  styleUrl: './project-detail-section.css',
})
export class ProjectDetailSection {
  public readonly title = input.required<string>();
}
