'use strict';

import { browser, element, by } from 'protractor';

describe('Today Tab', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/results');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3');
  });

  it('should load the today page', () => {
    expect(element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent()).toEqual(true);
  });

  it('should show progress bars immediately', () => {
    expect(element(by.tagName('progress-indeterminate')).isPresent()).toEqual(true);
  });

  it('should complete all web scrapes within 5s of page load', () => {
    setTimeout(() => {
      expect(element(by.tagName('progress-indeterminate')).isPresent()).toEqual(false);
    }, 5000);
  });
});
