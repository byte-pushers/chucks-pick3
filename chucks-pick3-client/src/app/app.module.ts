import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HistoryPage } from '../pages/history/history.page';
import { ContactPage } from '../pages/contact/contact.page';
import { TabsPage } from '../pages/tabs/tabs.page';
import { PredictionPage } from "../pages/prediction/prediction.page";
import { DetailPage } from '../pages/future-select/future-select.page';

import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PredictionProvider } from "../providers/prediction/prediction.service";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    ContactPage,
    TabsPage,
    PredictionPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PredictionProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
