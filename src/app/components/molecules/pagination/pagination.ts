import { NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, computed, input } from '@angular/core';
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
  public readonly buttonLabel = input('See more');
  public readonly buttonRoute = input<readonly string[]>(['/projects']);

  public readonly visibleItems = computed(() =>
    this.items().slice(0, Math.max(0, this.itemsPerPage())),
  );
  public readonly hasMoreItems = computed(
    () => this.items().length > Math.max(0, this.itemsPerPage()),
  );
}
