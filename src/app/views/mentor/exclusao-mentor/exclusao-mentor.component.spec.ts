import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoMentorComponent } from './exclusao-mentor.component';

describe('ExclusaoMentorComponent', () => {
  let component: ExclusaoMentorComponent;
  let fixture: ComponentFixture<ExclusaoMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoMentorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
