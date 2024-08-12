import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceContainerComponent } from './service-container.component';

describe('ServiceContainerComponent', () => {
  let component: ServiceContainerComponent;
  let fixture: ComponentFixture<ServiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
