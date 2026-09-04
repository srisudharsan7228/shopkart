import { Component } from '@angular/core';
import { CommunicationStateService } from './communication-state.service';

@Component({
  selector: 'app-message-publisher',
  standalone: true,
  template: `
    <button type="button" (click)="sendSignalMessage()">
      Send Signal message
    </button>
    <button type="button" (click)="sendSubjectMessage()">
      Send Subject message
    </button>
    <button type="button" (click)="sendBehaviorMessage()">
      Send BehaviorSubject message
    </button>
  `
})
export class MessagePublisherComponent {
  constructor(private readonly communicationState: CommunicationStateService) {}

  sendSignalMessage(): void {
    const now = new Date().toLocaleTimeString();
    this.communicationState.updateMessage(`Shared update from sibling at ${now}`);
  }

  sendSubjectMessage(): void {
    const now = new Date().toLocaleTimeString();
    this.communicationState.sendSubjectMessage(`Subject emitted at ${now}`);
  }

  sendBehaviorMessage(): void {
    const now = new Date().toLocaleTimeString();
    this.communicationState.sendBehaviorMessage(`BehaviorSubject emitted at ${now}`);
  }
}
