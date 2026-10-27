import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePicker } from './theme-picker';

describe('ThemePicker', () => {
  let component: ThemePicker;
  let fixture: ComponentFixture<ThemePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should apply the selected theme and close the menu', () => {
    component.dropdownStatus.set(true);

    component.selectTheme(component.modes[1].value);

    expect(component.dropdownStatus()).toBe(false);
  });
});
