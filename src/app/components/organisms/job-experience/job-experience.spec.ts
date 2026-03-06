import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExperience } from './job-experience';

describe('JobExperience', () => {
  let component: JobExperience;
  let fixture: ComponentFixture<JobExperience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobExperience],
    }).compileComponents();

    fixture = TestBed.createComponent(JobExperience);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render at least one experience entry', () => {
    expect(component.experiences.length).toBeGreaterThan(0);
  });

  it('should display the section title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.job-experience__title')?.textContent?.trim()).toBe(
      'Work Experience',
    );
  });
});
