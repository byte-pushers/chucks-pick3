'use strict';

import {browser, element, by} from 'protractor';
import {DateUtil} from '../src/app/model/DateUtil';

describe('Prediction Page', () => {

  beforeEach(async () => {
    let today = DateUtil.dateToString(new Date());
    await browser.get('/#/tab/today/numbers/2008-09-19/DAY/468/' + today + '/EVENING') // using a past date to ensure determinism
  });

  it('should display the draw time', () => {
    expect(element(by.className('draw-time')).getText()).toEqual("Day");
  });

  it('should load predictions within 5s of loading the page', () => {
    browser.driver.sleep(5000);
    expect(element(by.css('div[item-content]')).getText()).toMatch(/\d{3}/, "not even one prediction found");

    expect(element.all(by.css('div[item-content]')).count()).toBeGreaterThan(10, "fewer than 10 predictions returned");
  });
});
