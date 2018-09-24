'use strict';

import {browser, element, by} from 'protractor';

describe('Today Tab', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/results/2008-09-19') // using a past date to ensure determinism
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3', 'title not equal to "Chuck\'s Pick 3"');
  });

  it('should load the today page', () => {
    expect(element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent()).toEqual(true, 'today tab not shown');
  });

  it('should show progress bars', () => {
    expect(element(by.tagName('progress-indeterminate')).isDisplayed()).toEqual(true, 'progress-indeterminate not displayed on page load');
  });

  it('should correctly report the draw results for 2008-09-19', () => {
    browser.driver.sleep(5000);
    let expected = ['N/A', '468', 'N/A', '481'],
        els = element.all(by.className('win-number'));
    for (let i = 0; i < expected.length; ++i) {
      expect(els.get(i).getText()).toEqual(expected[i], i + 'th win-number was not equal to ' + expected[i]);
      console.log(els.get(i).getText());
    }
  });

  it('should raise a toast when an unavailable drawing is clicked', () => {
    element.all(by.className('drawing-row')).get(0).click();
    expect(element(by.tagName('ion-toast')).isPresent()).toEqual(true);
  });

  it('should take the user to the prediction page when an available drawing is clicked', () => {
    element.all(by.className('drawing-row')).get(1).click();
    browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toMatch(/.*predictFor\/2008-09-19\/DAY\/468.*/);
  });
});
