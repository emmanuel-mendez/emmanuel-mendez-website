import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Button } from './button';

describe('Button', () => {
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Button],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    fixture.detectChanges();
  });

  it('should render a primary button by default', () => {
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');

    expect(button).not.toBeNull();
    expect(button?.classList.contains('button--primary')).toBe(true);
  });

  it('should render a router link for either route input', () => {
    fixture.componentRef.setInput('route', ['/projects']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')).not.toBeNull();

    fixture.componentRef.setInput('route', null);
    fixture.componentRef.setInput('routerLink', ['/projects']);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a')).not.toBeNull();
  });

  it('should render an external link with the requested attributes', () => {
    fixture.componentRef.setInput('href', 'https://example.com');
    fixture.componentRef.setInput('target', '_blank');
    fixture.componentRef.setInput('rel', 'noopener noreferrer');
    fixture.detectChanges();

    const link: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');

    expect(link).not.toBeNull();
    expect(link?.hasAttribute('href')).toBe(true);
    expect(link?.hasAttribute('target')).toBe(true);
    expect(link?.hasAttribute('rel')).toBe(true);
  });
});
