import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBoletosFuncComponent } from './lista-boletos-func.component';

describe('ListaBoletosFuncComponent', () => {
  let component: ListaBoletosFuncComponent;
  let fixture: ComponentFixture<ListaBoletosFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBoletosFuncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBoletosFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
