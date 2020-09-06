'use strict';

import {DrawingTimeEnum} from './drawing-time.enum';
import {Pick3PlaysResponse} from './pick3-plays-response';

describe('Pick3PlaysResponse', () => {

  it('equates with matching untyped object literals', () => {
    const request: Pick3PlaysResponse = {
      date: '2018-05-13',
      drawingTime: DrawingTimeEnum.DAY,
      plays: [123, 234, 345],
    };

    expect({
      date: '2018-05-13',
      drawingTime: DrawingTimeEnum.DAY,
      plays: [ 123, 234, 345],
    }).toEqual(request);
  });

});
