import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubNavBarService {
  private subNavBarVisible = false;

  constructor() {
  }

  public setSubNavBarVisibility(subNavBarVisible: boolean): void {
    this.subNavBarVisible = subNavBarVisible;
  }
  public getSubNavBarVisibility(): boolean {
    return this.subNavBarVisible;
  }

}
