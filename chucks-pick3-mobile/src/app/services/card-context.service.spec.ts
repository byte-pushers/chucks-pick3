import {TestBed} from '@angular/core/testing';
import {CardContextService} from './card-context.service';
import {Pick3LotteryService} from './pick3-lottery.service';
import {Pick3DrawDateCardDomain} from '../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCardDomain} from '../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';


describe('CardContextService', () => {
  let service: CardContextService;
  const date = new Date();
  const pick3DrawTimeCardModel = [
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.morning',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
      icon: 'morning-icon',
      dateTime: new Date().setHours(7, 15, 0, 0),
      showCountDownToDrawing: false
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.day',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY,
      icon: 'day-icon',
      dateTime: new Date().setHours(11, 45, 0, 0),
      showCountDownToDrawing: false
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.evening',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.EVENING,
      icon: 'evening-icon',
      dateTime: new Date().setHours(17, 15, 0, 0),
      showCountDownToDrawing: false
    }),
    new Pick3DrawTimeCardDomain({
      title: 'draw.time.enum.night',
      drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT,
      icon: 'night-icon',
      dateTime: new Date().setHours(21, 30, 0, 0),
      showCountDownToDrawing: false
    })
  ];
  const pick3DrawDateCardModel = new Pick3DrawDateCardDomain({
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CardContextService
      ]
    })
      .compileComponents();
    service = TestBed.inject(CardContextService);
  });
  it('should  define the card context', function () {
    service.context$.subscribe( context => {
      context.data = pick3DrawDateCardModel;
      context.drawTimes = pick3DrawTimeCardModel;
      service.addContext(context);
    });
    expect(service.context$).toBeDefined('context was not subscribed to.');
  });
});
