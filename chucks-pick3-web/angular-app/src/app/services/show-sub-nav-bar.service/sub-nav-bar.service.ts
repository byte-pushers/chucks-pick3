import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubNavBarService {
  public showSubNavBarStatus = false;

  constructor() {
  }

  public showSubNavBar(showSubNavBarStatus: boolean): void {
    this.showSubNavBarStatus = showSubNavBarStatus;
  }

  public getShowSubNavBarStatus(): boolean {
    return this.subnavbarservice.getShowSubNavBarStatus();

  }
}
