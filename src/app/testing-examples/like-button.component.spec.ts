import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LikeButtonComponent } from './like-button.component';

describe('LikeButtonComponent (UI testing)', () => {
  let fixture: ComponentFixture<LikeButtonComponent>;
  let component: LikeButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show 0 likes initially', () => {
    const likesText = fixture.debugElement
      .query(By.css('[data-testid="likes-value"]'))
      .nativeElement.textContent;

    expect(likesText).toContain('0');
  });

  it('should update UI to 1 when Like button is clicked', () => {
    const likeButton = fixture.debugElement.query(By.css('button')).nativeElement;

    likeButton.click();
    fixture.detectChanges();

    const likesText = fixture.debugElement
      .query(By.css('[data-testid="likes-value"]'))
      .nativeElement.textContent;

    expect(likesText).toContain('1');
  });
});
