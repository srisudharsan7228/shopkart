import { BeginnerCounterComponent } from './beginner-counter.component';

describe('BeginnerCounterComponent', () => {
  let component: BeginnerCounterComponent;

  beforeEach(() => {
    component = new BeginnerCounterComponent();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start with count 0', () => {
    expect(component.count()).toBe(0);
  });

  it('should increment count by 1', () => {
    component.increment();

    expect(component.count()).toBe(1);
  });

  it('should decrement after incrementing', () => {
    component.increment();
    component.decrement();

    expect(component.count()).toBe(0);
  });

  it('should not decrement below 0', () => {
    component.decrement();

    expect(component.count()).toBe(0);
  });

  it('should increment twice', () => {
    component.increment();
    component.increment();

    expect(component.count()).toBe(2);
  });

  it('should reset count to 0', () => {
    component.increment();
    component.increment();
    component.reset();

    expect(component.count()).toBe(0);
  });
});
