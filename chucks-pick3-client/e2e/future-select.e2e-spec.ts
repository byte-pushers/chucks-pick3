'use strict';

import {browser, element, by} from 'protractor';

describe('Today Tab', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/predictFor/2008-09-19/DAY/468')
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3', 'title not equal to "Chuck\'s Pick 3"');
  });

  it('should load the future-select-page', () => {
    expect(element(by.css('page-future-select')).isDisplayed()).toEqual(true, 'today tab not shown');
  });

  it('should show date picker when "select-day" widget is clicked', () => {
    element(by.id('select-day')).click();
    browser.driver.sleep(300);
    expect(element(by.tagName('ion-picker-cmp')).isPresent()).toEqual(true);
  });

  it('should allow the user to select the time', () => {
    element(by.id('select-time')).click();
    browser.driver.sleep(300);
    expect(element(by.tagName('ion-action-sheet')).isPresent()).toEqual(true);
    expect(element(by.className('action-sheet-title')).getText()).toEqual('Select time of drawing');

    element(by.css)
    element(by.cssContainingText('button', 'Night')).click();
    browser.driver.sleep(1000);
    expect(element(by.tagName('ion-action-sheet')).isPresent()).toEqual(false);
    expect(element(by.id('select-time')).$('ion-label').getText()).toEqual('Night');
  });
});
