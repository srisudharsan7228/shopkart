import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-beginner-counter',
  standalone: true,
  template: `
    <section>
      <h2>Counter Demo</h2>
      <p data-testid="count-value">Count: {{ count() }}</p>
      <button type="button" (click)="increment()">Increment</button>
      <button type="button" (click)="decrement()" [disabled]="count() === 0">Decrement</button>
      <button type="button" (click)="reset()">Reset</button>
    </section>
  `
})
export class BeginnerCounterComponent {
  count = signal(0);

  increment() {
    this.count.update((current) => current + 1);
  }

  decrement() {
    if (this.count() > 0) {
      this.count.update((current) => current - 1);
    }
  }

  reset() {
    this.count.set(0);
  }
}
