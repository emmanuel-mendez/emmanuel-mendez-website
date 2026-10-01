import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pagination } from '@components/molecules/pagination/pagination';
import { ProjectsData } from '@services/projects/projects-data';

@Component({
  selector: 'app-projects-section',
  imports: [Pagination, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsSection {
  private readonly projectsData = inject(ProjectsData);
  public readonly projects = this.projectsData.projects;
}
