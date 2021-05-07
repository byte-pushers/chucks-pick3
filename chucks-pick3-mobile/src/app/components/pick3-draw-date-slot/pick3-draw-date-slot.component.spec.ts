import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pick3DrawDateSlotComponent } from './pick3-draw-date-slot.component';

describe('Pick3DrawDateSlotComponent', () => {
  let component: Pick3DrawDateSlotComponent;
  let fixture: ComponentFixture<Pick3DrawDateSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pick3DrawDateSlotComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pick3DrawDateSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
