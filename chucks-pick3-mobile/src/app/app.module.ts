import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguagePopoverComponent } from './components/language-popover/language-popover.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Pick3WebScrapingProviderService } from './providers/web-scraping/pick3-web-scraping-provider.service';
import { CardContextService } from './services/card-context.service';
import { HomePageModule } from './pages/home/home.page.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { GeneratePageModule } from './pages/generate/generate.page.module';
import { Pick3DrawDateInfoSection } from './components/pick3-draw-date-info-section/pick3-draw-date-info-section';
import { CardPageModule } from './pages/card/card.page.module';
import { ViewPageModule } from './pages/view/view.module';
import { NumberUtilityService } from './services/numberUtility.service';
import { SwiperModule } from 'swiper/angular';
import { StateService } from './services/state.service';
import { PreviousPicksPageModule } from './pages/previous-picks/previous-picks.module';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { CardPage } from './pages/card/card.page';
import { TomorrowPick3DrawDateCardService } from './services/tomorrowPick3DrawDateCard.service';
import { Pick3GenerateDateSectionComponent } from './components/pick3-generate-date-section/pick3-generate-date-section.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LanguagePopoverComponent, CountdownTimerComponent, Pick3DrawDateInfoSection, Pick3GenerateDateSectionComponent],
  entryComponents: [],
  exports: [CountdownTimerComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    GeneratePageModule,
    PreviousPicksPageModule,
    HttpClientModule,
    SwiperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CardPageModule,
    ViewPageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CardContextService,
    NumberUtilityService,
    StateService,
    TomorrowPick3DrawDateCardService,
    AppService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: Pick3WebScrapingProviderService,
      useClass: Pick3WebScrapingProviderService,
    },
    /*{ provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend] }*/
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
}
