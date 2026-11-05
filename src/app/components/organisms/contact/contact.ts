import { Component, computed, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@components/atoms/button/button';

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

type ContactFormValue = {
  name: string;
  email: string;
  message: string;
};

type ContactFormControls = {
  name: FormControl<string>;
  email: FormControl<string>;
  message: FormControl<string>;
};

const MESSAGE_MAX_LENGTH = 1000;
const NAME_PATTERN: RegExp = /^[\p{L} ]+$/u;
const NAME_DISALLOWED_CHARS: RegExp = /[^\p{L} ]/gu;

@Component({
  selector: 'app-contact',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnDestroy {
  public readonly status = signal<ContactStatus>('idle');
  public readonly submitted = signal<boolean>(false);
  public readonly messageMaxLength: number = MESSAGE_MAX_LENGTH;

  public readonly form: FormGroup<ContactFormControls> = new FormGroup<ContactFormControls>({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(80),
        Validators.pattern(NAME_PATTERN),
      ],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(120)],
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(MESSAGE_MAX_LENGTH),
      ],
    }),
  });

  public readonly nameControl: FormControl<string> = this.form.controls.name;
  public readonly emailControl: FormControl<string> = this.form.controls.email;
  public readonly messageControl: FormControl<string> = this.form.controls.message;

  private readonly formValue = toSignal(this.form.valueChanges, {
    initialValue: this.form.getRawValue(),
  });

  private readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: this.form.status,
  });

  public readonly messageLength = computed<number>(() => this.formValue().message?.length ?? 0);

  public readonly isFormFilled = computed<boolean>(() => {
    const { name, email, message }: Partial<ContactFormValue> = this.formValue();
    return [name, email, message].every(
      (field: string | undefined) => (field?.trim().length ?? 0) > 0,
    );
  });

  public readonly isFormInvalid = computed<boolean>(() => this.formStatus() === 'INVALID');

  private sendTimeout: ReturnType<typeof setTimeout> | null = null;

  public onSubmit(): void {
    if (this.status() === 'sending') return;
    this.submitted.set(true);
    this.normalizeFields();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isFormFilled() === false) return;

    this.status.set('sending');

    this.sendTimeout = setTimeout(() => {
      this.status.set('sent');
      this.sendTimeout = null;
    }, 2000);
  }

  public reset(): void {
    this.status.set('idle');
    this.submitted.set(false);
    this.form.reset();
  }

  public onNameInput(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const sanitized: string = input.value.replace(NAME_DISALLOWED_CHARS, '');
    if (input.value === sanitized) return;
    this.nameControl.setValue(sanitized);
  }

  public ngOnDestroy(): void {
    if (this.sendTimeout !== null) {
      clearTimeout(this.sendTimeout);
    }
  }

  private normalizeFields(): void {
    this.form.setValue({
      name: this.nameControl.value.trim(),
      email: this.emailControl.value.trim(),
      message: this.messageControl.value.trim(),
    });
  }
}
