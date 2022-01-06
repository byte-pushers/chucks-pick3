import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {ViewPicksCardComponent} from './view-picks-card.component';
import {CardContextService} from '../../services/card-context.service';
import {NumberUtilityService} from '../../services/numberUtility.service';
import {Pick3DrawTimeCardDomain} from '../../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {Pick3DrawTimeCardStateEnum} from '../../models/pick3-draw-time-card-state.enum';
import {DrawTimeService} from '../../services/draw-time.service';

describe('ViewPicksCardComponent', () => {
  let component: ViewPicksCardComponent;
  let fixture: ComponentFixture<ViewPicksCardComponent>;
  let model;
  let drawTimeService: DrawTimeService;
  beforeEach(async(() => {
    model = new Pick3DrawTimeCardDomain({
      pick3DrawCardId: 7,
      icon: 'Morning',
      title: 'Morning',
      pick3DrawTime: Pick3DrawTimeEnum.MORNING,
      dateTime: new Date(),
      drawTime: Pick3DrawTimeEnum.MORNING,
      state: Pick3DrawTimeCardStateEnum.DRAWN,
      selected: true,
      showCountDownToDrawing: false,
      pick3DrawTimeArray: [33, 555, 264, 346, 345]
    });
    TestBed.configureTestingModule({
      declarations: [ViewPicksCardComponent],
      imports: [IonicModule.forRoot()],
      providers: [CardContextService, NumberUtilityService]
    }).compileComponents();
    fixture = TestBed.createComponent(ViewPicksCardComponent);
    component = fixture.componentInstance;
    drawTimeService = TestBed.get(DrawTimeService);
    drawTimeService.setCurrentDrawTimeCard(model);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
