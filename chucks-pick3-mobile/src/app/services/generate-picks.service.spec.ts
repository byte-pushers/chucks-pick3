import { TestBed } from '@angular/core/testing';

import { GeneratePicksService } from './generate-picks.service';
import { Pick3DrawTimeCard } from '../models/pick3-draw-time-card';
import { Pick3DrawTimeCardDomain } from '../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeEnum } from '../models/pick3-draw-time.enum';
import { Pick3LotteryService } from './pick3-lottery.service';

describe('GeneratePicksService', () => {
  let service: GeneratePicksService;
  const date = new Date();
  let model: Pick3DrawTimeCard;
  beforeEach(() => {
    model = new Pick3DrawTimeCardDomain({
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
      slideNumber: 7,
    });
    TestBed.configureTestingModule({ providers: [GeneratePicksService] }).compileComponents();
    service = TestBed.inject(GeneratePicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should  return the pick3DrawTime As An Observable', function () {
    service.dispatchGeneratePicksDrawDateCardEvent(model);
    expect(service.generatePicksDrawDateSource).toBeDefined('Was not returned as an observable');
  });
});
