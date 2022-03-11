import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/home');
  }
  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getPick3DrawTimeId() {
    return element(by.id('draw.time.enum.morning'));
  }

  getPick3DrawTimeButton() {
    return element(
      by.cssContainingText('pick3-draw-time-card', 'draw.time.enum.day')
    );
  }
}
