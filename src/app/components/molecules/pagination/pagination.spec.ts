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
    expect(fixture.nativeElement.querySelector('app-button')).toBeTruthy();
  });

  it('should hide the button when all items fit and reflect a dynamic label', () => {
    fixture.componentInstance.itemsPerPage = 2;
    fixture.componentInstance.buttonLabel = 'View all';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.pagination-test__item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('app-button')).toBeNull();
  });
});
