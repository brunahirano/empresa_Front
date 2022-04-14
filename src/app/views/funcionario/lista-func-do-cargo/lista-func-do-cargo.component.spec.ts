import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncDoCargoComponent } from './lista-func-do-cargo.component';

describe('ListaFuncComponent', () => {
  let component: ListaFuncDoCargoComponent;
  let fixture: ComponentFixture<ListaFuncDoCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFuncDoCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFuncDoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
