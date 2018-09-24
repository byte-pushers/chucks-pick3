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

  it('should allow the user to submit after selecting both date and time', () => {
    selectDate();
    selectTime();
    expect(element(by.cssContainingText('button', 'Submit')).isEnabled()).toEqual(true, "submit button not enabled after selecting date and time");

    element(by.cssContainingText('button', 'Submit')).click();

    browser.driver.sleep(2000);
    expect(browser.getCurrentUrl()).toMatch(/.*numbers\/2008-09-19\/DAY\/468\/\d{4}-\d{2}-\d{2}\/NIGHT/, 'URL params not correct');
  });

  function selectDate() {
    element(by.id('select-day')).click();
    browser.driver.sleep(300);
    expect(element(by.tagName('ion-picker-cmp')).isPresent()).toEqual(true, 'date picker not displayed 300ms after clicking "select-day" widget');

    element(by.buttonText('Done')).click();
    browser.driver.sleep(1000);
    expect(element(by.tagName('ion-picker-cmp')).isPresent()).toEqual(false, 'date picker still present 1s after clicking Done button');
    expect(element(by.id('select-day')).$('ion-icon').getAttribute('ng-reflect-color')).toEqual('primary', 'date color not changed after selection');
  }

  function selectTime() {
    element(by.id('select-time')).click();
    browser.driver.sleep(300);
    expect(element(by.tagName('ion-action-sheet')).isPresent()).toEqual(true, 'action sheet not present 300ms after clicking "select-time" widget');
    expect(element(by.className('action-sheet-title')).getText()).toEqual('Select time of drawing');

    element(by.cssContainingText('button', 'Night')).click();
    browser.driver.sleep(1000);
    expect(element(by.tagName('ion-action-sheet')).isPresent()).toEqual(false);
    expect(element(by.id('select-time')).$('ion-label').getText()).toEqual('Night');
  }

});
