import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HistoryPage } from '../pages/history/history';
import { ContactPage } from '../pages/contact/contact';
import { TodayPage } from '../pages/today/today';
import { TabsPage } from '../pages/tabs/tabs';
import { PredictionPage } from "../pages/prediction/prediction";
import { DetailPage } from '../pages/future-select/future-select';

import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PredictionProvider } from "../providers/prediction/prediction";
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    ContactPage,
    TodayPage,
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
    MyApp,
    HistoryPage,
    ContactPage,
    TodayPage,
    TabsPage,
    PredictionPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PredictionProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
