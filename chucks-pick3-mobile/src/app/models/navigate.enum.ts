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

  export function retrieveNavigation(navEnumValue: string): NavigationEnum {
    let propertyKey: NavigationEnum = null;
    let navEnum: NavigationEnum = NavigationEnum[navEnumValue];

    switch (navEnum) {
      case NavigationEnum.homeEnabled:
        propertyKey = NavigationEnum['homeEnabled'];

        break;
      case NavigationEnum.previousWinningNumberEnabled:
        propertyKey = NavigationEnum['previousWinningNumberEnabled'];

        break;
      case NavigationEnum.generateNumberEnabled:
        propertyKey = NavigationEnum['generateNumberEnabled'];

        break;
      case NavigationEnum.viewPicksEnabled:
        propertyKey = NavigationEnum['viewPicksEnabled'];

        break;
      case NavigationEnum.viewPicksDisabled:
        propertyKey = NavigationEnum['viewPicksDisabled'];
        break;
      case NavigationEnum.generatePicksDisabled:
        propertyKey = NavigationEnum['generatePicksDisabled'];
        break;
      case NavigationEnum.onViewEnabledHome:
        propertyKey = NavigationEnum['onViewEnabledHome'];
        break;
    }

    return propertyKey;
  }
}
