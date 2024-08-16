import { TestBed } from '@angular/core/testing';

import { ProjectServicesService } from './project-services.service';

describe('ProjectServicesService', () => {
  let service: ProjectServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
