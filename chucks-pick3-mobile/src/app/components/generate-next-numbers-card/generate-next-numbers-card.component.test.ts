import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateNextNumbersCardComponent } from './generate-next-numbers-card.component';

describe('GenerateNextNumbersCardComponent', () => {
  let component: GenerateNextNumbersCardComponent;
  let fixture: ComponentFixture<GenerateNextNumbersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNextNumbersCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateNextNumbersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
