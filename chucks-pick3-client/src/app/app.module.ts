import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PredictionProvider } from "./providers/prediction/prediction.service";
import { ScrapingProvider } from "./providers/web-scraping/scraping.service";
import { PipesModule } from "./pipes/pipes.module";
import { ScrapingService } from "./providers/web-scraping/scraping.service.interface";

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    PredictionProvider,
    {provide: ScrapingService, useClass: ScrapingProvider},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}
