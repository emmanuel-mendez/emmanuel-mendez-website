import { Component, inject } from '@angular/core';
import { Layout } from '@components/templates/layout/layout';
import { Page } from '@services/page/page';

@Component({
  selector: 'app-page-not-found',
  imports: [Layout],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  private readonly pageService = inject(Page);

  private readonly DESCRIPTION =
    'Page Not Found - Emmanuel Mendez / +3 years of experience creating web applications using TypeScript and frontend frameworks, managing global states, documenting UI components and unit testing them. Expert using CSS frameworks and UI component libraries. Advanced knowledge of best practices, programming principles, object-oriented, reactive and functional programming, design patterns and atomic design.';

  constructor() {
    this.pageService.setMetaTags(this.DESCRIPTION);
  }
}
