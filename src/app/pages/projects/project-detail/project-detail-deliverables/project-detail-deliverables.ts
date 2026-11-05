import { Component, computed, input } from '@angular/core';

export type ProjectDetailListSection = Readonly<{
  title: string;
  items: readonly string[];
  ariaLabel: string;
}>;

@Component({
  selector: 'app-project-detail-deliverables',
  standalone: true,
  templateUrl: './project-detail-deliverables.html',
  styleUrl: './project-detail-deliverables.css',
})
export class ProjectDetailDeliverables {
  public readonly products = input<readonly string[]>([]);
  public readonly modules = input<readonly string[]>([]);
  public readonly responsibilities = input<readonly string[]>([]);

  public readonly sections = computed<readonly ProjectDetailListSection[]>(() => {
    const sections: readonly ProjectDetailListSection[] = [
      {
        title: 'Products',
        items: this.products(),
        ariaLabel: 'Products list',
      },
      {
        title: 'Modules',
        items: this.modules(),
        ariaLabel: 'Modules list',
      },
      {
        title: 'Responsibilities',
        items: this.responsibilities(),
        ariaLabel: 'Responsibilities list',
      },
    ];
    return sections.filter((section) => section.items.length > 0);
  });
}
