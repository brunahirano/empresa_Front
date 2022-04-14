import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoMentorComponent } from './edicao-mentor.component';

describe('EdicaoMentorComponent', () => {
  let component: EdicaoMentorComponent;
  let fixture: ComponentFixture<EdicaoMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
