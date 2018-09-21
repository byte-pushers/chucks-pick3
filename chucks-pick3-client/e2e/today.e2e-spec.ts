import { browser, element, by } from 'protractor';

describe('Today Tab', () => {

  beforeEach(async () => {
    await browser.get('#/tab/today/results');
  });

  it('should have a title', () => {
    browser.getTitle().then(title => expect(title).toEqual('Chuck\'s Pick 3'));
  });

  it('should load the today page', () => {
    element(by.css('ion-tab[tabtitle="Today"].show-tab')).isPresent().then(present => expect(present).toEqual(true));
  });

  it('should show progress bars immediately', () => {
    element(by.tagName('progress-indeterminate')).isPresent().then(present => expect(present).toEqual(true));
  });

  it('should complete all web scrapes within 5s of page load', async () => {
    await new Promise(resolve => setTimeout(() => resolve(() => {
      element(by.tagName('progress-indeterminate')).isPresent().then(present => expect(present).toEqual(false));
    }), 5000));
  });
});
