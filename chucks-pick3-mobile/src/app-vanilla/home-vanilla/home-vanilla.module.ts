import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomeVanillaPage } from './home-vanilla.page';

import { HomePageRoutingModule } from './home-vanilla-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomeVanillaPage]
})
export class HomePageModule {}
