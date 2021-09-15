import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {LanguagePopoverComponent} from '../../components/language-popover/language-popover.component';
import {IonSlides, PopoverController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {CardContextService} from '../../services/card-context.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {Pick3StateLottery} from '../../models/pick3-state-lottery';
import {AppService} from '../../app.service';
import {DrawDateService} from '../../services/draw-date.service';
import {Router} from "@angular/router";


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit, OnDestroy {
    prevActiveIndex = 7;
    cardContext = this.cardContextService.context$;
    @ViewChild('pick3DrawDateCards') ionSlides: IonSlides;
    default = {
        drawDateTime: Pick3DrawTimeEnum.Pick3DrawTimeEnum.MORNING
    };
    slideOpts = {
        initialSlide: 7,
        speed: 400
    };

    pick3StateLottery: Pick3StateLottery;

    constructor(private cardContextService: CardContextService,
                private popoverController: PopoverController,
                public translateService: TranslateService,
                private drawDateService: DrawDateService,
                private appService: AppService,
                private router: Router,
                private pick3WebScrappingService: Pick3WebScrapingProviderService) {
        this.pick3StateLottery = pick3WebScrappingService.findRegisteredStateLottery('TX');
        translateService.setDefaultLang('en-US');
        console.log(`HomePage constructor.`);
    }

    ngAfterViewInit() {
        const routerState = this.router.getCurrentNavigation().extras.state;
        if (routerState && this.router.url === '/home') {
            const currentSlideNumber = routerState?.currentSlideNumber;
            if (currentSlideNumber) {
                this.next(currentSlideNumber-1);
            }
        }
    }

    ngOnDestroy() {
        this.cardContext = null;
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

    public initializePick3DrawDateCard(event: any): void {
        let slideDirection = null;
        this.ionSlides.getActiveIndex().then(activeIndex => {
            if (activeIndex < this.prevActiveIndex) {
                this.prevActiveIndex = activeIndex;
                slideDirection = -1;
            } else if (activeIndex >= this.prevActiveIndex) {
                this.prevActiveIndex = activeIndex;
                slideDirection = 1;
            }
            // TODO Determine if we are swiping left(activeIndex -1) or right (activeIndex +1) on slides
            /* console.log(`HomePage.initializePick3DrawDateCard() - Active Index: IonSlides[${activeIndex}]`);*/
            // const nextPick3DrawDate = this.pick3DrawDateDecks[activeIndex];
            const pick3DrawDateDecks = this.appService.getPick3DrawDateDecks();
            /* console.log(`HomePage.initializePick3DrawDateCard() method activeIndex:${activeIndex}, (${activeIndex} + 1) = ${activeIndex + 1}`);*/
            this.cardContextService.addContext({
                slideNumber: activeIndex + 1,
                data: pick3DrawDateDecks[activeIndex],
                defaultDrawDateTime: this.default.drawDateTime,
                drawTimes: this.appService.getPick3DrawTimeCards(activeIndex + 1)
            });
        });
    }

    private next(index) {
        this.ionSlides.slideTo(index, this.slideOpts.speed);
    }
}
