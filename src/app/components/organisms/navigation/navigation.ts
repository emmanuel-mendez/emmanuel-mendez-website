import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';
import { Button } from '@components/atoms/button/button';
import { Dialog } from '@components/templates/dialog/dialog';

type NavigationItem = {
  readonly href: string;
  readonly label: string;
};

@Component({
  selector: 'app-navigation',
  imports: [Button, ThemePicker, Dialog],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  public readonly opened = signal<boolean>(false);
  public readonly mobileMenuId = 'navigation-mobile-menu';

  public readonly navigationItems: readonly NavigationItem[] = [
    { href: '#home-about', label: 'About' },
    { href: '#home-projects', label: 'Projects' },
    { href: '#home-experience', label: 'Experience' },
    { href: '#home-skills', label: 'Skills' },
    { href: '#home-testimonials', label: 'Testimonials' },
    { href: '#home-contact', label: 'Contact' },
  ];

  public toggleMenu(): void {
    this.opened.update((opened) => !opened);
  }

  public closeMenu(): void {
    if (this.opened() === false) {
      return;
    }

    this.opened.set(false);
  }

  public onNavigationLinkClick(event: MouseEvent, href: string): void {
    if (
      !href.startsWith('#') ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = this.document.getElementById(href.slice(1));
    if (!target) {
      return;
    }

    event.preventDefault();
    this.document.defaultView?.history.pushState(null, '', href);
    target.scrollIntoView({ behavior: 'smooth' });
  }

  public isCurrentRoute(href: string): boolean {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    return currentPath === href;
  }
}
