'use strict';

import {Pick3PlaysRequest} from "./Pick3PlaysRequest.model";
import {DrawingTime} from "./DrawingTime.model";

describe('Pick3PlaysRequest', () => {

  it('equates with matching untyped object literals', () => {
    var d1: Date = new Date(),
        d2: Date = new Date();

    var request: Pick3PlaysRequest = {
      winDrawDate: d1,
      futureDrawDate: d2,
      winDrawTime: DrawingTime.DAY,
      futureDrawTime: DrawingTime.MORNING,
      winNumber: 123
    };

    expect({
      winDrawDate: d1,
      futureDrawDate: d2,
      winDrawTime: DrawingTime.DAY,
      futureDrawTime: DrawingTime.MORNING,
      winNumber: 123
    }).toEqual(request);
  });

});
