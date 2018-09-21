'use strict';

import { browser, element, by } from 'protractor';

describe('Chucks Pick 3', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Chuck\'s Pick 3');
  });

  it('should load up the tabs page', () => {
    expect(element(by.tagName('ion-nav')).isPresent()).toEqual(true);
  });

  it('should include tabs named "Today", "History", and "About"', () => {
    expect(element(by.tagName('ion-tabs')).isPresent()).toEqual(true);
    expect(element(by.css('ion-tab[tabtitle="Today"]')).isPresent()).toEqual(true);
    expect(element(by.css('ion-tab[tabtitle="History"]')).isPresent()).toEqual(true);
    expect(element(by.css('ion-tab[tabtitle="About"]')).isPresent()).toEqual(true);
  });

  it('should start on the today page', () => {
    expect(element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent()).toEqual(true);
  });

  it('should present tab buttons laid out in order of "Today", "History" and "About"', () => {
    expect(element.all(by.css('a.tab-button')).get(0).element(by.css('.tab-button-text')).getText()).toEqual('Today');
    expect(element.all(by.css('a.tab-button')).get(1).element(by.css('.tab-button-text')).getText()).toEqual('History');
    expect(element.all(by.css('a.tab-button')).get(2).element(by.css('.tab-button-text')).getText()).toEqual('About');
  });

  it('should navigate to the "History" page when History button is clicked', () => {
    element.all(by.css('a.tab-button')).get(1).click().then(() => {
      expect(element(by.css('ion-tab[tabtitle="History"].show-tab')).isPresent()).toEqual(true);
    });
  });

  it('should navigate to the "About" page when About button is clicked', () => {
    element.all(by.css('a.tab-button')).get(2).click().then(() => {
      expect(element(by.css('ion-tab[tabtitle="About"].show-tab')).isPresent()).toEqual(true);
    });
  });

  it('should navigate back to the "Today" page when Today button is clicked', () => {
    // First change to "About"
    element.all(by.css('a.tab-button')).get(2).click().then(() => {
      // Then change to "Today"
      element.all(by.css('a.tab-button')).get(0).click().then(() => {
        // Ensure the "Today" tab is showing.
        expect(element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent()).toEqual(true);
      });
    });
  });

});
