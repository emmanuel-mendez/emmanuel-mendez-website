import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ContactStatus = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnDestroy {
  public readonly status = signal<ContactStatus>('idle');
  public name = '';
  public email = '';
  public message = '';

  private sendTimeout: ReturnType<typeof setTimeout> | null = null;

  public onSubmit(): void {
    if (this.status() === 'sending') return;
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

  ngOnDestroy(): void {
    if (this.sendTimeout !== null) {
      clearTimeout(this.sendTimeout);
    }
  }
}
