import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirCargoAoMentorComponent } from './atribuir-cargo-ao-mentor.component';

describe('AtribuirCargoAoMentorComponent', () => {
  let component: AtribuirCargoAoMentorComponent;
  let fixture: ComponentFixture<AtribuirCargoAoMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtribuirCargoAoMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirCargoAoMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
