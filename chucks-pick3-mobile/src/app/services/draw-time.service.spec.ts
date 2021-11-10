import {DrawTimeService} from './draw-time.service';
import {TestBed} from '@angular/core/testing';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';
import {Pick3DrawTimeCardDomain} from '../models/pick3-draw-time-card.domain';

describe('I18nService', () => {
  let service: DrawTimeService;
  const date = new Date ();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DrawTimeService
      ]
    })
      .compileComponents();
    service = TestBed.inject(DrawTimeService);
  });
  let model = new Pick3DrawTimeCardDomain({
    pick3DrawCardId : 7,
    icon : 'Morning',
    title: 'Morning',
    pick3DrawTime: [Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING, date],
    dateTime: new Date,
    drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
    state: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
    selected: true,
    showCountDownToDrawing: false,
    pick3DrawTimeArray: [33,555,264,346,345]

  });

  it('should  set the current drawTime Card', function () {
    service.setCurrentDrawTimeCard(model);
    expect(service.getCurrentDrawTimeCard()).toEqual(model, 'it did not set the card');
  });

  it('should  return the pick3DrawTime As An Observable', function () {
    service.setCurrentDrawTimeCard(model);
    expect(service.getPick3DrawTime$).toBeDefined('Was not returned as an observable');
  });
});
