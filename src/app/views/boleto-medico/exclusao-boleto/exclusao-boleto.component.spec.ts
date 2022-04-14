import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoBoletoComponent } from './exclusao-boleto.component';

describe('ExclusaoBoletoComponent', () => {
  let component: ExclusaoBoletoComponent;
  let fixture: ComponentFixture<ExclusaoBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoBoletoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
