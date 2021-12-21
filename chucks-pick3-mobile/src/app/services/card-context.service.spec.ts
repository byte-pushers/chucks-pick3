import {TestBed} from '@angular/core/testing';
import {CardContextService} from './card-context.service';
import {Pick3LotteryService} from './pick3-lottery.service';
import {Pick3DrawDateCardDomain} from '../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCardDomain} from '../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';


describe('CardContextService', () => {
  let service: CardContextService;
  const date = new Date();
  let model;
  beforeEach(() => {
    model = new Pick3DrawDateCardDomain({
      drawDate: date,
      drawState: 'gotoHome',
      drawTime: Pick3DrawTimeEnum.MORNING,
      drawTimeAsString: 'Morning',
      upcomingDrawTime: date,
      hasWinner: false,
      backgroundImage: Pick3LotteryService,
      winningNumber: 462,
      winningNumberDigits: [4, 6, 2],
      drawDateIcon: date,
      slideNumber: 7
    });

    TestBed.configureTestingModule({
      providers: [
        CardContextService
      ]
    })
      .compileComponents();
    service = TestBed.inject(CardContextService);
    service.context$.subscribe(context => {
      service.addContext(model);
    });
  });
  it('should  define the card context', function () {
    expect(service.context$).toBeDefined('context was not subscribed to.');
  });
});
