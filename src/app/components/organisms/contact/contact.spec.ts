import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
    }).compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should prevent duplicate submissions and complete the send flow', () => {
    vi.useFakeTimers();
    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    component.onSubmit();
    component.onSubmit();
    expect(timeoutSpy).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(2000);
    expect(timeoutSpy).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('should reset the status and fields', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Hello';
    component.status.set('sent');
    component.reset();
    component.reset();
    expect(component.name.length).toBe(0);
    expect(component.email.length).toBe(0);
    expect(component.message.length).toBe(0);
  });
});
