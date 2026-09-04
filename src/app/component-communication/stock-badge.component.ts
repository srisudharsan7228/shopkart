import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-badge',
  standalone: true,
  template: `
    <p class="line">
      Input example: <strong>{{ productName }}</strong>
      <span class="badge">Stock: {{ stock }}</span>
    </p>
  `,
  styles: [
    `
    .line {
      margin: 0;
    }

    .badge {
      margin-left: 8px;
      padding: 4px 8px;
      border-radius: 999px;
      background: #e8f3ff;
      border: 1px solid #9dc6ef;
      font-size: 12px;
    }
    `
  ]
})
export class StockBadgeComponent {
  @Input() productName = '';
  @Input() stock = 0;
}
