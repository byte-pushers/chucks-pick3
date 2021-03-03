import { Component } from '@angular/core';
import { Pick3DrawDateCard } from '../models/pick3-draw-date-card';
import { Pick3DrawDateCardDomain } from '../models/pick3-draw-date-card.domain';
import {Pick3DrawTimeEnum} from '../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../components/language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  default = {
    drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
  };
  slideOpts = {
    initialSlide: 7,
    speed: 400
  };
  pick3DrawDateDecks: Array<Pick3DrawDateCard> = [
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
    new Pick3DrawDateCardDomain({}),
  ];

  constructor(private popoverCtrl: PopoverController) {}
  async showPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
