import { Component } from '@angular/core';
import {LanguagePopoverComponent} from './components/language-popover/language-popover.component';
import {Platform, PopoverController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    navigate: any;
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    private popoverCtrl: PopoverController,
        private translate: TranslateService) {
        this.initializeApp();
        this.sideMenu();
        this.translate.setDefaultLang('en-US');
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    sideMenu() {
        this.navigate = [
            {
                title : 'Account',
                url   : 'account',
                icon  : 'person'
            },
            {
                title : 'Settings',
                url   : 'settings',
                icon  : 'cog'
            }
        ];
    }
}
