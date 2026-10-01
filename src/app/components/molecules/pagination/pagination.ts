import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, computed, input, output } from '@angular/core';
import { Button } from '@components/atoms/button/button';

@Component({
  selector: 'app-pagination',
  imports: [Button, NgTemplateOutlet],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination<T> {
  public readonly items = input.required<readonly T[]>();
  public readonly itemTemplate = input.required<TemplateRef<{ $implicit: T }>>();
  public readonly itemsPerPage = input(3);
  public readonly currentPage = input(1);
  public readonly showPageControls = input(false);
  public readonly buttonLabel = input('See more');
  public readonly buttonRoute = input<readonly string[]>(['/projects']);
  public readonly pageChange = output<number>();

  public readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.items().length / Math.max(1, this.itemsPerPage()))),
  );
  public readonly activePage = computed(() =>
    Math.min(Math.max(1, this.currentPage()), this.pageCount()),
  );
  public readonly pageNumbers = computed(() =>
    Array.from({ length: this.pageCount() }, (_, index) => index + 1),
  );
  public readonly visibleItems = computed(() => {
    const pageSize = Math.max(0, this.itemsPerPage());
    const start = this.showPageControls() ? (this.activePage() - 1) * pageSize : 0;
    return this.items().slice(start, start + pageSize);
  });
  public readonly hasMoreItems = computed(
    () => !this.showPageControls() && this.items().length > Math.max(0, this.itemsPerPage()),
  );

  public changePage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), this.pageCount());
    if (nextPage === this.activePage()) {
      return;
    }

    this.pageChange.emit(nextPage);
  }
}
