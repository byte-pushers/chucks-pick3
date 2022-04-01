import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  private id: Observable<string>;
  private url: Observable<string>;
  private pick3DrawnNumber: any;
  public pick3Header: string;

  constructor(private popoverController: PopoverController, private route: ActivatedRoute) {
    console.info('ViewPage.constructor() method.');
    /* istanbul ignore next */
    this.id = route.params.pipe(map(p => p.id));
    /* istanbul ignore next */
    this.url = route.url.pipe(map(segments => segments.join('')));
    // route.data includes both `data` and `resolve`
    /* istanbul ignore next */
    this.pick3DrawnNumber = route.data.pipe(map(d => d.user));
  }

  ngOnInit(): void {
    console.info('ViewPage.ngOnInit() method: Inside ngOnInit() method.');

  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    /* istanbul ignore next */
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    /* istanbul ignore next */
    return await popover.present();
  }

}