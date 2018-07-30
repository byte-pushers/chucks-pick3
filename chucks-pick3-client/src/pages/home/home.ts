import 'bytepushers-js-string-extensions/src/main/javascript';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any[] = [];

  constructor(public navCtrl: NavController) {
      this.items.push({type: 'morning', winningNumber: 355});
      this.items.push({type: 'day', winningNumber: 987});
      this.items.push({type: 'evening', winningNumber: 123});
      this.items.push({type: 'night', winningNumber: 728});

      this.items.forEach((item:any) => {
        item.type = item.type.toNormalCase();
      });
  }

  public itemSelected(item:any):void {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

}
