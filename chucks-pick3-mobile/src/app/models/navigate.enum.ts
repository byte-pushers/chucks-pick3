import { Pick3DrawTimeEnum } from './pick3-draw-time.enum';

export namespace NavigationEnum {
  export enum NavigationEnum {
    default,
    homeEnabled,
    previousWinningNumberEnabled,
    generateNumberEnabled,
    viewPicksEnabled,
    viewPicksDisabled,
    generatePicksDisabled,
    onViewEnabledHome,
  }

  export function retrieveNavigation(e: string): NavigationEnum {
    let propertyKey: NavigationEnum = null;
    switch (e) {
      case 'homeEnabled':
        propertyKey = NavigationEnum.homeEnabled;

        break;
      case 'previousWinningNumberEnabled':
        propertyKey = NavigationEnum.previousWinningNumberEnabled;

        break;
      case 'generateNumberEnabled':
        propertyKey = NavigationEnum.generateNumberEnabled;

        break;
      case 'viewPicksEnabled':
        propertyKey = NavigationEnum.viewPicksEnabled;

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
