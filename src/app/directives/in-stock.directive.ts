import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInStock]',
  standalone: true
})

export class InStockDirective { 

  private stock = 0;
  private elseTemplateRef: TemplateRef<unknown> | null = null;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  @Input() set appInStock(stock: number | null | undefined) {
    this.stock = stock ?? 0;
    this.updateView();
  }

  @Input() set appInStockElse(templateRef: TemplateRef<unknown> | null) {
    this.elseTemplateRef = templateRef;
    this.updateView();
  }

  private updateView(): void {
    this.viewContainerRef.clear();

    if (this.stock > 0) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      return;
    }

    if(this.elseTemplateRef) {
      this.viewContainerRef.createEmbeddedView(this.elseTemplateRef);
    }
  }
}
