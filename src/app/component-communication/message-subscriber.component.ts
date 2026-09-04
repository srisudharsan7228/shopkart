import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommunicationStateService } from './communication-state.service';

@Component({
  selector: 'app-message-subscriber',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <p class="line">Signal listener: {{ communicationState.latestMessage() }}</p>
    <p class="line">Signal count: {{ communicationState.messageCount() }}</p>
    <p class="line">Subject listener: {{ communicationState.subjectMessage$ | async }}</p>
    <p class="line">BehaviorSubject listener: {{ communicationState.behaviorMessage$ | async }}</p>
  `,
  styles: [
    `
    .line {
      margin: 0;
    }
    `
  ]
})
export class MessageSubscriberComponent {
  constructor(public readonly communicationState: CommunicationStateService) {}
}
