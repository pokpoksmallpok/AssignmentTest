import { TestBed } from '@angular/core/testing';

import { ApiAssignmentService } from './api-assignment.service';

describe('ApiAssignmentService', () => {
  let service: ApiAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
