import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@services/projects/projects-data';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  public readonly project = input.required<Project>();
  public readonly titleLevel = input<2 | 3>(2);
}
