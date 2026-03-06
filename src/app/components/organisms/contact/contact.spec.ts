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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with idle status', () => {
    expect(component.status()).toBe('idle');
  });

  it('should set status to sending on submit', () => {
    vi.useFakeTimers();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.useRealTimers();
  });

  it('should set status to sent after timeout', () => {
    vi.useFakeTimers();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');
    vi.useRealTimers();
  });

  it('should not resubmit while already sending', () => {
    vi.useFakeTimers();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    vi.useRealTimers();
  });

  it('should reset status and fields on reset()', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Hello';
    component.onSubmit();
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');

    component.reset();
    expect(component.status()).toBe('idle');
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.message).toBe('');
    vi.useRealTimers();
  });
});
