'use strict';

import {DrawingTime} from "./DrawingTime.model";
import {Pick3PlaysResponse} from "./Pick3PlaysResponse.model";

describe('Pick3PlaysResponse', () => {

  it('equates with matching untyped object literals', () => {
    var request: Pick3PlaysResponse = {
      date: "2018-05-13",
      drawingTime: DrawingTime.DAY,
      plays: [123, 234, 345]
    };

    expect({
      date: "2018-05-13",
      drawingTime: DrawingTime.DAY,
      plays: [ 123, 234, 345]
    }).toEqual(request);
  });

});
