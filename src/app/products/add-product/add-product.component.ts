
import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CreateProductRequest } from '../product.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private submitPayloadSignal = signal<CreateProductRequest | null>(null);

  addProductRequest = this.productService.addProduct({
    payload: this.submitPayloadSignal,
  });

  isSubmitted = false;

   productForm = this.fb.nonNullable.group({
     title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
     description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
     price: [0, [Validators.required, Validators.min(1)]],
     stock: [0, [Validators.required, Validators.min(0)]],
     brand: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
     category: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
   })


  onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitted = true;
    if(this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        return;
    }

    const payload = this.productForm.getRawValue() as CreateProductRequest;
    this.addProduct(payload);
  }

  addProduct(payload: CreateProductRequest): void {
    this.submitPayloadSignal.set(payload);
  }

  get apiResponse(): unknown | null {
    return this.addProductRequest.value();
  }

  hasError(controlName: keyof CreateProductRequest): boolean {
    const control = this.productForm.get(controlName);
    if(control) {
        return control && control.invalid && (control.touched || this.isSubmitted);
    }
    return false;
  }
}