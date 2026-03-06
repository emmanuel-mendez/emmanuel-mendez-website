import { Component, inject, signal } from '@angular/core';
import { ResponsiveIncludes } from '@pipes/responsive/includes/includes';
import { Devices, Responsive } from '@services/responsive/responsive';
import { ThemePicker } from "@components/atoms/theme-picker/theme-picker/theme-picker";

@Component({
  selector: 'app-navigation',
  imports: [ResponsiveIncludes, ThemePicker],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  public readonly responsive: Responsive = inject(Responsive);

  public readonly breakpoints: typeof Devices = Devices;

  public readonly opened = signal<boolean>(false);

  public toggleMenu(): void {
    this.opened.update((status) => !status);
  }

  public closeMenu(): void {
    this.opened.set(false);
  }
}
