import { browser, by, element } from 'protractor';

export class Pick3DrawTimeInfoSectionPo {
  navigateTo() {
    return browser.get('/home');
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
