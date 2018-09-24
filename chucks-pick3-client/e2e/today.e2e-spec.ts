'use strict';

import { browser, element, by } from 'protractor';

describe('Today Tab', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/results/2008-09-19') // using a past date to ensure determinism
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3');
  });

  it('should load the today page', () => {
    expect(element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent()).toEqual(true);
  });

  it('should show progress bars', () => {
    expect(element(by.tagName('progress-indeterminate')).isPresent()).toEqual(true);
  });

  it('should complete all scrapes within 5s of page load', () => {
    setTimeout(() => {
      expect(element(by.tagName('progress-indeterminate')).isPresent()).toEqual(false);
    }, 5000);
  });

  it('should correctly report the draw results for 2008-09-19', () => {
    setTimeout(() => {
      let expected = ['N/A', '468', 'N/A', '481'],
          els = element.all(by.className('win-number'));
      for (let i = 0; i < expected.length; ++i) {
        expect(els.get(i).getText()).toEqual(expected[i]);
        console.log(els.get(i).getText());
      }
    }, 5000);
  });

});
