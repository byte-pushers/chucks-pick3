import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateDrawTimeCardComponent } from './generate-draw-time-card.component';

describe('GenerateDrawTimeCardComponent', () => {
  let component: GenerateDrawTimeCardComponent;
  let fixture: ComponentFixture<GenerateDrawTimeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDrawTimeCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateDrawTimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
