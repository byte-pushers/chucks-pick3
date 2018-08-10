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
      this.items.push({type: 'Morning', winningNumber: 355});
      this.items.push({type: 'Day', winningNumber: 987});
      this.items.push({type: 'Evening', winningNumber: 123});
      this.items.push({type: 'Night', winningNumber: 728});

  }

  public itemSelected(item:any):void {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

}
