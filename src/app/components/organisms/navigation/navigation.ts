import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsiveIncludes } from '@pipes/responsive/includes/includes';
import { Devices, Responsive } from '@services/responsive/responsive';
import { ThemePicker } from '@components/atoms/theme-picker/theme-picker/theme-picker';
import { Button } from '@components/atoms/button/button';

type NavigationItem = {
  readonly href: string;
  readonly label: string;
};

const BODY_SCROLL_LOCK_CLASS = 'navigation--menu-open';
const FIRST_MENU_LINK_SELECTOR = '[data-navigation-first-link="true"]';
const TOGGLE_BUTTON_SELECTOR = '.navigation__button button';

@Component({
  selector: 'app-navigation',
  imports: [Button, ResponsiveIncludes, ThemePicker],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly responsive: Responsive = inject(Responsive);

  public readonly breakpoints: typeof Devices = Devices;

  public readonly opened = signal<boolean>(false);
  public readonly mobileMenuId = 'navigation-mobile-menu';

  public readonly navigationItems: readonly NavigationItem[] = [
    { href: '/projects', label: 'Projects' },
    { href: '#home-about', label: 'About' },
    { href: '#home-projects', label: 'Projects' },
    { href: '#home-experience', label: 'Experience' },
    { href: '#home-skills', label: 'Skills' },
    { href: '#home-testimonials', label: 'Testimonials' },
    { href: '#home-contact', label: 'Contact' },
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
    const nextStatus = !this.opened();
    this.opened.set(nextStatus);
    if (nextStatus) {
      this.focusFirstMenuLink();
      return;
    }

    this.focusToggleButton();
  }

  public closeMenu(): void {
    if (this.opened() === false) {
      return;
    }

    this.opened.set(false);
    this.focusToggleButton();
  }

  public onMenuEscape(event: Event): void {
    event.preventDefault();
    this.closeMenu();
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

  private focusFirstMenuLink(): void {
    queueMicrotask(() => {
      this.hostElement.nativeElement.querySelector<HTMLElement>(FIRST_MENU_LINK_SELECTOR)?.focus();
    });
  }

  private focusToggleButton(): void {
    queueMicrotask(() => {
      this.hostElement.nativeElement
        .querySelector<HTMLButtonElement>(TOGGLE_BUTTON_SELECTOR)
        ?.focus();
    });
  }

  public isCurrentRoute(href: string): boolean {
    const currentPath = this.router.url.split('?')[0].split('#')[0];
    return currentPath === href;
  }
}
