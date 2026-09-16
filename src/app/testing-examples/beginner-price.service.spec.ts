import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BeginnerPriceService } from './beginner-price.service';

describe('BeginnerPriceService', () => {
  let service: BeginnerPriceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BeginnerPriceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate discounted price', () => {
    const result = service.getDiscountedPrice(1000, 10);

    expect(result).toBe(900);
  });

  it('should calculate tax amount', () => {
    const result = service.getTaxAmount(200, 5);

    expect(result).toBe(10);
  });

  it('should calculate final price after discount and tax', () => {
    const result = service.getFinalPrice(1000, 10, 5);

    expect(result).toBe(945);
  });

  it('should allow spying on a method (Jasmine spy example)', () => {
    let calledWith: [number, number] | null = null;
    service.getTaxAmount = (price: number, taxPercent: number) => {
      calledWith = [price, taxPercent];
      return 50;
    };

    const result = service.getFinalPrice(1000, 10, 5);

    expect(calledWith).toEqual([900, 5]);
    expect(result).toBe(950);
  });

  it('should get product price from API', () => {
    let actualPrice = 0;

    service.getProductPrice(10).subscribe((price) => {
      actualPrice = price;
    });

    const request = httpMock.expectOne('https://jsonexamples.com/products/10');
    expect(request.request.method).toBe('GET');

    request.flush({ id: 10, price: 499 });

    expect(actualPrice).toBe(499);
  });

  it('should pass API error to subscriber', () => {
    let errorStatus = 0;

    service.getProductPrice(99).subscribe({
      next: () => {
        throw new Error('Expected an API error, but got success.');
      },
      error: (error) => {
        errorStatus = error.status;
      }
    });

    const request = httpMock.expectOne('https://jsonexamples.com/products/99');
    request.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(errorStatus).toBe(404);
  });
});
