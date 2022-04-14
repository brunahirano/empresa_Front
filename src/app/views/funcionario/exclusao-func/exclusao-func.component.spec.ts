import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoFuncComponent } from './exclusao-func.component';

describe('ExclusaoFuncComponent', () => {
  let component: ExclusaoFuncComponent;
  let fixture: ComponentFixture<ExclusaoFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoFuncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
