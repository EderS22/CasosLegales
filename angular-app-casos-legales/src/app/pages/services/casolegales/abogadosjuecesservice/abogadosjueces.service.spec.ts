import { TestBed } from '@angular/core/testing';

import { AbogadosjuecesService } from './abogadosjueces.service';

describe('AbogadosjuecesService', () => {
  let service: AbogadosjuecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbogadosjuecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
