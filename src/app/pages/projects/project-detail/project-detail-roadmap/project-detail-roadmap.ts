import { Component, input } from '@angular/core';
import { ProjectMilestone } from '@services/projects/projects-data';

@Component({
  selector: 'app-project-detail-roadmap',
  templateUrl: './project-detail-roadmap.html',
  styleUrl: './project-detail-roadmap.css',
})
export class ProjectDetailRoadmap {
  public readonly milestones = input.required<readonly ProjectMilestone[]>();
}
