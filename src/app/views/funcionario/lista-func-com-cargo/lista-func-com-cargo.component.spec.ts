import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncComCargoComponent } from './lista-func-com-cargo.component';

describe('ListaFuncComCargoComponent', () => {
  let component: ListaFuncComCargoComponent;
  let fixture: ComponentFixture<ListaFuncComCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaFuncComCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFuncComCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
