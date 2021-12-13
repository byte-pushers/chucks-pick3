import {AppService} from './app.service';
import {TestBed} from '@angular/core/testing';
import {Pick3WebScrapingProviderService} from './providers/web-scraping/pick3-web-scraping-provider.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Pick3DrawTimeCard} from './models/pick3-draw-time-card';
import {Pick3DrawDateCardDomain} from './models/pick3-draw-date-card.domain';
import {Pick3DrawTimeCardDomain} from './models/pick3-draw-time-card.domain';
import {Pick3DrawTimeEnum} from './models/pick3-draw-time.enum';
import {Pick3DrawDateCard} from './models/pick3-draw-date-card';

describe('AppService', () => {
  let appService: AppService;
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
  const bg = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%' +
    '2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F03%2FTexas-Bluebonnets-Spring-15-TXBLOOMS0316.jpg&q=85';
  const state = 'TX';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AppService,
        Pick3WebScrapingProviderService
      ]
    })
      .compileComponents();
    appService = TestBed.inject(AppService);

    card1 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 1,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 1)
      }
    });
    card2 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 2,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 2)
      }
    });
    card3 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 3,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 3)
      }
    });
    card4 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 4,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 4)
      }
    });
    card5 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 5,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 5)
      }
    });
    card6 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 6,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 6)
      }
    });
    card7 = new Pick3DrawDateCardDomain({
      ...Pick3DrawDateCardDomain.DEFAULT_CONFIG, ...{
        slideNumber: 7,
        backgroundImageUrl: bg,
        drawState: state,
        drawDate: date.setDate(date.getDate() - 7)
      }
    });
    pick3DrawDateDecks = [
      card1,
      card2,
      card3,
      card4,
      card5,
      card6,
      card7
    ];
    pick3DrawTimeCards = [
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.morning',
        drawTime: Pick3DrawTimeEnum.MORNING,
        icon: 'morning-icon',
        dateTime: new Date().setHours(7, 15, 0, 0),
        showCountDownToDrawing: false
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.day',
        drawTime: Pick3DrawTimeEnum.DAY,
        icon: 'day-icon',
        dateTime: new Date().setHours(11, 45, 0, 0),
        showCountDownToDrawing: false
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.evening',
        drawTime: Pick3DrawTimeEnum.EVENING,
        icon: 'evening-icon',
        dateTime: new Date().setHours(17, 15, 0, 0),
        showCountDownToDrawing: false
      }),
      new Pick3DrawTimeCardDomain({
        title: 'draw.time.enum.night',
        drawTime: Pick3DrawTimeEnum.NIGHT,
        icon: 'night-icon',
        dateTime: new Date().setHours(21, 30, 0, 0),
        showCountDownToDrawing: false
      })
    ];
  });

  // getSlideDate()
  it('should set the date according to the slide number', () => {
    const dateTest = new Date();
    expect(appService.getSlideDate(7)).toEqual(dateTest);
  });

// retrievePick3DrawDate
  it('should call to getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime', () => {
    spyOn(appService, 'getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime');
    appService.retrievePick3DrawDate(7, Pick3DrawTimeEnum.MORNING);
    expect(appService.getPick3DrawTimeCardsByPick3DrawTimeTypeAndDateTime).toHaveBeenCalled();
  });

  // pick3StateLottery
  it('should getPick3DrawDateDecks', () => {
    expect(appService.getPick3DrawDateDecks()).toBeDefined('getPick3DrawDateDecks is not defined');
  });
  it('should return getBackgroundImageUrl', () => {
    expect(appService.getBackgroundImageUrl()).toBeDefined('getBackgroundImageUrl is not defined');
  });
  it('should return getCurrentDrawTime', () => {
    expect(appService.getCurrentDrawTime()).toBeDefined('getCurrentDrawTime is not defined');
  });
  it('should return getDrawTime', () => {
    expect(appService.getDrawTime(date)).toBeDefined('getCurrentDrawTime is not defined');
  });
  it('should return getDrawState', () => {
    expect(appService.getDrawState()).toBeDefined('getDrawState is not defined');
  });
  it('should return getDrawingTimeByName', () => {
    expect(appService.getDrawingTimeByName('Morning')).toBeDefined('getDrawingTimeByName is not defined');
  });

  // dispatchCurrentDrawCardIdEvent
  it('should retrieve a Pick3DrawCardId', () => {
    appService.dispatchCurrentDrawCardIdEvent(6);
    expect(appService.getPick3DrawCardId$()).toBeDefined('id number was not defined');});

  xit('should call to getSlideDate', () =>{
    spyOn(appService, 'getSlideDate');
    appService.getPick3DrawTimeCards(6);
    expect(appService.getSlideDate).toHaveBeenCalled();
  });
});