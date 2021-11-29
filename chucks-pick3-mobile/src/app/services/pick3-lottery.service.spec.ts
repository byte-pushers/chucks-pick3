import {TestBed} from '@angular/core/testing';
import TxPick3CurrentWinningNumbers from 'src/assets/pick3/current-winning-numbers.json';
import TxPick3PastWinningNumbers from 'src/assets/pick3/past-winning-numbers.json';
import {Pick3LotteryService} from './pick3-lottery.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('Pick3LotteryServiceService', () => {
  let service: Pick3LotteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(Pick3LotteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return with TexasPick3CurrentWinningNumbers', () => {
    expect(service.getPick3LotteryPastWinningNumbers('https://www.texaslottery.com/export/sites/lottery/Games/Pick_3/index.html')).toBeTruthy();
  });
});
