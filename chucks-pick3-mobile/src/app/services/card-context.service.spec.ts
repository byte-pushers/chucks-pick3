import {TestBed} from '@angular/core/testing';
import {CardContextService} from './card-context.service';
import {Pick3LotteryService} from './pick3-lottery.service';
import {Pick3DrawDateCardDomain} from '../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCardDomain} from '../models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';
import {Observable, ReplaySubject} from "rxjs";
import {convertToParamMap, ParamMap, Params} from "@angular/router";


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
  xit('should  define the card context', function () {
    expect(service.context$).toBeDefined('context was not subscribed to.');
  });
});

class ActivatedRouteStub {

  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  };
}
