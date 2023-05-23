import { TestBed } from '@angular/core/testing';

import { EstadocivilService } from './estadocivil.service';

describe('EstadocivilService', () => {
  let service: EstadocivilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadocivilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
