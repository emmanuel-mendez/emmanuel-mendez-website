import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  const fillForm = (name: string, email: string, message: string): void => {
    component.form.setValue({ name, email, message });
  };

  const fillValidForm = (): void => {
    fillForm('John', 'john@example.com', 'A valid message with enough characters.');
  };

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
    fillValidForm();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    const scheduledCount: number = timeoutSpy.mock.calls.length;
    component.onSubmit();
    expect(component.status()).toBe('sending');
    expect(timeoutSpy.mock.calls.length).toBe(scheduledCount);
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');
  });

  it('should keep submit disabled when fields only contain whitespace', () => {
    fillForm('   ', '   ', '   ');
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'app-button.contact__button button',
    ) as HTMLButtonElement;

    expect(component.isFormFilled()).toBe(false);
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit when the form is valid and filled', () => {
    fillValidForm();
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      'app-button.contact__button button',
    ) as HTMLButtonElement;

    expect(component.isFormInvalid()).toBe(false);
    expect(component.isFormFilled()).toBe(true);
    expect(submitButton.disabled).toBe(false);
  });

  it('should update the message counter as the user writes', () => {
    component.messageControl.setValue('Accessibility improvements requested.');
    fixture.detectChanges();

    const counter = fixture.nativeElement.querySelector('#contact-message-counter');
    expect(counter?.textContent?.trim()).toBe('37/1000 characters');
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
    fillValidForm();
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
    fillValidForm();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.useRealTimers();
  });

  it('should set status to sent after timeout', () => {
    vi.useFakeTimers();
    fillValidForm();
    component.onSubmit();
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    expect(component.status()).toBe('sent');
  });

  it('should reset the status and fields', () => {
    vi.useFakeTimers();
    fillValidForm();
    component.status.set('sent');
    component.reset();
    component.reset();
    expect(component.status()).toBe('idle');
    expect(component.nameControl.value.length).toBe(0);
    expect(component.emailControl.value.length).toBe(0);
    expect(component.messageControl.value.length).toBe(0);
  });

  it('should strip non-letter characters from the name input as the user types', () => {
    const nameInput = fixture.nativeElement.querySelector('#contact-name') as HTMLInputElement;

    nameInput.value = 'John123 Doe!';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.nameControl.value).toBe('John Doe');
    expect(nameInput.value).toBe('John Doe');
  });

  it('should keep letters, accents, and spaces in the name input', () => {
    const nameInput = fixture.nativeElement.querySelector('#contact-name') as HTMLInputElement;

    nameInput.value = 'María José Ñuño';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.nameControl.value).toBe('María José Ñuño');
    expect(nameInput.value).toBe('María José Ñuño');
  });

  it('should block submit and show an error when the name has non-letter characters', async () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    fillForm('John3', 'john@example.com', 'A valid message with enough characters.');
    fixture.detectChanges();
    await fixture.whenStable();

    const form = nativeElement.querySelector('.contact__form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    const nameError = nativeElement.querySelector('#contact-name-error');
    const validationMessages = nativeElement.querySelectorAll('.contact__error');

    expect(component.status()).toBe('idle');
    expect(validationMessages.length).toBe(1);
    expect(nameError?.textContent).toContain('only letters');
  });

  it('should trim user fields before sending the message', () => {
    vi.useFakeTimers();
    fillForm(' John ', ' john@example.com ', ' Message with spaces and details ');

    component.onSubmit();

    expect(component.nameControl.value).toBe('John');
    expect(component.emailControl.value).toBe('john@example.com');
    expect(component.messageControl.value).toBe('Message with spaces and details');
    expect(component.status()).toBe('sending');
    vi.advanceTimersByTime(2000);
    vi.useRealTimers();
  });
});
