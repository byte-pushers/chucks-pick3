export const MORNING_DRAW_TIME_KEY = 'draw.time.enum.morning';
export const DAY_DRAW_TIME_KEY = 'draw.time.enum.day';
export const EVENING_DRAW_TIME_KEY = 'draw.time.enum.evening';
export const NIGHT_DRAW_TIME_KEY = 'draw.time.enum.night';

export enum Pick3DrawTimeEnum {
  MORNING,
  DAY,
  EVENING,
  NIGHT,
}

export namespace Pick3DrawTimeEnum {
  export function getPropertyKey(e: Pick3DrawTimeEnum | string): string {
    let propertyKey: string = null;

    if (typeof e === 'string') {
      e = e.toUpperCase();
      e = Pick3DrawTimeEnum[e];
    }

    switch (e) {
      case Pick3DrawTimeEnum.MORNING:
        propertyKey = MORNING_DRAW_TIME_KEY;

        break;
      case Pick3DrawTimeEnum.DAY:
        propertyKey = DAY_DRAW_TIME_KEY;

        break;
      case Pick3DrawTimeEnum.EVENING:
        propertyKey = EVENING_DRAW_TIME_KEY;

        break;
      case Pick3DrawTimeEnum.NIGHT:
        propertyKey = NIGHT_DRAW_TIME_KEY;

        break;
    }

    return propertyKey;
  }

  export function getPropertyValue(e: Pick3DrawTimeEnum): string {
    let propertyKey: string = null;
    switch (e) {
      case Pick3DrawTimeEnum.MORNING:
        propertyKey = 'Morning';

        break;
      case Pick3DrawTimeEnum.DAY:
        propertyKey = 'Day';

        break;
      case Pick3DrawTimeEnum.EVENING:
        propertyKey = 'Evening';

        break;
      case Pick3DrawTimeEnum.NIGHT:
        propertyKey = 'Night';

        break;
    }

    return propertyKey;
  }

  export function toString(e: Pick3DrawTimeEnum | string): string {
    let enumString: string = null;

    if (typeof e === 'string') {
      e = e.toUpperCase();
      e = Pick3DrawTimeEnum[e];
    }

    switch (e) {
      case Pick3DrawTimeEnum.MORNING:
        enumString = 'MORNING';
        break;
      case Pick3DrawTimeEnum.DAY:
        enumString = 'DAY';
        break;
      case Pick3DrawTimeEnum.EVENING:
        enumString = 'EVENING';
        break;
      case Pick3DrawTimeEnum.NIGHT:
        enumString = 'NIGHT';
        break;
    }

    return enumString;
  }

  export function getIcon(e: Pick3DrawTimeEnum | string): string {
    return toString(e).toLowerCase() + '-icon';
  }
}
