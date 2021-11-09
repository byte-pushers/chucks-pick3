import {IonicToastNotificationService} from "../services/ionic-toast-notification.service";
import {TestBed} from "@angular/core/testing";
import {NavigationEnum} from "./navigate.enum";

describe('NavigationEnum', () => {
  let service = NavigationEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NavigationEnum]});
  });

  it('should return a enum value', function () {
   const navigationValue =  service.retrieveNavigation('gotoHome');
   expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoHome, 'did not return an enum value');
  });

  it('should return undefined', function () {
    const navigationValue =  service.retrieveNavigation('falseValue');
    expect(navigationValue).toBeNull();
  });
});
