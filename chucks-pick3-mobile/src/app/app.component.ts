import {Component} from '@angular/core';
import {LanguagePopoverComponent} from './components/language-popover/language-popover.component';
import {Platform, PopoverController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';
import {DrawStateService} from "./services/draw-state.service";

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
        private drawState: DrawStateService,
        private popoverController: PopoverController,
        private translateService: TranslateService) {
        this.initializeApp();
        this.sideMenu();
        this.translateService.setDefaultLang('en-US');
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

    public resetButtons(subSection: any) {
        this.drawState.generateNavigationChoice = subSection;
        this.drawState.viewNavigationChoice = subSection;
    }
    async showPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: LanguagePopoverComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true
        });
        popover.style.cssText = '--min-width: 4em; --max-width: 4em; --inner-border-width: 0px 0px 0px 0px !important;';
        return await popover.present();
    }
}
