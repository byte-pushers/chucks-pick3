import {Pick3DrawTimeCardDomain} from './pick3-draw-time-card.domain';
import {Pick3DrawTimeCardStateEnum} from './pick3-draw-time-card-state.enum';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';
import {Pick3DrawDateCardDomain} from "./pick3-draw-date-card.domain";
import {Pick3LotteryService} from "../services/pick3-lottery.service";

describe('Pick3DrawTimeCardDomain', () => {
  const date = new Date();
  beforeEach(() => {

  });
  let dateModel = new Pick3DrawDateCardDomain({
    drawDate : date,
    drawState : 'gotoHome',
    drawTime: Pick3DrawTimeEnum.MORNING,
    drawTimeAsString: 'Morning',
    upcomingDrawTime: date,
    hasWinner: false,
    backgroundImage: Pick3LotteryService,
    winningNumber: 462,
    winningNumberDigits: [4,6,2],
    drawDateIcon: date,
    slideNumber: 7

  });
  let model = new Pick3DrawTimeCardDomain({
    pick3DrawCardId : 7,
    icon : 'Morning',
    title: 'Morning',
    pick3DrawTime: Pick3DrawTimeEnum.MORNING,
    dateTime: new Date,
    drawTime: Pick3DrawTimeEnum.MORNING,
    state: Pick3DrawTimeCardStateEnum.DRAWN,
    selected: true,
    showCountDownToDrawing: false,
    pick3DrawTimeArray: [33,555,264,346,345]

  });

  // pick3DrawCardId
  it('should have a pick3DrawCardId defined',  () => {
    const pick3DrawCardId = model.getPick3DrawCardId();
    expect(pick3DrawCardId).toBeDefined();
  });
  it('should change the pick3DrawCardId',  () => {
    const pick3DrawCardIdValue = 6;
    model.setPick3DrawCardId(pick3DrawCardIdValue);
    const pick3DrawCardId = model.getPick3DrawCardId();
    expect(pick3DrawCardId).toBe(6,'pick3DrawCardId was not changed');
  });
  it('should get and set the pick3DrawCardId',  () => {
    model.pick3DrawCardId = 6;
    expect(model.pick3DrawCardId).toEqual(6);
  });

  // drawTime
  it('should have a drawTime defined',  () => {
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeDefined( 'drawTime is not defined');
  });
  it('should the drawTime to be changed',  () => {
    const nightValue = Pick3DrawTimeEnum.NIGHT;
    model.setDrawTime(nightValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBe(nightValue,'drawTime was not changed');
  });
  it('should the drawTime to be changed',  () => {
    const nightValue = Pick3DrawTimeEnum.NIGHT;
    model.setDrawTime('night');
    const drawTime = model.getDrawTime();
    expect(drawTime).toBe(nightValue,'drawTime was not changed');
  });
  // drawtimeValue
  it('should have a drawTime defined',  () => {
    const drawTime = model.getDrawTimeValue();
    expect(drawTime).toBeDefined( 'drawTime is not defined');
  });
  it('should get and set the drawTime',  () => {
    model.drawTime = Pick3DrawTimeEnum.DAY;
    expect(model.drawTime).toEqual(Pick3DrawTimeEnum.DAY);
  });

  it('should have a state defined',  () => {
    const state = model.getState();
    expect(state).toBeDefined('state is not defined');
  });

  it('should set the state', function () {
    model.setState(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
    const state = model.getState();
    expect(state).toEqual(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
  });
  it('should change the state',  () => {
    const nightValue = Pick3DrawTimeEnum.NIGHT;
    model.setDrawTime(nightValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBe(nightValue,'drawTime was not changed');
  });
  it('should change the state',  () => {
    model.state = Pick3DrawTimeCardStateEnum.DRAWN;
    expect(model.state).toEqual(Pick3DrawTimeCardStateEnum.DRAWN);
  });



  // icon
  it('should have an icon defined',  () => {
    const icon = model.getIcon();
    expect(icon).toBeDefined('icon is not defined');
  });
  it('should change the icon',  () => {
    const nullValue = null;
    model.setIcon(nullValue);
    const icon = model.getIcon();
    expect(icon).toBeNull('icon was not changed');
  });

  it('should get and set the icon',  () => {
    model.icon = 'Night';
    expect(model.icon).toEqual('Night');
  });

  // title
  it('should have title defined',  () => {
    const title = model.getTitle();
    expect(title).toBeDefined('title is not defined');
  });
  it('should change the title',  () => {
    const nullValue = null;
    model.setTitle(nullValue);
    const title = model.getTitle();
    expect(title).toBeNull('title was not changed');
  });
  it('should get and set the title',  () => {
    model.title = 'Night';
    expect(model.title).toEqual('Night');
  });

  // pick3DrawTimeArray
  it('should have a pick3DrawTimeArray defined',  () => {
    const pick3DrawTimeArray = model.getPick3DrawTimeArray();
    expect(pick3DrawTimeArray).toBeDefined('pick3DrawTimeArray is not defined');
  });
  it('should change the pick3DrawTimeArray',  () => {
    const pick3DrawTimeArrayValue = [264,342,453,436,567];
    model.setPick3DrawTimeArray(pick3DrawTimeArrayValue);
    const winningNumber = model.getPick3DrawTimeArray();
    expect(winningNumber).toEqual([264,342,453,436,567], 'winningNumber has been changed');
  });
  it('should get and set the icon',  () => {
    model.pick3DrawTimeArray = [264,342,453,436,567];
    expect(model.pick3DrawTimeArray).toEqual([264,342,453,436,567]);
  });

  // selected

  it('should change selected to false',  () => {
    const falseValue = false;
    model.setSelected(falseValue);
    const selected = model.getSelected();
    expect(selected).toBeFalse();
  });
  it('should get and set the selected',  () => {
    model.selected = false;
    expect(model.selected).toEqual(false);
  });

  // showCountDownToDrawing
  it('should change showCountDownToDrawing to false',  () => {
    const showCountDownToDrawing = model.getShowCountDownToDrawing();
    expect(showCountDownToDrawing).toBeDefined();
  });

  it('should change showCountDownToDrawing to true',  () => {
    model.setShowCountDownToDrawing(true);
    const showCountDownToDrawing = model.getShowCountDownToDrawing();
    expect(showCountDownToDrawing).toBeTrue();
  });
  it('should get and set the icon',  () => {
    model.showCountDownToDrawing = true;
    expect(model.showCountDownToDrawing).toEqual(true);
  });


  it('should have a pick3DrawCardId defined',  () => {
    const pick3DateTime = model.getDateTime();
    expect(pick3DateTime).toBeDefined();
  });
  it('should change the pick3DrawCardId',  () => {
    model.setDateTime(date);
    const pick3DateTime = model.getDateTime();
    expect(pick3DateTime).toBe(date,'pick3DateTime was not changed');
  });
  it('should change the pick3DrawTime',  () => {
    model.dateTime = date;
    expect(model.dateTime).toEqual(date);
  });

  it('should compare Pick3DrawDateCards', function () {
    const compareTo = model.compareTo(dateModel);
    expect(compareTo).toBeDefined();
  });

});
