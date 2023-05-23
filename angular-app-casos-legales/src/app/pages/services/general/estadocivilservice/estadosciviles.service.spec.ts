import { TestBed } from '@angular/core/testing';

import { EstadoscivilesService } from './estadosciviles.service';

describe('EstadoscivilesService', () => {
  let service: EstadoscivilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoscivilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
