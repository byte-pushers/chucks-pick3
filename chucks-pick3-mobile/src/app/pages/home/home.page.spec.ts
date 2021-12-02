import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {CardContextService} from '../../services/card-context.service';
import {Router} from '@angular/router';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let translateService: TranslateService;
  let appService: AppService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, CardContextService]
    }).compileComponents();
    router = TestBed.get(Router);
    appService = TestBed.get(AppService);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY
        }
      }
    } as any);

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default prevActiveIndex set to 7', () => {
    expect(component.prevActiveIndex).toEqual(7, 'default is not 7');
  });

  it('should pass the id number to the appService', () => {
    const idSpy = spyOn(appService,'dispatchCurrentDrawCardIdEvent');
    component.passIdToGenerate(7);
    expect(idSpy).toHaveBeenCalled();
  });

  /*it('should check if getActiveIndex was called', () => {
    const ionSlidesSpy = spyOn(component.ionSlides, 'getActiveIndex').and.callThrough();
    component.storeId();
    expect(ionSlidesSpy).toHaveBeenCalled();
  });*/

  /*xit('should check if slidesLoaded is false', () => {
    component.initializePick3DrawDateCard(onclick);
    expect(component.slidesLoaded).toBeFalse();
  });*/

  /*it('should check if initializePick3DrawDateCard was called', () => {
    $('#pick3DrawDateCards').trigger('click');
    spyOn(component, 'initializePick3DrawDateCard').and.callThrough();
    expect(component.initializePick3DrawDateCard).toHaveBeenCalled();
  });*/
});
