import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousWinningNumberCardComponent } from './previous-winning-number-card.component';

describe('GeneratePicksCardComponent', () => {
  let component: PreviousWinningNumberCardComponent;
  let fixture: ComponentFixture<PreviousWinningNumberCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousWinningNumberCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousWinningNumberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
