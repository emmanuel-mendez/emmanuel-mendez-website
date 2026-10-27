import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { ResponsiveIncludes } from '@pipes/responsive/includes/includes';
import { Devices, Responsive } from '@services/responsive/responsive';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';
import { Button } from '@components/atoms/button/button';

type NavigationItem = {
  readonly href: string;
  readonly label: string;
};

const BODY_SCROLL_LOCK_CLASS = 'navigation--menu-open';

@Component({
  selector: 'app-navigation',
  imports: [Button, ResponsiveIncludes, ThemePicker],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private readonly destroyRef = inject(DestroyRef);

  public readonly responsive: Responsive = inject(Responsive);

  public readonly breakpoints: typeof Devices = Devices;

  public readonly opened = signal<boolean>(false);

  public readonly navigationItems: readonly NavigationItem[] = [
    { href: '/projects', label: 'Projects' },
  ];

  constructor() {
    effect(() => {
      if (typeof document === 'undefined') return;
      document.body.classList.toggle(BODY_SCROLL_LOCK_CLASS, this.opened());
    });

    this.destroyRef.onDestroy(() => {
      if (typeof document === 'undefined') return;
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    });
  }

  public toggleMenu(): void {
    this.opened.update((status) => !status);
  }

  public closeMenu(): void {
    this.opened.set(false);
  }
}
