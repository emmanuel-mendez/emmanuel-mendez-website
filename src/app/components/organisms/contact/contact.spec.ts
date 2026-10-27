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
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Message';
    component.onSubmit();
    expect(component.status()).toBe('sending');
    component.onSubmit();
    expect(component.status()).toBe('sending');
    expect(timeoutSpy).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');
    expect(timeoutSpy).toHaveBeenCalledOnce();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with idle status', () => {
    expect(component.status()).toBe('idle');
  });

  it('should use the shared Button component for submission', () => {
    const submitButton: HTMLButtonElement | null = fixture.nativeElement.querySelector(
      'app-button.contact__button button',
    );

    expect(submitButton?.type).toBe('submit');
  });

  it('should render English contact copy', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;

    expect(nativeElement.querySelector('.contact__title')?.textContent?.trim()).toBe('Contact');
    expect(nativeElement.querySelector('.contact__subtitle')?.textContent?.trim()).toBe(
      'Do you have a project in mind? Send me a message.',
    );
    expect(nativeElement.querySelector('#contact-name')?.getAttribute('placeholder')).toBe(
      'Your full name',
    );
    expect(nativeElement.querySelector('#contact-email')?.getAttribute('placeholder')).toBe(
      'you@example.com',
    );
    expect(nativeElement.querySelector('#contact-message')?.getAttribute('placeholder')).toBe(
      'Write your message here...',
    );
  });

  it('should keep submit disabled when fields only contain whitespace', () => {
    component.name = '   ';
    component.email = '   ';
    component.message = '   ';
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'app-button.contact__button button',
    ) as HTMLButtonElement;

    expect(component.isFormFilled()).toBe(false);
    expect(submitButton.disabled).toBe(true);
  });

  it('should expose an accessible message counter with explicit max length', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const textarea = nativeElement.querySelector('#contact-message');
    const counter = nativeElement.querySelector('#contact-message-counter');

    expect(component.messageMaxLength).toBe(1000);
    expect(textarea?.getAttribute('maxlength')).toBe('1000');
    expect(textarea?.getAttribute('aria-describedby')).toContain('contact-message-counter');
    expect(counter?.getAttribute('role')).toBe('status');
    expect(counter?.textContent?.trim()).toBe('0/1000 characters');
  });

  it('should update the message counter as the user writes', () => {
    component.message = 'Accessibility improvements requested.';
    fixture.detectChanges();

    const counter = fixture.nativeElement.querySelector('#contact-message-counter');
    expect(counter?.textContent?.trim()).toBe('37/1000 characters');
  });

  it('should expose accessible form metadata and field autocompletion', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const form = nativeElement.querySelector('.contact__form');
    const nameInput = nativeElement.querySelector('#contact-name');
    const emailInput = nativeElement.querySelector('#contact-email');
    const messageInput = nativeElement.querySelector('#contact-message');

    expect(form?.getAttribute('novalidate')).not.toBeNull();
    expect(form?.getAttribute('aria-busy')).toBe('false');
    expect(nameInput?.getAttribute('autocomplete')).toBe('name');
    expect(emailInput?.getAttribute('autocomplete')).toBe('email');
    expect(emailInput?.getAttribute('inputmode')).toBe('email');
    expect(messageInput?.getAttribute('maxlength')).toBe('1000');
  });

  it('should prevent submit and show validation errors for invalid form values', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const form = nativeElement.querySelector('.contact__form') as HTMLFormElement;

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const invalidFields = nativeElement.querySelectorAll('.contact__input[aria-invalid="true"]');
    const validationMessages = nativeElement.querySelectorAll('.contact__error');

    expect(component.status()).toBe('idle');
    expect(invalidFields.length).toBe(3);
    expect(validationMessages.length).toBe(3);
  });

  it('should mark the form as busy while sending', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Message';
    component.onSubmit();
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('.contact__form') as HTMLFormElement;

    expect(component.status()).toBe('sending');
    expect(form.getAttribute('aria-busy')).toBe('true');
    vi.advanceTimersByTime(2000);
    vi.useRealTimers();
  });

  it('should set status to sending on submit', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Message';
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.useRealTimers();
  });

  it('should set status to sent after timeout', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Message';
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');
  });

  it('should reset the status and fields', () => {
    vi.useFakeTimers();
    component.name = 'John';
    component.email = 'john@example.com';
    component.message = 'Hello';
    component.status.set('sent');
    component.reset();
    component.reset();
    expect(component.status()).toBe('idle');
    expect(component.name.length).toBe(0);
    expect(component.email.length).toBe(0);
    expect(component.message.length).toBe(0);
  });

  it('should trim user fields before sending the message', () => {
    vi.useFakeTimers();
    component.name = ' John ';
    component.email = ' john@example.com ';
    component.message = ' Message with spaces ';

    component.onSubmit();

    expect(component.name).toBe('John');
    expect(component.email).toBe('john@example.com');
    expect(component.message).toBe('Message with spaces');
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    vi.useRealTimers();
  });
});
