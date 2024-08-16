import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceModalComponent } from './add-service-modal.component';

describe('AddServiceModalComponent', () => {
  let component: AddServiceModalComponent;
  let fixture: ComponentFixture<AddServiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddServiceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
