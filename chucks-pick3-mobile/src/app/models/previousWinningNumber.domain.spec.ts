
import {Pick3DrawTimeEnum} from "./pick3-draw-time.enum";
import {PreviousWinningNumberDomain} from "./previousWinningNumber.domain";
describe('PreviousWinningNumberDomain', () => {
  const date = new Date();
  beforeEach(() => {

  });
  let model = new PreviousWinningNumberDomain({
    drawDate: date,
    drawState: 'TX',
    drawTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY

  });

  // drawDate
  it('should have a drawDate defined', function () {
    const drawDate = model.getDrawDate();
    expect(drawDate).toEqual(date, 'drawDate was not retrieved');
  });
  it('should the drawDate to be changed', function () {
    const nullValue = null;
    model.setDrawDate(nullValue);
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeNull('drawState was not changed');
  });

  //drawState
  it('should have a drawState defined', function () {
    const drawState = model.getDrawState();
    expect(drawState).toBeDefined();
  });
  it('should the drawState to be changed', function () {
    const nullValue = null;
    model.setDrawState(nullValue);
    const drawState = model.getDrawState();
    expect(drawState).toBeNull('drawState was not changed');
  });

  // drawTime
  it('should have a drawTime defined', function () {
    model.setDrawTime(Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY);
    const drawTime = model.getDrawTime();
    expect(drawTime).toEqual(Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY, 'drawTime is not defined');
  });
  it('should the drawTime to be changed', function () {
    const nullValue = null;
    model.setDrawTime(nullValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeNull('drawTime was not changed');
  });
});
