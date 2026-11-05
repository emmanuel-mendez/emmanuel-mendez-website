import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dialog } from './dialog';

@Component({
  imports: [Dialog],
  template: `
    <button class="test-trigger" type="button" (click)="open.set(true)">Open dialog</button>
    <app-dialog
      [open]="open()"
      backdropLabel="Close test dialog"
      initialFocusSelector=".test-panel"
      returnFocusSelector=".test-trigger"
      (closed)="onClosed()"
    >
      <div class="test-panel" tabindex="-1">
        <button class="test-action" type="button">Action</button>
      </div>
    </app-dialog>
  `,
})
class DialogTestHost {
  public readonly open = signal<boolean>(false);
  public closedCount = 0;

  public onClosed(): void {
    this.closedCount += 1;
    this.open.set(false);
  }
}

describe('Dialog', () => {
  let fixture: ComponentFixture<DialogTestHost>;
  let host: DialogTestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogTestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    document.body.classList.remove('dialog--open');
  });

  it('should render the backdrop only while open and close on backdrop click', () => {
    expect(fixture.nativeElement.querySelector('.dialog__backdrop')).toBeNull();

    host.open.set(true);
    fixture.detectChanges();

    const backdrop = fixture.nativeElement.querySelector(
      '.dialog__backdrop',
    ) as HTMLButtonElement | null;
    expect(backdrop).toBeTruthy();
    expect(backdrop?.getAttribute('aria-label')).toBe('Close test dialog');

    backdrop?.click();
    fixture.detectChanges();

    expect(host.closedCount).toBe(1);
    expect(host.open()).toBe(false);
    expect(fixture.nativeElement.querySelector('.dialog__backdrop')).toBeNull();
  });

  it('should close on Escape only while open', () => {
    const panel = fixture.nativeElement.querySelector('.test-panel') as HTMLElement;
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();

    expect(host.closedCount).toBe(0);

    host.open.set(true);
    fixture.detectChanges();

    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      cancelable: true,
    });
    panel.dispatchEvent(escapeEvent);
    fixture.detectChanges();

    expect(escapeEvent.defaultPrevented).toBe(true);
    expect(host.closedCount).toBe(1);
    expect(host.open()).toBe(false);
  });

  it('should lock body scroll while open and unlock on destroy', () => {
    host.open.set(true);
    fixture.detectChanges();

    expect(document.body.classList.contains('dialog--open')).toBe(true);

    host.open.set(false);
    fixture.detectChanges();

    expect(document.body.classList.contains('dialog--open')).toBe(false);

    host.open.set(true);
    fixture.detectChanges();
    fixture.destroy();

    expect(document.body.classList.contains('dialog--open')).toBe(false);
  });

  it('should move focus into the dialog on open and return focus on close', async () => {
    const trigger = fixture.nativeElement.querySelector('.test-trigger') as HTMLButtonElement;
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const panel = fixture.nativeElement.querySelector('.test-panel') as HTMLElement;
    expect(document.activeElement).toBe(panel);

    const backdrop = fixture.nativeElement.querySelector('.dialog__backdrop') as HTMLButtonElement;
    backdrop.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.activeElement).toBe(trigger);
  });
});
