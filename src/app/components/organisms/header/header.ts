import { DOCUMENT } from '@angular/common';
import { Navigation } from '@components/organisms/navigation/navigation';
import { Component, inject, computed, signal, afterNextRender, DestroyRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Theme, ThemeMode } from '@services/theme/theme';

type LogoDimensions = Readonly<{
  width: number;
  height: number;
}>;

const COMPACT_LOGO_DIMENSIONS: LogoDimensions = { width: 512, height: 512 };
const EXPANDED_LOGO_DIMENSIONS = {
  dark: { width: 5046, height: 512 },
  light: { width: 4984, height: 512 },
} as const satisfies Record<string, LogoDimensions>;

@Component({
  selector: 'app-header',
  imports: [Navigation, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
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

  private readonly isDarkLogoTheme = computed(
    (): boolean =>
      this.theme.current() === ThemeMode.DARK ||
      (this.theme.current() === ThemeMode.SYSTEM && this.systemDark()),
  );

  public readonly compactLogoSrc = computed(
    (): string => `/svg/logo${this.isDarkLogoTheme() ? '' : '--light'}.svg`,
  );

  public readonly expandedLogoSrc = computed(
    (): string => `/svg/logo--expanded${this.isDarkLogoTheme() ? '' : '--light'}.svg`,
  );

  public readonly compactLogoDimensions: LogoDimensions = COMPACT_LOGO_DIMENSIONS;

  public readonly expandedLogoDimensions = computed((): LogoDimensions =>
    this.isDarkLogoTheme() ? EXPANDED_LOGO_DIMENSIONS.dark : EXPANDED_LOGO_DIMENSIONS.light,
  );

  public scrollToTopOnHome(): void {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    if (currentPath !== '/') return;

    this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
