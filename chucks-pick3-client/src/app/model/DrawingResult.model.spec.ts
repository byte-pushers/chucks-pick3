'use strict';

import {DrawingResult} from "./DrawingResult.model";
import {DrawingTime} from "../providers/prediction/api/v1/DrawingTime.model";

describe('DrawingResult', () => {
  it('equates with matching untyped object literals', () => {

    var underTest: DrawingResult = {
      drawDate: "2018-03-23",
      drawTime: DrawingTime.DAY,
      winNumber: 123
    };

    expect({
      drawDate: d1,
      drawTime: DrawingTime.DAY,
      winNumber: 123
    }).toEqual(underTest);
  });

});
