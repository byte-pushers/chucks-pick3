import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { Pick3DrawDateCardComponent } from '../components/pick3-draw-date-card/pick3-draw-date-card.component';
import { Pick3DrawTimeCardComponent } from '../components/pick3-draw-time-card/pick3-draw-time-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, Pick3DrawDateCardComponent, Pick3DrawTimeCardComponent]
})
export class HomePageModule {}
