import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-like-button',
  template: `
    <section>
      <h2>Post</h2>
      <p data-testid="likes-value">Likes: {{ likes() }}</p>
      <button type="button" (click)="like()">Like</button>
    </section>
  `
})
export class LikeButtonComponent {
  likes = signal(0);

  like() {
    this.likes.update((value) => value + 1);
  }
}
