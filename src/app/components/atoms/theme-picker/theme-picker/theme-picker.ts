import { Component, computed, inject, signal } from '@angular/core';
import { ThemeMode, Theme } from '@services/theme/theme';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.html',
  styleUrl: './theme-picker.css',
})
export class ThemePicker {
  public readonly dropdownStatus = signal(false);
  private readonly modeIconMap: Record<ThemeMode, string> = {
    [ThemeMode.LIGHT]: 'light_mode',
    [ThemeMode.DARK]: 'dark_mode',
    [ThemeMode.SYSTEM]: 'desktop_windows',
  };

  public readonly theme: Theme = inject(Theme);
  public readonly modes: { label: string; value: ThemeMode; icon: string }[] = [
    { label: 'Light', value: ThemeMode.LIGHT, icon: 'light_mode' },
    { label: 'Dark', value: ThemeMode.DARK, icon: 'dark_mode' },
    { label: 'System', value: ThemeMode.SYSTEM, icon: 'desktop_windows' },
  ];
  public readonly currentModeIcon = computed((): string => this.modeIconMap[this.theme.current()]);

  public toggleDropdown(): void {
    this.dropdownStatus.set(!this.dropdownStatus());
  }

  public selectTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    this.dropdownStatus.set(false);
  }
}
