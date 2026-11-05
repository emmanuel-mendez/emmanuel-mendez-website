import { Component, input } from '@angular/core';
import { ProjectHighlight } from '@services/projects/projects-data';

@Component({
  selector: 'app-project-detail-highlights',
  templateUrl: './project-detail-highlights.html',
  styleUrl: './project-detail-highlights.css',
})
export class ProjectDetailHighlights {
  public readonly highlights = input.required<readonly ProjectHighlight[]>();
}
