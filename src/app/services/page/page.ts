import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface PageMetadata {
  description: string;
  url?: string;
}

@Injectable({ providedIn: 'root' })
export class Page {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);

  public setMetaTags(description: string, url?: string): void {
    const currentUrl = `https://emmanuel-mendez-website.vercel.app/${url ?? this.router.url}`;
    const pageTitle = this.title.getTitle();

    this.updateDomMeta(description, pageTitle, currentUrl);
  }

  private updateDomMeta(description: string, title: string, url: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
  }
}
