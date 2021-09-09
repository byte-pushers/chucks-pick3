import { Component, OnInit } from '@angular/core';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {PopoverController} from '@ionic/angular';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Pick3DrawTimeCard} from "../../models/pick3-draw-time-card";

@Component({
  selector: 'app-generate',
  templateUrl: './generate.page.html',
  styleUrls: ['./generate.page.scss'],
})
export class GeneratePage implements OnInit {
  private id: Observable<string>;
  private url: Observable<string>;
  private pick3DrawnNumber: any;

  constructor(private popoverController: PopoverController, private route: ActivatedRoute) {
    console.info("GeneratePage.constructor() method.");
    this.id = route.params.pipe(map(p => p.id));
    this.url = route.url.pipe(map(segments => segments.join('')));
      // route.data includes both `data` and `resolve`
      this.pick3DrawnNumber = route.data.pipe(map(d => d.user));
    }

  ngOnInit(): void {
    console.info("GeneratePage.ngOnInit() method: Inside ngOnInit() method.");
  }

  async showPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
    return await popover.present();
  }
}
