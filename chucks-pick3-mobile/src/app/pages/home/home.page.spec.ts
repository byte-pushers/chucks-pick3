import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {HomePage} from './home.page';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {CardContextService} from "../../services/card-context.service";
import {Router} from "@angular/router";
import {Pick3DrawTimeEnum} from "../../models/pick3-draw-time.enum";

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let router: Router;
  let translateService: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, CardContextService]
    }).compileComponents();
    router = TestBed.get(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { currentSlideNumber: 7, currentDay: Pick3DrawTimeEnum.Pick3DrawTimeEnum.DAY } } } as any);

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should initiate initializePick3DrawDateCards', function () {
    let spyOnLang = spyOn(translateService,'setDefaultLang');
    expect(spyOnLang).toHaveBeenCalled();
  });
});
