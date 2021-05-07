import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pick3DrawTimeSlotComponent } from './pick3-draw-time-slot.component';

describe('Pick3DrawTimeSlotComponent', () => {
  let component: Pick3DrawTimeSlotComponent;
  let fixture: ComponentFixture<Pick3DrawTimeSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pick3DrawTimeSlotComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pick3DrawTimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
