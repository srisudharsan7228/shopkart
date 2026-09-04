import { Component, ViewChild } from '@angular/core';
import { StockBadgeComponent } from './stock-badge.component';
import { ProductActionsComponent } from './product-actions.component';
import { QuantityStepperComponent } from './quantity-stepper.component';
import { MessagePublisherComponent } from './message-publisher.component';
import { MessageSubscriberComponent } from './message-subscriber.component';
import { ChildToolsComponent } from './child-tools.component';
import { SignalIoProductComponent } from './signal-io-product.component';

@Component({
  selector: 'app-communication-demo',
  standalone: true,
  templateUrl: './communication-demo.component.html',
  styleUrl: './communication-demo.component.css',
  imports: [
    StockBadgeComponent,
    ProductActionsComponent,
    QuantityStepperComponent,
    MessagePublisherComponent,
    MessageSubscriberComponent,
    ChildToolsComponent,
    SignalIoProductComponent
  ]
})
export class CommunicationDemoComponent {
  productName = 'Laptop';
  productStock = 8;
  quantity = 1;
  lastOutputMessage = 'No child events yet';
  signalProductName = 'Mechanical Keyboard';
  signalProductPrice = 3499;
  signalOutputMessage = 'No signal output yet';

  @ViewChild(ChildToolsComponent) childTools?: ChildToolsComponent;

  onAdded(message: string): void {
    this.lastOutputMessage = message;
  }

  onSignalAdded(message: string): void {
    this.signalOutputMessage = message;
  }

  resetChildValue(): void {
    this.childTools?.reset();
  }
}
