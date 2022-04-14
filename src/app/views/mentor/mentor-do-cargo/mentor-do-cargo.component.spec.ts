import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorDoCargoComponent } from './mentor-do-cargo.component';

describe('MentorCargoComponent', () => {
  let component: MentorDoCargoComponent;
  let fixture: ComponentFixture<MentorDoCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorDoCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorDoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
