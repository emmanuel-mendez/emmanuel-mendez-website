import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, computed, effect, inject, input, output } from '@angular/core';

type PaginationItemsTemplate = TemplateRef<unknown>;
type PaginationContainerContext = { $implicit: PaginationItemsTemplate };

@Component({
  selector: 'app-pagination',
  imports: [NgTemplateOutlet],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination<T> {
  private readonly document = inject(DOCUMENT);
  private previousPage: number | undefined;

  public readonly items = input.required<readonly T[]>();
  public readonly itemTemplate = input.required<TemplateRef<{ $implicit: T }>>();
  public readonly containerTemplate = input<TemplateRef<PaginationContainerContext> | null>(null);
  public readonly itemsPerPage = input(3);
  public readonly currentPage = input(1);
  public readonly showPageControls = input(false);
  public readonly pageChange = output<number>();

  public readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.items().length / Math.max(1, this.itemsPerPage()))),
  );
  public readonly activePage = computed(() =>
    Math.min(Math.max(1, this.currentPage()), this.pageCount()),
  );
  public readonly pageNumbers = computed(() => {
    const activePage = this.activePage();
    const lastPage = this.pageCount();
    const visiblePages = new Set<number>([
      1,
      Math.max(1, activePage - 1),
      activePage,
      Math.min(lastPage, activePage + 1),
      lastPage,
    ]);

    for (let distance = 2; visiblePages.size < Math.min(5, lastPage); distance += 1) {
      const previousPage = activePage - distance;
      const nextPage = activePage + distance;

      if (previousPage > 1) {
        visiblePages.add(previousPage);
      }

      if (visiblePages.size < Math.min(5, lastPage) && nextPage < lastPage) {
        visiblePages.add(nextPage);
      }
    }

    return [...visiblePages].sort((firstPage, secondPage) => firstPage - secondPage);
  });
  public readonly visibleItems = computed(() => {
    const pageSize = Math.max(0, this.itemsPerPage());
    const start = this.showPageControls() ? (this.activePage() - 1) * pageSize : 0;
    return this.items().slice(start, start + pageSize);
  });

  constructor() {
    effect(() => {
      const page = this.currentPage();
      if (this.previousPage === undefined) {
        this.previousPage = page;
        return;
      }

      if (this.previousPage === page) {
        return;
      }

      this.previousPage = page;
      this.document.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  public changePage(page: number): void {
    const nextPage = Math.min(Math.max(1, page), this.pageCount());
    if (nextPage === this.activePage()) {
      return;
    }

    this.pageChange.emit(nextPage);
  }
}
