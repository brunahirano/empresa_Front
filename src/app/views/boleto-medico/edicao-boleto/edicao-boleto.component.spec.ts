import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoBoletoComponent } from './edicao-boleto.component';

describe('EdicaoBoletoComponent', () => {
  let component: EdicaoBoletoComponent;
  let fixture: ComponentFixture<EdicaoBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoBoletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
