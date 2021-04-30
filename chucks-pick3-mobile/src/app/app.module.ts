import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguagePopoverComponent } from './components/language-popover/language-popover.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Pick3WebScrapingProviderService } from './providers/web-scraping/pick3-web-scraping-provider.service';
import { CardContextService } from './services/card-context.service';
import { HomePageModule } from "./pages/home/home.page.module";


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        LanguagePopoverComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        HomePageModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        CardContextService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: Pick3WebScrapingProviderService, useClass: Pick3WebScrapingProviderService},
        /*{ provide: HttpBackend, useClass: NativeHttpFallback, deps: [Platform, NativeHttpBackend, HttpXhrBackend] }*/
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
