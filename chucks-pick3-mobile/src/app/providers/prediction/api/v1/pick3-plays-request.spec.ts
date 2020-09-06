'use strict';

import {Pick3PlaysRequest} from './pick3-plays-request.model';
import {DrawingTimeEnum} from './drawing-time.enum';

describe('Pick3PlaysRequest', () => {

  it('equates with matching untyped object literals', () => {
    const d1: Date = new Date(),
        d2: Date = new Date();

    const request: Pick3PlaysRequest = {
      winDrawDate: d1,
      futureDrawDate: d2,
      winDrawTime: DrawingTimeEnum.DAY,
      futureDrawTime: DrawingTimeEnum.MORNING,
      winNumber: 123,
    };

    expect({
      winDrawDate: d1,
      futureDrawDate: d2,
      winDrawTime: DrawingTimeEnum.DAY,
      futureDrawTime: DrawingTimeEnum.MORNING,
      winNumber: 123,
    }).toEqual(request);
  });

});
