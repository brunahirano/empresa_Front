import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMentorComponent } from './cadastrar-mentor.component';

describe('CadastrarMentorComponent', () => {
  let component: CadastrarMentorComponent;
  let fixture: ComponentFixture<CadastrarMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
