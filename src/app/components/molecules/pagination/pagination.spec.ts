import { NgTemplateOutlet } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Pagination } from './pagination';

type PaginationItem = Readonly<{ name: string }>;

@Component({
  imports: [Pagination, NgTemplateOutlet],
  template: `
    <app-pagination
      [items]="items"
      [itemTemplate]="itemTemplate"
      [containerTemplate]="containerTemplate"
      [itemsPerPage]="itemsPerPage()"
      [currentPage]="currentPage()"
      [showPageControls]="showPageControls()"
      (pageChange)="currentPage.set($event)"
    />
    <ng-template #containerTemplate let-itemsContent>
      <div class="pagination-test__wrapper">
        <ng-container [ngTemplateOutlet]="itemsContent" />
      </div>
    </ng-template>
    <ng-template #itemTemplate let-item>
      <p class="pagination-test__item">{{ item.name }}</p>
    </ng-template>
  `,
})
class PaginationTestHost {
  public readonly items: readonly PaginationItem[] = Array.from({ length: 8 }, (_, index) => ({
    name: `Item ${index + 1}`,
  }));
  public readonly itemsPerPage = signal(1);
  public readonly currentPage = signal(1);
  public readonly showPageControls = signal(false);
}

describe('Pagination', () => {
  let fixture: ComponentFixture<PaginationTestHost>;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationTestHost],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationTestHost);
    fixture.detectChanges();
  });

  it('should render only the configured number of items without owning a more button', () => {
    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item').length).toBe(1);
    expect(
      fixture.nativeElement
        .querySelector('.pagination-test__item')
        .parentElement.classList.contains('pagination-test__wrapper'),
    ).toBe(true);
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();
  });

  it('should hide the button when all items fit', () => {
    fixture.componentInstance.itemsPerPage.set(2);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();
  });

  it('should show the requested page and emit navigation changes', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    fixture.componentInstance.showPageControls.set(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item')).toHaveLength(1);
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();

    fixture.nativeElement.querySelector('.pagination__control:last-child').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentPage()).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item')).toHaveLength(1);
  });

  it('should render accessible arrow icons for previous and next page controls', () => {
    fixture.componentInstance.showPageControls.set(true);
    fixture.detectChanges();

    const previousButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.pagination__control[aria-label="Previous page"]',
    );
    const nextButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.pagination__control[aria-label="Next page"]',
    );

    expect(previousButton.querySelector('.material-symbols-outlined')?.textContent?.trim()).toBe(
      'arrow_back',
    );
    expect(
      previousButton.querySelector('.material-symbols-outlined')?.getAttribute('aria-hidden'),
    ).toBe('true');
    expect(previousButton.disabled).toBe(true);
    expect(nextButton.querySelector('.material-symbols-outlined')?.textContent?.trim()).toBe(
      'arrow_forward',
    );
    expect(
      nextButton.querySelector('.material-symbols-outlined')?.getAttribute('aria-hidden'),
    ).toBe('true');
  });

  it('should always show five pages including the first, adjacent, current, and last pages', () => {
    fixture.componentInstance.showPageControls.set(true);
    fixture.detectChanges();

    const pageLabels = (): string[] =>
      Array.from(
        fixture.nativeElement.querySelectorAll('.pagination__control[aria-label^="Page "]'),
        (button: HTMLButtonElement) => button.getAttribute('aria-label') ?? '',
      );

    expect(pageLabels()).toEqual(['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 8']);
    expect(fixture.nativeElement.querySelector('.pagination__ellipsis')).not.toBeNull();

    fixture.componentInstance.currentPage.set(3);
    fixture.detectChanges();

    expect(pageLabels()).toEqual(['Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 8']);
    expect(fixture.nativeElement.querySelector('.pagination__ellipsis')).not.toBeNull();

    fixture.componentInstance.currentPage.set(7);
    fixture.detectChanges();

    expect(pageLabels()).toEqual(['Page 1', 'Page 5', 'Page 6', 'Page 7', 'Page 8']);
    expect(fixture.nativeElement.querySelector('.pagination__ellipsis')).not.toBeNull();
  });

  it('should scroll to the top when the current page changes', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    fixture.componentInstance.currentPage.set(2);
    fixture.detectChanges();
    expect(scrollToSpy).toHaveBeenCalledExactlyOnceWith({ top: 0, behavior: 'smooth' });
    expect(scrollToSpy).toHaveBeenCalledExactlyOnceWith({ top: 0, behavior: 'smooth' });
  });

  it('should not scroll on initial render or when the current page stays the same', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);

    fixture.detectChanges();
    fixture.componentInstance.currentPage.set(1);
    fixture.detectChanges();
    expect(scrollToSpy).not.toHaveBeenCalled();
    expect(scrollToSpy).not.toHaveBeenCalled();
  });
});
