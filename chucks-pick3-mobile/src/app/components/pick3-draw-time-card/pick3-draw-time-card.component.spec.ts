import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pick3DrawTimeCardComponent } from './pick3-draw-time-card.component';

describe('Pick3DrawDateTimeCardComponent', () => {
  let component: Pick3DrawTimeCardComponent;
  let fixture: ComponentFixture<Pick3DrawTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pick3DrawTimeCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pick3DrawTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
