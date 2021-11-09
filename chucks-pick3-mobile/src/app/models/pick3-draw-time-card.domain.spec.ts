import {Pick3DrawTimeCardDomain} from "./pick3-draw-time-card.domain";
import {TestBed} from "@angular/core/testing";
import {NumberUtilityService} from "../services/numberUtility.service";
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";
import {Pick3LotteryService} from "../services/pick3-lottery.service";
import {IonicToastNotificationService} from "../services/ionic-toast-notification.service";
describe('Pick3DrawTimeCardDomain', () => {

  beforeEach(() => {

  });
  let model = new Pick3DrawTimeCardDomain({
    pick3DrawCardId : 7,
    icon : "Morning",
    title: "Morning",
    pick3DrawTime: [Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING, new Date()],
    dateTime: new Date,
    drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
    state: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING,
    selected: true,
    showCountDownToDrawing: false,
    pick3DrawTimeArray: [33,555,264,346,345]

  });

  // pick3DrawCardId
  it('should have a pick3DrawCardId defined', function () {
    const pick3DrawCardId = model.getPick3DrawCardId();
    expect(pick3DrawCardId).toBeDefined();
  });
  it('should change the pick3DrawCardId', function () {
    const pick3DrawCardIdValue = 6;
    model.setPick3DrawCardId(pick3DrawCardIdValue);
    const pick3DrawCardId = model.getPick3DrawCardId();
    expect(pick3DrawCardId).toBe(6,'pick3DrawCardId was not changed');
  });

  // drawTime
  it('should have a drawTime defined', function () {
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeDefined( 'drawTime is not defined');
  });
  it('should the drawTime to be changed', function () {
    const nightValue = Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT;
    model.setDrawTime(nightValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBe(nightValue,'drawTime was not changed')
  });

  it('should have a state defined', function () {
    const state = model.getState();
    expect(state).toBeDefined('state is not defined');
  });
  it('should change the state', function () {
    const nightValue = Pick3DrawTimeEnum.Pick3DrawTimeEnum.NIGHT;
    model.setDrawTime(nightValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBe(nightValue,'drawTime was not changed')
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

  // icon
  it('should have title defined', function () {
    const title = model.getTitle();
    expect(title).toBeDefined('title is not defined');
  });
  it('should change the title', function () {
    const nullValue = null;
    model.setTitle(nullValue);
    const title = model.getTitle();
    expect(title).toBeNull('title was not changed');
  });

  // pick3DrawTimeArray
  it('should have a pick3DrawTimeArray defined', function () {
    const pick3DrawTimeArray = model.getPick3DrawTimeArray();
    expect(pick3DrawTimeArray).toBeDefined('pick3DrawTimeArray is not defined');
  });
  it('should change the pick3DrawTimeArray', function () {
    const pick3DrawTimeArrayValue = [264,342,453,436,567];
    model.setPick3DrawTimeArray(pick3DrawTimeArrayValue);
    const winningNumber = model.getPick3DrawTimeArray();
    expect(winningNumber).toEqual([264,342,453,436,567], 'winningNumber has been changed');
  });

  // selected

  it('should change selected to false', function () {
    const falseValue = false;
    model.setSelected(falseValue);
    const selected = model.getSelected();
    expect(selected).toBeFalse();
  });

  // showCountDownToDrawing
  it('should change showCountDownToDrawing to true', function () {
    const showCountDownToDrawingValue = true;
    model.setSelected(showCountDownToDrawingValue);
    const showCountDownToDrawing = model.getSelected();
    expect(showCountDownToDrawing).toBeTrue();
  });
});
