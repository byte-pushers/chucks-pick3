import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any[] = [];

  constructor(public navCtrl: NavController, public modalControl: ModalController) {
    var date = new Date();
    this.items.push({date: date, drawTime: 'Morning', winningNumber: 355});
    this.items.push({date: date, drawTime: 'Day', winningNumber: 987});
    this.items.push({date: date, drawTime: 'Evening', winningNumber: 123});
    this.items.push({date: date, drawTime: 'Night', winningNumber: 728});

  }

  public itemSelected(item:any):void {
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }

}
