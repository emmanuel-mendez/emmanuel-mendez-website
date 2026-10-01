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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default the sorting property to Relevance', () => {
    expect(component.sortProperties()).toEqual(['Relevance']);
    expect(component.sortProperty()).toBe('Relevance');
    expect(fixture.nativeElement.querySelector('.filter__sort').value).toBe('Relevance');
  });

  it('should emit the selected sorting property', () => {
    const sortPropertyChange = vi.spyOn(component.sortPropertyChange, 'emit');
    fixture.componentRef.setInput('sortProperties', ['Relevance', 'Alphabetically']);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('.filter__sort') as HTMLSelectElement;
    select.value = 'Alphabetically';
    select.dispatchEvent(new Event('change'));

    expect(sortPropertyChange).toHaveBeenCalledWith('Alphabetically');
  });

  it('should filter array values and intersect selections from different categories', () => {
    component.toggleProperty(categories[0], 'Angular');
    component.toggleProperty(categories[1], '2025');

    expect(component.filteredList()).toEqual([list[2]]);
  });

  it('should clear selected properties', () => {
    component.toggleProperty(categories[0], 'Angular');
    component.clearFilters();

    expect(component.filteredList()).toEqual(list);
  });
});
