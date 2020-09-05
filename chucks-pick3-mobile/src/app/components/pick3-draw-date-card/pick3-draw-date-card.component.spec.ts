import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Pick3DrawDateCardComponent } from './pick3-draw-date-card.component';

describe('Pick3DrawDateViewComponent', () => {
  let component: Pick3DrawDateCardComponent;
  let fixture: ComponentFixture<Pick3DrawDateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pick3DrawDateCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Pick3DrawDateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
