import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
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
      [itemsPerPage]="itemsPerPage"
      [currentPage]="currentPage"
      [showPageControls]="showPageControls"
      (pageChange)="currentPage = $event"
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
  public readonly items: readonly PaginationItem[] = [{ name: 'First' }, { name: 'Second' }];
  public itemsPerPage = 1;
  public currentPage = 1;
  public showPageControls = false;
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
