import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';

export namespace NavigationEnum {
  export enum NavigationEnum {
    default,
    gotoHome,
    gotoPreviousWinningNumber,
    gotoGenerateNumber,
    gotoViewPicks,
    viewPicksDisabled,
    generatePicksDisabled,
    onViewEnabledHome,
  }

  export function retrieveNavigation(e: string): NavigationEnum {
    let propertyKey: NavigationEnum = null;
    switch (e) {
      case 'gotoHome':
        propertyKey = NavigationEnum.gotoHome;

        break;
      case 'gotoPreviousWinningNumber':
        propertyKey = NavigationEnum.gotoPreviousWinningNumber;

        break;
      case 'gotoGenerateNumber':
        propertyKey = NavigationEnum.gotoGenerateNumber;

        break;
      case 'gotoViewPicks':
        propertyKey = NavigationEnum.gotoViewPicks;

        break;
      case 'viewPicksDisabled':
        propertyKey = NavigationEnum.viewPicksDisabled;
        break;
      case 'generatePicksDisabled':
        propertyKey = NavigationEnum.generatePicksDisabled;
        break;
      case 'onViewEnabledHome':
        propertyKey = NavigationEnum.onViewEnabledHome;
        break;
    }

    return propertyKey;
  }
}
