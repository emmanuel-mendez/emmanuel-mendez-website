import { Component, computed, input, output, signal } from '@angular/core';
import { Button } from '@components/atoms/button/button';

export type FilterCategory<T extends object> = {
  name: string;
  property: keyof T & string;
  properties: readonly string[];
};

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filter.html',
  styleUrl: './filter.css',
  imports: [Button],
})
export class Filter<T extends object> {
  public readonly list = input.required<readonly T[]>();
  public readonly categories = input.required<readonly FilterCategory<T>[]>();
  public readonly sortProperties = input<readonly string[]>(['Relevance']);
  public readonly sortProperty = input('Relevance');
  public readonly filteredListChange = output<readonly T[]>();
  public readonly sortPropertyChange = output<string>();

  private readonly selectedProperties = signal<Readonly<Record<string, readonly string[]>>>({});

  public readonly filteredList = computed(() => {
    const selected = this.selectedProperties();
    return this.list().filter((item) =>
      this.categories().every((category) => {
        const selectedValues = selected[category.property] ?? [];
        if (selectedValues.length === 0) {
          return true;
        }

        const value = item[category.property];
        return Array.isArray(value)
          ? value.some((entry: unknown) => selectedValues.includes(String(entry)))
          : selectedValues.includes(String(value));
      }),
    );
  });

  public isSelected(category: FilterCategory<T>, property: string): boolean {
    return (this.selectedProperties()[category.property] ?? []).includes(property);
  }

  public toggleProperty(category: FilterCategory<T>, property: string): void {
    const selected = this.selectedProperties();
    const categoryProperties = selected[category.property] ?? [];
    const nextCategoryProperties = categoryProperties.includes(property)
      ? categoryProperties.filter((selectedProperty) => selectedProperty !== property)
      : [...categoryProperties, property];

    this.selectedProperties.set({
      ...selected,
      [category.property]: nextCategoryProperties,
    });
    this.filteredListChange.emit(this.filteredList());
  }

  public clearFilters(): void {
    this.selectedProperties.set({});
    this.filteredListChange.emit(this.filteredList());
  }

  public changeSortProperty(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) {
      return;
    }

    const property = target.value;
    if (!this.sortProperties().includes(property)) {
      return;
    }

    this.sortPropertyChange.emit(property);
  }
}
