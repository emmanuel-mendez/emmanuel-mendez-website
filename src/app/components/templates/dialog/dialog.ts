import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, effect, inject, input, output } from '@angular/core';

export type DialogFocusSelector = string | null;

const SCROLL_LOCK_CLASS = 'dialog--open';
const DEFAULT_INITIAL_FOCUS_SELECTOR =
  '[tabindex], a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
  host: {
    '(keydown.escape)': 'onEscapeKey($event)',
  },
})
export class Dialog {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly open = input<boolean>(false);
  public readonly backdropLabel = input<string>('Close dialog');
  public readonly initialFocusSelector = input<DialogFocusSelector>(null);
  public readonly returnFocusSelector = input<DialogFocusSelector>(null);
  public readonly closed = output<void>();

  private wasOpen = false;
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const isOpen = this.open();
      this.document.body.classList.toggle(SCROLL_LOCK_CLASS, isOpen);

      const justOpened = isOpen && !this.wasOpen;
      const justClosed = !isOpen && this.wasOpen;
      this.wasOpen = isOpen;

      if (justOpened) {
        this.captureActiveElement();
        this.focusInitialElement();
      }

      if (justClosed) {
        this.restoreFocus();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.document.body.classList.remove(SCROLL_LOCK_CLASS);
    });
  }

  public close(): void {
    if (!this.open()) {
      return;
    }

    this.closed.emit();
  }

  public onEscapeKey(event: Event): void {
    if (!this.open()) {
      return;
    }

    event.preventDefault();
    this.close();
  }

  private captureActiveElement(): void {
    const activeElement = this.document.activeElement;
    this.previouslyFocusedElement = activeElement instanceof HTMLElement ? activeElement : null;
  }

  private focusInitialElement(): void {
    const selector = this.initialFocusSelector() ?? DEFAULT_INITIAL_FOCUS_SELECTOR;
    queueMicrotask(() => {
      this.hostElement.nativeElement.querySelector<HTMLElement>(selector)?.focus();
    });
  }

  private restoreFocus(): void {
    const selector = this.returnFocusSelector();
    queueMicrotask(() => {
      const target =
        (selector ? this.document.querySelector<HTMLElement>(selector) : null) ??
        this.previouslyFocusedElement;
      target?.focus();
      this.previouslyFocusedElement = null;
    });
  }
}
