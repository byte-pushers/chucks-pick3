import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppVanillaComponent } from './app-vanilla.component';
import { AppRoutingVanillaModule } from './app-routing-vanilla.module';

@NgModule({
  declarations: [AppVanillaComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingVanillaModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppVanillaComponent],
})
export class AppVanillaModule {}
