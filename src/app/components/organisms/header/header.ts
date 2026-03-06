import { Navigation } from '@components/organisms/navigation/navigation';
import { Component, inject, computed, signal, afterNextRender, DestroyRef } from '@angular/core';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';
import { Responsive, Devices } from '@services/responsive/responsive';
import { Theme, ThemeMode } from '@services/theme/theme';

@Component({
  selector: 'app-header',
  imports: [Navigation, ThemePicker],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
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

  public readonly isDesktop = computed((): boolean =>
    this.responsive.device().includes(Devices.DESKTOP),
  );

  public readonly logoSrc = computed((): string => {
    const isDesktop = this.isDesktop();
    const themeMode = this.theme.current();
    const isDark =
      themeMode === ThemeMode.DARK || (themeMode === ThemeMode.SYSTEM && this.systemDark());

    if (isDesktop) {
      return isDark ? '/svg/logo--expanded.svg' : '/svg/logo--expanded--light.svg';
    }
    return isDark ? '/svg/logo.svg' : '/svg/logo--light.svg';
  });
}
