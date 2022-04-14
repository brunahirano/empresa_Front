import { TestBed } from '@angular/core/testing';

import { BoletoMedicoService } from './boleto-medico.service';

describe('BoletoMedicoService', () => {
  let service: BoletoMedicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoletoMedicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
