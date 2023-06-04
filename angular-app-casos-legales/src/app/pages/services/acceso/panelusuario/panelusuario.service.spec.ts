import { TestBed } from '@angular/core/testing';

import { PanelusuarioService } from './panelusuario.service';

describe('PanelusuarioService', () => {
  let service: PanelusuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelusuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
