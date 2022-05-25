import { TestBed } from '@angular/core/testing';
import { NavigationEnum } from './navigate.enum';

describe('NavigationEnum', () => {
  const enumValue = NavigationEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NavigationEnum] });
  });

  it('should return NavigationEnum.homeEnabled enum', function () {
    const navigationValue = enumValue.retrieveNavigation('homeEnabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.homeEnabled, 'did not return NavigationEnum.homeEnabled');
  });

  it('should return NavigationEnum.gotoPreviousWinningNumber enum', function () {
    const navigationValue = enumValue.retrieveNavigation('previousWinningNumberEnabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.previousWinningNumberEnabled, 'did not return NavigationEnum.gotoPreviousWinningNumber');
  });

  it('should return NavigationEnum.gotoGenerateNumber enum', function () {
    const navigationValue = enumValue.retrieveNavigation('generateNumberEnabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.generateNumberEnabled, 'did not return NavigationEnum.gotoGenerateNumber');
  });

  it('should return NavigationEnum.gotoViewPicks enum', function () {
    const navigationValue = enumValue.retrieveNavigation('viewPicksEnabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.viewPicksEnabled, 'did not return NavigationEnum.gotoGenerateNumber');
  });

  it('should return NavigationEnum.viewPicksDisabled enum', function () {
    const navigationValue = enumValue.retrieveNavigation('viewPicksDisabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.viewPicksDisabled, 'did not return NavigationEnum.viewPicksDisabled');
  });

  it('should return NavigationEnum.generatePicksDisabled enum', function () {
    const navigationValue = enumValue.retrieveNavigation('generatePicksDisabled');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.generatePicksDisabled, 'did not return NavigationEnum.generatePicksDisabled');
  });

  it('should return NavigationEnum.onViewEnabledHome enum', function () {
    const navigationValue = enumValue.retrieveNavigation('onViewEnabledHome');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.onViewEnabledHome, 'did not return NavigationEnum.onViewEnabledHome');
  });
  it('should return undefined', function () {
    const navigationValue = enumValue.retrieveNavigation('falseValue');
    expect(navigationValue).toBeNull();
  });
});
