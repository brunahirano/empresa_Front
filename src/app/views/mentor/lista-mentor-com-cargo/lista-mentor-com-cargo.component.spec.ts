import { ListaMentorComCargoComponent } from './lista-mentor-com-cargo.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';



describe('ListaMentorComCargoComponent', () => {
  let component: ListaMentorComCargoComponent;
  let fixture: ComponentFixture<ListaMentorComCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaMentorComCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMentorComCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
