import { Service, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Service()
export class CommunicationStateService {
  readonly latestMessage = signal('No shared message yet');
  readonly messageCount = signal(0);

  private readonly subjectMessageSource = new Subject<string>();
  private readonly behaviorMessageSource = new BehaviorSubject<string>('BehaviorSubject initial value');

  readonly subjectMessage$ = this.subjectMessageSource.asObservable();
  readonly behaviorMessage$ = this.behaviorMessageSource.asObservable();

  updateMessage(message: string): void {
    this.latestMessage.set(message);
    this.messageCount.update((count) => count + 1);
  }

  sendSubjectMessage(message: string): void {
    this.subjectMessageSource.next(message);
  }

  sendBehaviorMessage(message: string): void {
    this.behaviorMessageSource.next(message);
  }
}
