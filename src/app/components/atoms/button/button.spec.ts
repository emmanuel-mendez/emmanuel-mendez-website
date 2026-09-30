import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Button } from './button';

@Component({
  imports: [Button],
  template: '<app-button [routerLink]="[\'/projects\']" label="View projects" />',
})
class RouterLinkButtonHost {}

describe('Button', () => {
  let component: Button;
  let fixture: ComponentFixture<Button>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [Button, RouterLinkButtonHost],
=======
      imports: [Button],
>>>>>>> origin/main
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Button);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

<<<<<<< HEAD
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

  it('should render the label in a router link', () => {
    const hostFixture: ComponentFixture<RouterLinkButtonHost> =
      TestBed.createComponent(RouterLinkButtonHost);
    hostFixture.detectChanges();

    expect(hostFixture.nativeElement.querySelector('a')?.textContent?.trim()).toBe('View projects');
=======
  it('should render its default label and route', () => {
    const link = fixture.nativeElement.querySelector('a');
    expect(link.textContent.trim()).toBe('See more');
    expect(link.getAttribute('href')).toBe('/projects');
  });

  it('should accept a dynamic label', () => {
    fixture.componentRef.setInput('label', 'View all projects');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a').textContent.trim()).toBe('View all projects');
>>>>>>> origin/main
  });
});
