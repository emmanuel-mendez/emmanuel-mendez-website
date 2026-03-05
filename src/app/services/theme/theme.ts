import { effect, Injectable, signal, WritableSignal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
}

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly platformId = inject(PLATFORM_ID);

  public readonly current: WritableSignal<ThemeMode> = signal<ThemeMode>(this.getInitialTheme());
  public readonly loading: WritableSignal<boolean> = signal<boolean>(true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loading.set(false);
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('theme', this.current());

        const classList: DOMTokenList = document.documentElement.classList;
        const themeClasses: string[] = Array.from(classList).filter((mode) =>
          mode.startsWith('theme--'),
        );

        classList.remove(...themeClasses);
        if (this.current() !== ThemeMode.SYSTEM) {
          classList.add(`theme--${this.current()}`);
        }
      }
    });
  }

  private getInitialTheme(): ThemeMode {
    if (!isPlatformBrowser(this.platformId)) {
      return ThemeMode.SYSTEM;
    }

    const persistedMode = localStorage.getItem('theme');
    return this.isThemeMode(persistedMode) ? persistedMode : ThemeMode.SYSTEM;
  }

  private isThemeMode(mode: string | null): mode is ThemeMode {
    return mode === ThemeMode.LIGHT || mode === ThemeMode.DARK || mode === ThemeMode.SYSTEM;
  }

  set(mode: ThemeMode) {
    this.current.set(mode);
  }
}
