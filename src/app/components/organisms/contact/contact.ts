import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Button } from '@components/atoms/button/button';

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';
const MESSAGE_MAX_LENGTH = 1000;

@Component({
  selector: 'app-contact',
  imports: [Button, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnDestroy {
  public readonly status = signal<ContactStatus>('idle');
  public readonly messageMaxLength = MESSAGE_MAX_LENGTH;
  public name = '';
  public email = '';
  public message = '';

  private sendTimeout: ReturnType<typeof setTimeout> | null = null;

  public onSubmit(form?: NgForm): void {
    if (this.status() === 'sending') return;
    if (form?.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.normalizeFields();
    if (this.isFormFilled() === false) return;

    this.status.set('sending');

    this.sendTimeout = setTimeout(() => {
      this.status.set('sent');
      this.sendTimeout = null;
    }, 2000);
  }

  public reset(): void {
    this.status.set('idle');
    this.name = '';
    this.email = '';
    this.message = '';
  }

  public isFormFilled(): boolean {
    return (
      this.name.trim().length > 0 && this.email.trim().length > 0 && this.message.trim().length > 0
    );
  }

  ngOnDestroy(): void {
    if (this.sendTimeout !== null) {
      clearTimeout(this.sendTimeout);
    }
  }

  private normalizeFields(): void {
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.message = this.message.trim();
  }
}
