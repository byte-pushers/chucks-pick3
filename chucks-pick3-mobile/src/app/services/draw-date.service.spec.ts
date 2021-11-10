import {DrawDateService} from './draw-date.service';
import {TestBed} from '@angular/core/testing';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';
import {Pick3LotteryService} from './pick3-lottery.service';
import {Pick3DrawTimeCardDomain} from '../models/pick3-draw-time-card.domain';

describe('DrawDateService', () => {
  let service: DrawDateService;
  const date = new Date();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DrawDateService
      ]
    })
      .compileComponents();
    service = TestBed.inject(DrawDateService);
  });
  let model = new Pick3DrawTimeCardDomain({
    drawDate : date,
    drawState : 'gotoHome',
    drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
    drawTimeAsString: 'Morning',
    upcomingDrawTime: date,
    hasWinner: false,
    backgroundImage: Pick3LotteryService,
    winningNumber: 462,
    winningNumberDigits: [4,6,2],
    drawDateIcon: date,
    slideNumber: 7

  });

  it('should  set the current drawTime Card', function () {
    service.dispatchCurrentDrawDateCardEvent(model);
    expect(service.pick3DrawDateSource).toBeDefined( 'it did not set the card');
  });

  it('should  return the pick3DrawTime As An Observable', function () {
    service.dispatchCurrentDrawDateCardEvent(model);
    expect(service.getPick3DrawDateCard$()).toBeDefined('Was not returned as an observable');
  });
});
