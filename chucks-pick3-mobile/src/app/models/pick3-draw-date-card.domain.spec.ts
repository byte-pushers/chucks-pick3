import {Pick3DrawDateCardDomain} from './pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3LotteryService} from '../services/pick3-lottery.service';
describe('Pick3DrawDateCardDomain', () => {
const date = new Date();
  beforeEach(() => {

  });
  let model = new Pick3DrawDateCardDomain({
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

  // drawDate
  it('should have a drawDate defined', function () {
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeDefined('drawDate was not retrieved');
  });
  it('should the drawDate to be changed', function () {
    const nullValue = null;
    model.setDrawDate(nullValue);
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeNull('drawDate was not changed');
  });

  //drawState
  it('should have a drawState defined', function () {
    model.setDrawState('gotoHome');
    const drawState = model.getDrawState();
    expect(drawState).toEqual('gotoHome', 'drawState is not defined');
  });
  it('should the drawState to be changed', function () {
    const nullValue = null;
    model.setDrawState(nullValue);
    const drawState = model.getDrawState();
    expect(drawState).toBeNull('drawState was not changed');
  });

  // drawTime
  it('should have a drawTime defined', function () {
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeDefined('drawTime is not defined');
  });
  it('should the drawTime to be changed', function () {
    const nullValue = null;
    model.setDrawTime(nullValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeNull('drawTime was not changed');
  });

  // backgroundImage
  it('should have a backgroundImage defined', function () {
    const backgroundImage = model.getBackgroundImage();
    expect(backgroundImage).toBeDefined('drawTime is not defined');
  });
  it('should change the backgroundImage', function () {
    const nullValue = null;
    model.setBackgroundImage(nullValue);
    const backgroundImage = model.getBackgroundImage();
    expect(backgroundImage).toBeNull('backgroundImage was not changed');
  });

  // icon
  it('should have an icon defined', function () {
    const icon = model.getIcon();
    expect(icon).toBeDefined('icon is not defined');
  });
  it('should change the icon', function () {
    const nullValue = null;
    model.setIcon(nullValue);
    const icon = model.getIcon();
    expect(icon).toBeNull('icon was not changed');
  });

  // slideNumber
  it('should have a slideNumber defined', function () {
    const slideNumber = model.getSlideNumber();
    expect(slideNumber).toBeDefined('slideNumber is not defined');
  });
  it('should change the slideNumber', function () {
    const slideNumberValue = 5;
    model.setSlideNumber(slideNumberValue);
    const slideNumber = model.getSlideNumber();
    expect(slideNumber).toBe(5,'slideNumber was not changed');
  });

  // upcomingDrawTime
  it('should have an upcomingDrawTime defined', function () {
    const upcomingDrawTime = model.getUpcomingDrawingTime();
    expect(upcomingDrawTime).toBeDefined('upcomingDrawTime is not defined');
  });
  it('should change the upcomingDrawTime', function () {
    const nullValue = null;
    model.setUpcomingDrawTime(nullValue);
    const upcomingDrawTime = model.getUpcomingDrawingTime();
    expect(upcomingDrawTime).toBeNull('slideNumber was not changed');
  });

  // winningNumber
  it('should have a winningNumber defined', function () {
    const winningNumber = model.getWinningNumber();
    expect(winningNumber).toBeDefined('winningNumber is not defined');
  });
  it('should change the winningNumber', function () {
    const winningNumberValue = 264;
    model.setWinningNumber(winningNumberValue);
    const winningNumber = model.getWinningNumber();
    expect(winningNumber).toBe(264, 'winningNumber has been changed')
  });

  // winningNumberDigits
  it('should have winningNumberDigit1 defined', function () {
    const winningNumberDigit1 = model.getWinningNumberDigit1();
    expect(winningNumberDigit1).toBeDefined('winningNumberDigit1 is not defined');
  });

  it('should have winningNumberDigit2 defined', function () {
    const winningNumberDigit2 = model.getWinningNumberDigit2();
    expect(winningNumberDigit2).toBeDefined('winningNumberDigit2 is not defined');
  });

  it('should have winningNumberDigit3 defined', function () {
    const winningNumberDigit3 = model.getWinningNumberDigit3();
    expect(winningNumberDigit3).toBeDefined('winningNumberDigit3 is not defined');
  });

  it('should have winningNumberDigit3 defined', function () {
    const winningNumberDigit3 = model.getWinningNumberDigit3();
    expect(winningNumberDigit3).toBeDefined('winningNumberDigit3 is not defined');
  });


  // hasWinner
  it('should change hasWinner to true', function () {
    const trueValue = true;
    model.setHasGeneratedWinner(trueValue);
    const hasWinner = model.getHasGeneratedWinner();
    expect(hasWinner).toBeTrue();
  });


});
