import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoFuncComponent } from './edicao-func.component';

describe('EdicaoFuncComponent', () => {
  let component: EdicaoFuncComponent;
  let fixture: ComponentFixture<EdicaoFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoFuncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
