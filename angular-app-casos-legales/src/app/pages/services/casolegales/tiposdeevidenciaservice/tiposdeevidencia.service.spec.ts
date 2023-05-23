import { TestBed } from '@angular/core/testing';

import { TiposdeevidenciaService } from './tiposdeevidencia.service';

describe('TiposdeevidenciaService', () => {
  let service: TiposdeevidenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposdeevidenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
