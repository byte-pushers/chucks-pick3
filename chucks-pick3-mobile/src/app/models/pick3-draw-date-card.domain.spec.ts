import { Pick3DrawDateCardDomain } from './pick3-draw-date-card.domain';
import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';
import { Pick3LotteryService } from '../services/pick3-lottery.service';

describe('Pick3DrawDateCardDomain', () => {
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
      slideNumber: 7,
    });
  });

  // drawDate
  it('should have a drawDate defined', () => {
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeDefined('drawDate was not retrieved');
  });
  it('should have a drawDate defined', () => {
    model.setDrawDate(null);
    expect(model.getDrawDate()).toBeNull('drawDate was not changed');
  });
  it('should the drawDate to be changed', () => {
    const nullValue = null;
    model.setDrawDate(nullValue);
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeNull('drawDate was not changed');
  });

  it('should get and set drawDate ', () => {
    model.drawDate = date;
    expect(model.drawDate).toEqual(date);
  });

  // getDefaultDrawTime
  it('should have a drawState defined', () => {
    model.setDefaultDrawDateTime(Pick3DrawTimeEnum.DAY);
    const drawState = model.getDefaultDrawDateTime();
    expect(drawState).toEqual(Pick3DrawTimeEnum.DAY, 'defaultDrawDateTime is not defined');
  });
  it('should get and set defaultDrawDateTime', () => {
    model.defaultDrawDateTime = Pick3DrawTimeEnum.DAY;
    expect(model.defaultDrawDateTime).toEqual(Pick3DrawTimeEnum.DAY);
  });
  //drawState
  it('should have a drawState defined', () => {
    model.setDrawState('gotoHome');
    const drawState = model.getDrawState();
    expect(drawState).toEqual('gotoHome', 'drawState is not defined');
  });
  it('should the drawState to be changed', () => {
    const nullValue = null;
    model.setDrawState(nullValue);
    const drawState = model.getDrawState();
    expect(drawState).toBeNull('drawState was not changed');
  });
  it('should get and set drawState', () => {
    model.drawState = 'NV';
    expect(model.drawState).toEqual('NV');
  });

  // drawTime
  it('should have a drawTime defined', () => {
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeDefined('drawTime is not defined');
  });
  it('should the drawTime to be changed', () => {
    const nullValue = null;
    model.setDrawTime(nullValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeNull('drawTime was not changed');
  });
  it('should get and set the drawTime', () => {
    // @ts-ignore
    model.drawTime = 'night';
    expect(model.drawTime).toEqual(Pick3DrawTimeEnum.NIGHT);
  });
  it('should get and set the drawTime', () => {
    // @ts-ignore
    model.setDrawTime('night');
    expect(model.getDrawTime()).toEqual(Pick3DrawTimeEnum.NIGHT);
  });
  it('should get drawtime as string', () => {
    model.setDrawTime('Morning');
    expect(model.getDrawTime()).toBeDefined();
  });
  it('should retrieve drawTime', () => {
    expect(model.getDrawTime()).toBeDefined();
  });
  it('should get and set the drawTime', () => {
    model.drawTime = Pick3DrawTimeEnum.NIGHT;
    expect(model.drawTime).toEqual(Pick3DrawTimeEnum.NIGHT);
  });
  // backgroundImage
  it('should have a backgroundImage defined', () => {
    const backgroundImage = model.getBackgroundImage();
    expect(backgroundImage).toBeDefined('drawTime is not defined');
  });
  it('should change the backgroundImage', () => {
    const nullValue = null;
    model.setBackgroundImage(nullValue);
    const backgroundImage = model.getBackgroundImage();
    expect(backgroundImage).toBeNull('backgroundImage was not changed');
  });

  it('should get and set the background image', () => {
    model.backgroundImage = 'image.jpg';
    expect(model.backgroundImage).toEqual('image.jpg');
  });

  // icon
  it('should have an icon defined', () => {
    const icon = model.getIcon();
    expect(icon).toBeDefined('icon is not defined');
  });
  it('should change the icon', () => {
    const nullValue = null;
    model.setIcon(nullValue);
    const icon = model.getIcon();
    expect(icon).toBeNull('icon was not changed');
  });

  it('should get and set icon', () => {
    model.icon = 'day-icon';
    expect(model.icon).toEqual('day-icon');
  });

  // slideNumber
  it('should have a slideNumber defined', () => {
    const slideNumber = model.getSlideNumber();
    expect(slideNumber).toBeDefined('slideNumber is not defined');
  });
  it('should change the slideNumber', () => {
    const slideNumberValue = 5;
    model.setSlideNumber(slideNumberValue);
    const slideNumber = model.getSlideNumber();
    expect(slideNumber).toBe(5, 'slideNumber was not changed');
  });

  it('should get and set slideNumber', () => {
    model.slideNumber = 6;
    expect(model.slideNumber).toEqual(6);
  });

  it('should get and set slideNumber', () => {
    model.setSlideNumber(null);
    expect(model.getSlideNumber()).toBeNull();
  });

  //slideName
  it('should get the slideName and set it via methods', () => {
    model.setSlideName('Generate New Numbers');
    expect(model.getSlideName()).toEqual('Generate New Numbers');
  });
  it('should get and set slideName', () => {
    model.slideName = 'Generate New Numbers';
    expect(model.slideName).toEqual('Generate New Numbers');
  });
  it('should get and set slideName', () => {
    model.setSlideName(null);
    expect(model.getSlideName()).toBeNull('slide name is set to null');
  });

  // upcomingDrawTime
  it('should have an upcomingDrawTime defined', () => {
    const upcomingDrawTime = model.getUpcomingDrawingTime();
    expect(upcomingDrawTime).toBeDefined('upcomingDrawTime is not defined');
  });
  it('should change the upcomingDrawTime', () => {
    const nullValue = null;
    model.setUpcomingDrawTime(nullValue);
    const upcomingDrawTime = model.getUpcomingDrawingTime();
    expect(upcomingDrawTime).toBeNull('slideNumber was not changed');
  });
  it('should get and set upcomingDrawTime', function () {
    model.upcomingDrawTime = date;
    expect(model.upcomingDrawTime).toEqual(date);
  });

  // winningNumber
  it('should have a winningNumber defined', () => {
    const winningNumber = model.getWinningNumber();
    expect(winningNumber).toBeDefined('winningNumber is not defined');
  });
  it('should change the winningNumber', () => {
    const winningNumberValue = 264;
    model.setWinningNumber(winningNumberValue);
    const winningNumber = model.getWinningNumber();
    expect(winningNumber).toBe(264, 'winningNumber has been changed');
  });

  it('should get and set winningNumbers', () => {
    model.winningNumber = 685;
    expect(model.winningNumber).toEqual(685);
  });
  it('should get winningNumberDigit1', () => {
    expect(model.winningNumberDigit1).toEqual(2);
  });
  it('should get winningNumberDigit2', () => {
    expect(model.winningNumberDigit2).toEqual(6);
  });
  it('should get winningNumberDigit3', () => {
    expect(model.winningNumberDigit3).toEqual(4);
  });

  // winningNumberDigits
  it('should have winningNumberDigit1 defined', () => {
    const winningNumberDigit1 = model.getWinningNumberDigit1();
    expect(winningNumberDigit1).toBeDefined('winningNumberDigit1 is not defined');
  });

  it('should have winningNumberDigit2 defined', () => {
    const winningNumberDigit2 = model.getWinningNumberDigit2();
    expect(winningNumberDigit2).toBeDefined('winningNumberDigit2 is not defined');
  });

  it('should have winningNumberDigit3 defined', () => {
    const winningNumberDigit3 = model.getWinningNumberDigit3();
    expect(winningNumberDigit3).toBeDefined('winningNumberDigit3 is not defined');
  });

  it('should have winningNumberDigit3 defined', () => {
    const winningNumberDigit3 = model.getWinningNumberDigit3();
    expect(winningNumberDigit3).toBeDefined('winningNumberDigit3 is not defined');
  });

  it('should return winningNumberDigits', () => {
    expect(model.winningNumberDigits).toEqual([4, 6, 2]);
  });

  // hasWinner
  it('should change hasWinner to true', () => {
    const trueValue = true;
    model.setHasGeneratedWinner(trueValue);
    const hasWinner = model.getHasGeneratedWinner();
    expect(hasWinner).toBeTrue();
  });

  it('should get and set hasWinner', () => {
    model.hasWinner = false;
    expect(model.hasWinner).toBeFalse();
  });
});
