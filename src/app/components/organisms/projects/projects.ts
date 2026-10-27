import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Button } from '@components/atoms/button/button';
import { Card } from '@components/molecules/card/card';
import { Pagination } from '@components/molecules/pagination/pagination';
import { ProjectsData } from '@services/projects/projects-data';

@Component({
  selector: 'app-projects-section',
  imports: [Button, Card, NgTemplateOutlet, Pagination],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsSection {
  private readonly projectsData = inject(ProjectsData);
  public readonly projects = this.projectsData.projects;
  public readonly hasMoreProjects = this.projects.length > 3;
}
