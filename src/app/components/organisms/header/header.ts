import { DOCUMENT } from '@angular/common';
import { Navigation } from '@components/organisms/navigation/navigation';
import { Component, inject, computed, signal, afterNextRender, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Responsive, Devices } from '@services/responsive/responsive';
import { Theme, ThemeMode } from '@services/theme/theme';

const EXPANDED_LOGO_DEVICES: readonly Devices[] = [
  Devices.DESKTOP_MEDIUM,
  Devices.DESKTOP_LARGE,
  Devices.DESKTOP_EXTRA_LARGE,
  Devices.DESKTOP_EXTRA_EXTRA_LARGE,
];

@Component({
  selector: 'app-header',
  imports: [Navigation, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly responsive = inject(Responsive);
  private readonly destroyRef = inject(DestroyRef);
  public readonly theme = inject(Theme);
  private readonly systemDark = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof window.matchMedia !== 'function') return;
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemDark.set(mq.matches);
      const onChange = (e: MediaQueryListEvent) => this.systemDark.set(e.matches);
      mq.addEventListener('change', onChange);
      this.destroyRef.onDestroy(() => mq.removeEventListener('change', onChange));
    });
  }

  private readonly isExpandedLogo = computed((): boolean =>
    this.responsive.device().some((device: Devices) => EXPANDED_LOGO_DEVICES.includes(device)),
  );

  public readonly logoSrc = computed((): string => {
    const themeMode = this.theme.current();
    const isDark =
      themeMode === ThemeMode.DARK || (themeMode === ThemeMode.SYSTEM && this.systemDark());
    const name = this.isExpandedLogo() ? 'logo--expanded' : 'logo';
    const suffix = isDark ? '' : '--light';

    return `/svg/${name}${suffix}.svg`;
  });

  public scrollToTopOnHome(): void {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    if (currentPath !== '/') return;

    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
