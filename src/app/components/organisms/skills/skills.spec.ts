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

  it('should render every category and skill', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const headings = compiled.querySelectorAll('.skills__category-name');
    expect(headings.length).toBe(component.categories.length);
    const tags = compiled.querySelectorAll('.skills__tag');
    const totalSkills = component.categories.reduce((sum, cat) => sum + cat.skills.length, 0);
    expect(tags.length).toBe(totalSkills);
  });
});
