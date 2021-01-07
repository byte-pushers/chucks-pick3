import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators'

export class DelayedRetryOperator {
  constructor() {
  }

  private static DEFAULT_MAX_RETRIES = 5;

  private static getErrorMessage(maxRetry: number): string {
    return `Tried to load Resource over XHR for ${maxRetry} times without success.  Giving up.`
  }

  public static operate(delayInMilliSeconds: number, maxRetry= DelayedRetryOperator.DEFAULT_MAX_RETRIES): (src: Observable<any>) => Observable<any>{
    let retries = maxRetry;

    return (src: Observable<any>) => src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayInMilliSeconds),
        mergeMap(error => retries-- > 0 ? of(error) : throwError(DelayedRetryOperator.getErrorMessage(maxRetry)))
      ))
    );
  }
}
