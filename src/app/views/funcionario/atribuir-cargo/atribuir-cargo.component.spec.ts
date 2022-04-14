import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirCargoComponent } from './atribuir-cargo.component';

describe('AtribuirCargoComponent', () => {
  let component: AtribuirCargoComponent;
  let fixture: ComponentFixture<AtribuirCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtribuirCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
