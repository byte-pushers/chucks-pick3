/**
 * DateUtil defines some static methods for manipulating dates and converting between strings and raw JavaScript dates.
 */
export abstract class DateUtil {
  public static stringToDate(s: string): Date {
    let parts: RegExpMatchArray = s.match(/(\d+)/g),
        date: Date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    date.setHours(0, 0, 0);
    return date;
  }

  public static dateToString(d: Date): string {
    let month: string = '' + (d.getUTCMonth() + 1),
      day: string = '' + d.getUTCDate(),
      year: number = d.getUTCFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
}
