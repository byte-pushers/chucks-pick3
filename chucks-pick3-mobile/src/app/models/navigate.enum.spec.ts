import {TestBed} from '@angular/core/testing';
import {NavigationEnum} from './navigate.enum';

describe('NavigationEnum', () => {
  const enumValue = NavigationEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NavigationEnum]});
  });

  it('should return a enum value', function () {
    const navigationValue = enumValue.retrieveNavigation('gotoHome');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoHome, 'did not return an enum value');
  });

  it('should return undefined', function () {
    const navigationValue = enumValue.retrieveNavigation('falseValue');
    expect(navigationValue).toBeNull();
  });
});
