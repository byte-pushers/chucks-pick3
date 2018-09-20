import { Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the LeftPadPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'leftpad',
  pure: false,
})
export class LeftPadPipe implements PipeTransform {
  /**
   * Takes a value and pads it to the required length on the left
   */
  public transform(value: string, ...args: string[]): string {
    let length: number = parseInt(args[0]);
    let char: string = args[1].charAt(0);

    return value.length > length ? value : char.repeat(length - value.length) + value;
  }
}
