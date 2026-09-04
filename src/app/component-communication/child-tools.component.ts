import { Component } from '@angular/core';

@Component({
  selector: 'app-child-tools',
  standalone: true,
  template: `
    <p class="line">ViewChild target value: {{ clicks }}</p>
    <button type="button" (click)="increase()">Increase inside child</button>
  `,
  styles: [
    `
    .line {
      margin: 0 0 8px;
    }
    `
  ]
})
export class ChildToolsComponent {
  clicks = 0;

  increase(): void {
    this.clicks += 1;
  }

  reset(): void {
    this.clicks = 0;
  }
}
