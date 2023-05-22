import { TestBed } from '@angular/core/testing';

import { TiposdecasoService } from './tiposdecaso.service';

describe('TiposdecasoService', () => {
  let service: TiposdecasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposdecasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
