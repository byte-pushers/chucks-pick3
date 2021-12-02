import {PreviousWinningNumberDomain} from './previousWinningNumber.domain';
import {Pick3DrawTimeEnum} from './pick3-draw-time.enum';


describe('PreviousWinningNumberDomain', () => {
  const date = new Date();
  beforeEach(() => {

  });
  let model = new PreviousWinningNumberDomain({
    drawDate: date,
    drawState: 'TX',
    drawTime: Pick3DrawTimeEnum.DAY

  });


  // drawDate
  it('should have a drawDate defined',  () => {
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeDefined('drawDateIsNotDefined');
  });

  it('should the drawDate to be changed',  () => {
    const nullValue = null;
    model.setDrawDate(nullValue);
    const drawDate = model.getDrawDate();
    expect(drawDate).toBeNull('drawState was not changed');
  });

  it('should set drawDate', () => {
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    const setDrawDate = spyOnProperty(model, 'drawDate', 'set');
    model.drawDate = yesterday;
    expect(setDrawDate).toHaveBeenCalled();
  });

  it('should get and set drawDate', () => {
    const yesterday = new Date(new Date().setDate(new Date().getDate()-1));
    model.drawDate = yesterday;
    expect(model.drawDate).toEqual(yesterday);
  });

  //drawState
  it('should have a drawState defined',  () => {
    const drawState = model.getDrawState();
    expect(drawState).toBeDefined();
  });
  it('should the drawState to be changed',  () => {
    const nullValue = null;
    model.setDrawState(nullValue);
    const drawState = model.getDrawState();
    expect(drawState).toBeNull('drawState was not changed');
  });
  it('should get drawState',  () => {
    spyOnProperty(model, 'drawState', 'get').and.returnValue('TX');
    expect(model.drawState).toBe('TX');
  });

  it('should get and set drawState ',  () => {
    model.drawState = 'NV';
    expect(model.drawState).toEqual('NV');
  });


  // drawTime
  it('should have a drawTime defined',  () => {
    model.setDrawTime(Pick3DrawTimeEnum.DAY);
    const drawTime = model.getDrawTime();
    expect(drawTime).toEqual(Pick3DrawTimeEnum.DAY, 'drawTime is not defined');
  });
  it('should the drawTime to be changed',  () => {
    const nullValue = null;
    model.setDrawTime(nullValue);
    const drawTime = model.getDrawTime();
    expect(drawTime).toBeNull('drawTime was not changed');
  });
  it('should have a drawTime defined',  () => {
    model.setDrawTime(Pick3DrawTimeEnum.DAY);
    const drawTime = model.getDrawTime();
    expect(drawTime).toEqual(Pick3DrawTimeEnum.DAY, 'drawTime is not defined');
  });

  it('should get and set drawTime',  () => {
    model.drawTime = Pick3DrawTimeEnum.NIGHT;
    expect(model.drawTime).toEqual(Pick3DrawTimeEnum.NIGHT);
  });
});
