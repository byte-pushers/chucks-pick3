import {Component, OnInit} from '@angular/core';
import {LanguagePopoverComponent} from './components/language-popover/language-popover.component';
import {Platform, PopoverController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {registerLocaleData} from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';
import localeEnUS from '@angular/common/locales/en-US-POSIX';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    navigate: any;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public translateService: TranslateService,
        private popoverCtrl: PopoverController) {
        translateService.setDefaultLang('en-US');
        this.initializeApp();
        this.sideMenu();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }


    ngOnInit() {
        registerLocaleData(localeEsMx, 'es-MX');
        registerLocaleData(localeEnUS, 'en-US');
    }
    async showPopover(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: LanguagePopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
        return await popover.present();
    }
    sideMenu() {
        this.navigate = [
            {
                title: 'Account',
                url: 'account',
                icon: 'person'
            },
            {
                title: 'Settings',
                url: 'settings',
                icon: 'cog'
            }
        ];
    }
}
