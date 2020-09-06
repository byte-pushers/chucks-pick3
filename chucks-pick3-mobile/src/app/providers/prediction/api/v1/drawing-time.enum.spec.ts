'use strict';

import {DrawingTimeEnum} from './drawing-time.enum';

describe('DrawingTime', () => {

  it('equates DrawingTimeEnum.MORNING to string "MORNING"', () => {
    expect(DrawingTimeEnum.MORNING).toEqual('MORNING');
  });

  it('equates DrawingTimeEnum.EVENING to string "EVENING"', () => {
    expect(DrawingTimeEnum.EVENING).toEqual('EVENING');
  });

  it('equates DrawingTimeEnum.NIGHT to string "NIGHT"', () => {
    expect(DrawingTimeEnum.NIGHT).toEqual('NIGHT');
  });

  it('equates DrawingTimeEnum.DAY to string "DAY"', () => {
    expect(DrawingTimeEnum.DAY).toEqual('DAY');
  });

});
