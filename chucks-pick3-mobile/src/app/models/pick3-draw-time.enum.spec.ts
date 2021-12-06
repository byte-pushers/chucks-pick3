import {TestBed} from '@angular/core/testing';
import {
  DAY_DRAW_TIME_KEY,
  EVENING_DRAW_TIME_KEY,
  MORNING_DRAW_TIME_KEY, NIGHT_DRAW_TIME_KEY,
  Pick3DrawTimeEnum
} from './pick3-draw-time.enum';

describe('Pick3DrawTimeEnum', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [Pick3DrawTimeEnum]});
  });

  //Property Keys

  it('should return MORNING_DRAW_TIME_KEY property key ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyKey(Pick3DrawTimeEnum.MORNING);
    expect(pick3DrawTimeValue).toEqual(MORNING_DRAW_TIME_KEY);
  });

  it('should return DAY_DRAW_TIME_KEY property key ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyKey(Pick3DrawTimeEnum.DAY);
    expect(pick3DrawTimeValue).toEqual(DAY_DRAW_TIME_KEY);
  });

  it('should return EVENING_DRAW_TIME_KEY property key ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyKey(Pick3DrawTimeEnum.EVENING);
    expect(pick3DrawTimeValue).toEqual(EVENING_DRAW_TIME_KEY);
  });

  it('should return EVENING_DRAW_TIME_KEY property key ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyKey('evening');
    expect(pick3DrawTimeValue).toEqual(EVENING_DRAW_TIME_KEY);
  });

  it('should return NIGHT_DRAW_TIME_KEY property key ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyKey(Pick3DrawTimeEnum.NIGHT);
    expect(pick3DrawTimeValue).toEqual(NIGHT_DRAW_TIME_KEY);
  });

  // property value

  it('should return Morning ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyValue(Pick3DrawTimeEnum.MORNING);
    expect(pick3DrawTimeValue).toEqual('Morning');
  });

  it('should return Day ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyValue(Pick3DrawTimeEnum.DAY);
    expect(pick3DrawTimeValue).toEqual('Day');
  });

  it('should return Evening ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyValue(Pick3DrawTimeEnum.EVENING);
    expect(pick3DrawTimeValue).toEqual('Evening');
  });

  it('should return Night ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getPropertyValue(Pick3DrawTimeEnum.NIGHT);
    expect(pick3DrawTimeValue).toEqual('Night');
  });

  // toString
  it('should return MORNING ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.MORNING);
    expect(pick3DrawTimeValue).toEqual('MORNING');
  });
  it('should return DAY ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.DAY);
    expect(pick3DrawTimeValue).toEqual('DAY');
  });
  it('should return EVENING ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.EVENING);
    expect(pick3DrawTimeValue).toEqual('EVENING');
  });
  it('should return NIGHT ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.toString(Pick3DrawTimeEnum.NIGHT);
    expect(pick3DrawTimeValue).toEqual('NIGHT');
  });
  it('should return NIGHT ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.toString('night');
    expect(pick3DrawTimeValue).toEqual('NIGHT');
  });

  // get icon

  it('should return night-icon ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getIcon('night');
    expect(pick3DrawTimeValue).toEqual('night-icon');
  });

  it('should return NIGHT ', () => {
    const pick3DrawTimeValue = Pick3DrawTimeEnum.getIcon(Pick3DrawTimeEnum.NIGHT);
    expect(pick3DrawTimeValue).toEqual('night-icon');
  });
});
