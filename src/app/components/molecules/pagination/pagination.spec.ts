import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Pagination } from './pagination';

type PaginationItem = Readonly<{ name: string }>;

@Component({
  imports: [Pagination],
  template: `
    <app-pagination
      [items]="items"
      [itemTemplate]="itemTemplate"
      [itemsPerPage]="itemsPerPage"
      [currentPage]="currentPage"
      [showPageControls]="showPageControls"
      (pageChange)="currentPage = $event"
      [buttonLabel]="buttonLabel"
    />
    <ng-template #itemTemplate let-item>
      <p class="pagination-test__item">{{ item.name }}</p>
    </ng-template>
  `,
})
class PaginationTestHost {
  public readonly items: readonly PaginationItem[] = [{ name: 'First' }, { name: 'Second' }];
  public itemsPerPage = 1;
  public currentPage = 1;
  public showPageControls = false;
  public buttonLabel = 'See more';
}

describe('Pagination', () => {
  let fixture: ComponentFixture<PaginationTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationTestHost],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationTestHost);
    fixture.detectChanges();
  });

  it('should render only the configured number of items and show the button when more remain', () => {
    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item').length).toBe(1);
    const link = fixture.nativeElement.querySelector('app-button a');
    expect(link.textContent.trim()).toBe('See more');
    expect(link.getAttribute('href')).toBe('/projects');
  });

  it('should reflect a dynamic button label', () => {
    fixture.componentInstance.buttonLabel = 'View all';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-button a').textContent.trim()).toBe('View all');
  });

  it('should hide the button when all items fit', () => {
    fixture.componentInstance.itemsPerPage = 2;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();
  });

  it('should show the requested page and emit navigation changes', () => {
    fixture.componentInstance.showPageControls = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.pagination-test__item').textContent.trim()).toBe(
      'First',
    );
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();

    fixture.nativeElement.querySelector('.pagination__control:last-child').click();
    fixture.detectChanges();

    expect(fixture.componentInstance.currentPage).toBe(2);
    expect(fixture.nativeElement.querySelector('.pagination-test__item').textContent.trim()).toBe(
      'Second',
    );
  });
});
