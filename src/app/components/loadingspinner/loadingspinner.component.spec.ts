import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingspinnerComponent } from './loadingspinner.component';

describe('LoadingspinnerComponent', () => {
  let component: LoadingspinnerComponent;
  let fixture: ComponentFixture<LoadingspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingspinnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
