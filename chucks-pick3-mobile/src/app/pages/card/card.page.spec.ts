import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, PopoverController} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {CardContextService} from '../../services/card-context.service';
import {Router} from '@angular/router';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';
import {CardPage} from './card.page';

describe('CardPage', () => {
  let component: CardPage;
  let fixture: ComponentFixture<CardPage>;
  let router: Router;
  let popover: PopoverController;
  let appService: AppService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardPage],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, CardContextService]
    }).compileComponents();
    appService = TestBed.get(AppService);
    router = TestBed.get(Router);
    popover = TestBed.get(PopoverController);
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: Pick3DrawTimeEnum.DAY
        }
      }
    } as any);
    const mockUrlTree = router.parseUrl('/home');
// @ts-ignore: force this private property value for testing.
    router.currentUrlTree = mockUrlTree;
    appService.pick3CardId = 7;
    fixture = TestBed.createComponent(CardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should go into popover.present', () => {
    let popoverSpy = spyOn(popover, 'create').and.callThrough();
    component.showPopover(onclick);
    expect(popoverSpy).toHaveBeenCalled();
  });

 });
