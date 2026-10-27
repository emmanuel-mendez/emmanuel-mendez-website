import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filter, FilterCategory } from './filter';

type TestItem = {
  name: string;
  technologies: readonly string[];
  year: number;
};

describe('Filter', () => {
  let fixture: ComponentFixture<Filter<TestItem>>;
  let component: Filter<TestItem>;

  const list: readonly TestItem[] = [
    { name: 'Alpha', technologies: ['Angular'], year: 2024 },
    { name: 'Beta', technologies: ['React'], year: 2025 },
    { name: 'Gamma', technologies: ['Angular', 'React'], year: 2025 },
  ];
  const categories: readonly FilterCategory<TestItem>[] = [
    { name: 'Technology', property: 'technologies', properties: ['Angular', 'React'] },
    { name: 'Year', property: 'year', properties: ['2024', '2025'] },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filter],
    }).compileComponents();

    fixture = TestBed.createComponent(Filter<TestItem>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('list', list);
    fixture.componentRef.setInput('categories', categories);
    fixture.detectChanges();
  });

  it('should provide a default sorting option', () => {
    expect(component.sortProperties()).toHaveLength(1);
    expect(component.sortProperty()).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.filter__sort')).not.toBeNull();
  });

  it('should emit the selected sorting property', () => {
    const sortPropertyChange = vi.spyOn(component.sortPropertyChange, 'emit');
    fixture.componentRef.setInput('sortProperties', ['default', 'alternate']);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('.filter__sort') as HTMLSelectElement;
    select.value = 'alternate';
    select.dispatchEvent(new Event('change'));

    expect(sortPropertyChange).toHaveBeenCalledOnce();
  });

  it('should filter array values and intersect selections from different categories', () => {
    component.toggleProperty(categories[0], 'Angular');
    component.toggleProperty(categories[1], '2025');

    expect(component.filteredList()).toHaveLength(1);
    expect(component.filteredList()[0]).toBe(list[2]);
  });

  it('should clear selected properties', () => {
    component.toggleProperty(categories[0], 'Angular');
    component.clearFilters();

    expect(component.filteredList()).toHaveLength(list.length);
  });
});
