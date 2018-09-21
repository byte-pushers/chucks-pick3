import { browser, element, by } from 'protractor';

describe('Chucks Pick 3', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    browser.getTitle().then(title => expect(title).toEqual('Chuck\'s Pick 3'));
  });

  it('should load up the tabs page', () => {
    element(by.tagName('ion-nav')).isPresent().then(present => expect(present).toEqual(true));
  });

  it('should include tabs named "Today", "History", and "About"', () => {
    element(by.tagName('ion-tabs')).isPresent().then(present => expect(present).toEqual(true));
    element(by.css('ion-tab[tabtitle="Today"]')).isPresent().then(present => expect(present).toEqual(true));
    element(by.css('ion-tab[tabtitle="History"]')).isPresent().then(present => expect(present).toEqual(true));
    element(by.css('ion-tab[tabtitle="About"]')).isPresent().then(present => expect(present).toEqual(true));
  });

  it('should start on the today page', () => {
    element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent().then(present => expect(present).toEqual(true));
  });

  it('should present tab buttons laid out in order of "Today", "History" and "About"', () => {
    expect(element.all(by.css('a.tab-button')).get(0).element(by.css('.tab-button-text')).getText()).toEqual('Today');
    expect(element.all(by.css('a.tab-button')).get(1).element(by.css('.tab-button-text')).getText()).toEqual('History');
    expect(element.all(by.css('a.tab-button')).get(2).element(by.css('.tab-button-text')).getText()).toEqual('About');
  });

  it('should navigate to the "History" page when History button is clicked', () => {
    element.all(by.css('a.tab-button')).get(1).click().then(() => {
      element(by.css('ion-tab[tabtitle="History"].show-tab')).isPresent().then(present => expect(present).toEqual(true));
    });
  });

  it('should navigate to the "About" page when About button is clicked', () => {
    element.all(by.css('a.tab-button')).get(2).click().then(() => {
      element(by.css('ion-tab[tabtitle="About"].show-tab')).isPresent().then(present => expect(present).toEqual(true));
    });
  });

  it('should navigate back to the "Today" page when Today button is clicked', () => {
    // First change to "About"
    element.all(by.css('a.tab-button')).get(2).click().then(() => {
      // Then change to "Today"
      element.all(by.css('a.tab-button')).get(0).click().then(() => {
        // Ensure the "Today" tab is showing.
        element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent().then(present => expect(present).toEqual(true));
      });
    });
  });

});
