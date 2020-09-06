'use strict';

import {DrawingResult} from './drawing-result';
import {DrawingTimeEnum} from '../providers/prediction/api/v1/drawing-time.enum';

describe('DrawingResult', () => {
  it('equates with matching untyped object literals', () => {

    let underTest: DrawingResult = {
      drawDate: '2018-03-23',
      drawTime: DrawingTimeEnum.DAY,
      drawResult: 123,
    };

    expect({
      drawDate: '2018-03-23',
      drawTime: DrawingTimeEnum.DAY,
      drawResult: 123,
    }).toEqual(underTest);
  });

});
