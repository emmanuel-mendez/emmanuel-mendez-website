import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skills } from './skills';

describe('Skills', () => {
  let component: Skills;
  let fixture: ComponentFixture<Skills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skills],
    }).compileComponents();

    fixture = TestBed.createComponent(Skills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have six skill categories', () => {
    expect(component.categories.length).toBe(6);
  });

  it('should render each category heading', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const headings = compiled.querySelectorAll('.skills__category-name');
    expect(headings.length).toBe(component.categories.length);
  });

  it('should render skill tags', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const tags = compiled.querySelectorAll('.skills__tag');
    const totalSkills = component.categories.reduce((sum, cat) => sum + cat.skills.length, 0);
    expect(tags.length).toBe(totalSkills);
  });
});
