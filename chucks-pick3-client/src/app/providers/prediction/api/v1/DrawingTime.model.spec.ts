'use strict';

import {DrawingTime} from './DrawingTime.model';

describe('DrawingTime', () => {

  it('equates DrawingTime.MORNING to string "MORNING"', () => {
    expect(DrawingTime.MORNING).toEqual("MORNING");
  });

  it('equates DrawingTime.EVENING to string "EVENING"', () => {
    expect(DrawingTime.EVENING).toEqual("EVENING");
  });

  it('equates DrawingTime.NIGHT to string "NIGHT"', () => {
    expect(DrawingTime.NIGHT).toEqual("NIGHT");
  });

  it('equates DrawingTime.DAY to string "DAY"', () => {
    expect(DrawingTime.DAY).toEqual("DAY");
  });

});
