import { TestBed } from '@angular/core/testing';

import { Pick3LotteryService } from './pick3-lottery.service';

xdescribe('Pick3LotteryServiceService', () => {
  let service: Pick3LotteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pick3LotteryService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
