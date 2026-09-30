import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
<<<<<<< HEAD

export type ButtonAppearance = 'primary' | 'secondary' | 'plain';
export type ButtonType = 'button' | 'submit' | 'reset';
=======
>>>>>>> origin/main

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
<<<<<<< HEAD
  public readonly appearance = input<ButtonAppearance>('primary');
  public readonly routerLink = input<string | string[] | null>(null);
  public readonly href = input<string | null>(null);
  public readonly type = input<ButtonType>('button');
  public readonly disabled = input(false);
  public readonly label = input<string | undefined>(undefined);
  public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  public readonly target = input<string | undefined>(undefined);
  public readonly rel = input<string | undefined>(undefined);
=======
  public readonly label = input('See more');
  public readonly route = input<readonly string[]>(['/projects']);
>>>>>>> origin/main
}
