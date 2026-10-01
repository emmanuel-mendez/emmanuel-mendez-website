import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render its default label and route', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link.textContent.trim()).toBe('See more');
    expect(link.getAttribute('href')).toBe('/projects');
  });

  it('should accept a dynamic label', () => {
    fixture.componentRef.setInput('label', 'View all projects');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent.trim()).toBe('View all projects');
  });
});
