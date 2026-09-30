import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Button } from './button';

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a primary button by default', () => {
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');

    expect(button?.type).toBe('button');
    expect(button?.classList.contains('button--primary')).toBe(true);
  });

  it('should render a router link when a route is provided', () => {
    fixture.componentRef.setInput('routerLink', ['/projects']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')?.getAttribute('href')).toBe('/projects');
  });

  it('should render an external link with the requested attributes', () => {
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.componentRef.setInput('target', '_blank');
    fixture.componentRef.setInput('rel', 'noopener noreferrer');
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');

    expect(link?.href).toBe('https://example.com/');
    expect(link?.target).toBe('_blank');
    expect(link?.rel).toBe('noopener noreferrer');
  });
});
