'use strict';

import {DateUtil} from './DateUtil';

describe('DateUtil', () => {
  it('converts dates to strings', () => {
    let d: Date = new Date(2018, 5, 15);
    expect(DateUtil.dateToString(d)).toBe('2018-06-15');
  });

  it('converts strings to dates', () => {
    let d: Date = new Date(2018, 5, 15);
    d.setHours(0, 0, 0, 0);
    expect(DateUtil.stringToDate('2018-06-15')).toEqual(d);
  });

  it('properly handles dates across the year boundary', () => {
    let d: Date = new Date(2018, 11, 31);
    expect(DateUtil.dateToString(d)).toBe('2018-12-31');
    expect(DateUtil.stringToDate('2018-12-31')).toEqual(d);
    d = new Date(2018, 0, 1);
    expect(DateUtil.dateToString(d)).toBe('2018-01-01');
    expect(DateUtil.stringToDate('2018-01-01')).toEqual(d);
  });
});
