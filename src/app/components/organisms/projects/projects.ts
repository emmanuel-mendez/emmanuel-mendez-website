import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@components/atoms/button/button';
import { ProjectsData } from '@services/projects/projects-data';

@Component({
  selector: 'app-projects-section',
  imports: [Button, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsSection {
  private readonly projectsData = inject(ProjectsData);
  public readonly projects = this.projectsData.projects;
}
