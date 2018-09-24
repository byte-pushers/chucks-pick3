'use strict';

import {browser, element, by, ExpectedConditions} from 'protractor';

describe('Future Select Page', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/predictFor/2008-09-19/DAY/468')
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3', 'title not equal to "Chuck\'s Pick 3"');
  });

  it('should load the future-select-page', () => {
    expect(element(by.css('page-future-select')).isDisplayed()).toEqual(true, 'today tab not shown');
  });

});
