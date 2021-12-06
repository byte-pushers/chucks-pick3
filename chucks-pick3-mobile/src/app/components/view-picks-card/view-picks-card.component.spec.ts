import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPicksCardComponent } from './view-picks-card.component';
import {CardContextService} from "../../services/card-context.service";
import {NumberUtilityService} from '../../services/numberUtility.service';
import {DrawTimeService} from "../../services/draw-time.service";

describe('ViewPicksCardComponent', () => {
  let component: ViewPicksCardComponent;
  let fixture: ComponentFixture<ViewPicksCardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPicksCardComponent ],
      imports: [IonicModule.forRoot()],
      providers: [CardContextService, NumberUtilityService, DrawTimeService]
    }).compileComponents();
    fixture = TestBed.createComponent(ViewPicksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
