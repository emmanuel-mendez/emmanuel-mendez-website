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

  it('should render experience entries under the section title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.job-experience__title')).not.toBeNull();
    expect(compiled.querySelectorAll('.job-experience__item').length).toBe(
      component.experiences.length,
    );
  });
});
