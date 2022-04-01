import { TestBed } from '@angular/core/testing';
import { Pick3WebScrapingProviderService } from '../providers/web-scraping/pick3-web-scraping-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Pick3DrawTimeCard } from '../models/pick3-draw-time-card';
import { Pick3DrawDateCardDomain } from '../models/pick3-draw-date-card.domain';
import { Pick3DrawTimeCardDomain } from '../models/pick3-draw-time-card.domain';
import { Pick3DrawTimeEnum } from '../models/pick3-draw-time.enum';
import { Pick3DrawDateCard } from '../models/pick3-draw-date-card';
import { TomorrowPick3DrawDateCardService } from './tomorrowPick3DrawDateCard.service';

describe('AppService', () => {
  let tomorrowPick3DrawDateCardService: TomorrowPick3DrawDateCardService;
  let card1: Pick3DrawDateCard;
  let card2: Pick3DrawDateCard;
  let card3: Pick3DrawDateCard;
  let card4: Pick3DrawDateCard;
  let card5: Pick3DrawDateCard;
  let card6: Pick3DrawDateCard;
  let card7: Pick3DrawDateCard;
  let pick3DrawTimeCards: Array<Pick3DrawTimeCard> = [];
  let pick3DrawDateDecks: Array<Pick3DrawDateCard> = [];
  const date = new Date();
  const bg =
    'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%' +
    '2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F03%2FTexas-Bluebonnets-Spring-15-TXBLOOMS0316.jpg&q=85';
  const state = 'TX';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TomorrowPick3DrawDateCardService,
        Pick3WebScrapingProviderService,
      ],
    }).compileComponents();
    tomorrowPick3DrawDateCardService = TestBed.inject(
      TomorrowPick3DrawDateCardService
    );

    card1 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 1,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 1),
      },
    });
    card2 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 2,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 2),
      },
    });
    card3 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 3,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 3),
      },
    });
    card4 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 4,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 4),
      },
    });
    card5 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 5,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 5),
      },
    });
    card6 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 6,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 6),
      },
    });
    card7 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG,
      ...{
        slideNumber: 8,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 8),
      },
    });
    pick3DrawDateDecks = [card1, card2, card3, card4, card5, card6, card7];
    pick3DrawTimeCards = [
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.morning',
        drawTime: Pick3DrawTimeEnum.MORNING,
        icon: 'morning-icon',
        dateTime: new Date().setHours(7, 15, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.day',
        drawTime: Pick3DrawTimeEnum.DAY,
        icon: 'day-icon',
        dateTime: new Date().setHours(11, 45, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.evening',
        drawTime: Pick3DrawTimeEnum.EVENING,
        icon: 'evening-icon',
        dateTime: new Date().setHours(17, 15, 0, 0),
        showCountDownToDrawing: false,
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.night',
        drawTime: Pick3DrawTimeEnum.NIGHT,
        icon: 'night-icon',
        dateTime: new Date().setHours(21, 30, 0, 0),
        showCountDownToDrawing: false,
      }),
    ];
  });

  // retrievePick3DrawDate
  it('should call to getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime', () => {
    spyOn(
      tomorrowPick3DrawDateCardService,
      'getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime'
    );
    tomorrowPick3DrawDateCardService.retrievePick3DrawDate(
      8,
      Pick3DrawTimeEnum.MORNING
    );
    expect(
      tomorrowPick3DrawDateCardService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime
    ).toHaveBeenCalled();
  });

  // pick3StateLottery
  it('should getPick3DrawDateDecks', () => {
    expect(
      tomorrowPick3DrawDateCardService.getPick3DrawDateDecks()
    ).toBeDefined('getPick3DrawDateDecks is not defined');
  });
  it('should return getBackgroundImageUrl', () => {
    expect(
      tomorrowPick3DrawDateCardService.getBackgroundImageUrl()
    ).toBeDefined('getBackgroundImageUrl is not defined');
  });
  it('should return getCurrentDrawTime', () => {
    expect(tomorrowPick3DrawDateCardService.getCurrentDrawTime()).toBeDefined(
      'getCurrentDrawTime is not defined'
    );
  });
  it('should return getDrawTime', () => {
    expect(tomorrowPick3DrawDateCardService.getDrawTime(date)).toBeDefined(
      'getCurrentDrawTime is not defined'
    );
  });
  it('should return getDrawState', () => {
    expect(tomorrowPick3DrawDateCardService.getDrawState()).toBeDefined(
      'getDrawState is not defined'
    );
  });
  it('should return getDrawingTimeByName', () => {
    expect(
      tomorrowPick3DrawDateCardService.getDrawingTimeByName('Morning')
    ).toBeDefined('getDrawingTimeByName is not defined');
  });

  // dispatchCurrentDrawCardIdEvent
  it('should retrieve a Pick3DrawCardId', () => {
    tomorrowPick3DrawDateCardService.dispatchCurrentDrawCardIdEvent(6);
    expect(tomorrowPick3DrawDateCardService.getPick3DrawCardId$()).toBeDefined(
      'id number was not defined'
    );
  });
});
