import { TestBed } from '@angular/core/testing';
import { NavigationEnum } from './navigate.enum';

describe('NavigationEnum', () => {
  const enumValue = NavigationEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [NavigationEnum] });
  });

  it('should return NavigationEnum.gotoHome enum', function () {
    const navigationValue = enumValue.retrieveNavigation('gotoHome');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoHome, 'did not return NavigationEnum.gotoHome');
  });

  it('should return NavigationEnum.gotoPreviousWinningNumber enum', function () {
    const navigationValue = enumValue.retrieveNavigation('gotoPreviousWinningNumber');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoPreviousWinningNumber, 'did not return NavigationEnum.gotoPreviousWinningNumber');
  });

  it('should return NavigationEnum.gotoGenerateNumber enum', function () {
    const navigationValue = enumValue.retrieveNavigation('gotoGenerateNumber');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoGenerateNumber, 'did not return NavigationEnum.gotoGenerateNumber');
  });

  it('should return NavigationEnum.gotoViewPicks enum', function () {
    const navigationValue = enumValue.retrieveNavigation('gotoViewPicks');
    expect(navigationValue).toBe(NavigationEnum.NavigationEnum.gotoViewPicks, 'did not return NavigationEnum.gotoGenerateNumber');
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
