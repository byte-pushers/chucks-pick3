import { MyApp }                      from './app.component';
import { MenuMock, PlatformMock, StatusBarMock, SplashScreenMock } from 'ionic-mocks';

let instance: MyApp = null;

describe('ClickerApp', () => {

  beforeEach(() => {
    instance = new MyApp(
      (<any> PlatformMock.instance()),
      (<any>SplashScreenMock.instance()),
      (<any>StatusBarMock.instance()),
    );
  });

  /*it('initialises with two possible pages', () => {
    expect(instance['pages'].length).toEqual(2);
  });

  it('initialises with a root page', () => {
    expect(instance['rootPage']).not.toBe(null);
  });

  it('opens a page', () => {
    instance.openPage(instance['pages'][1]);
    expect(instance['menu']['close']).toHaveBeenCalled();
    expect(instance['nav'].setRoot).toHaveBeenCalledWith(Page2);
  });*/
});
