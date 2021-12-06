import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, PopoverController} from '@ionic/angular';

import {ViewPage} from './view.page';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AppService} from '../../app.service';
import {Pick3WebScrapingProviderService} from '../../providers/web-scraping/pick3-web-scraping-provider.service';
import {CardContextService} from '../../services/card-context.service';
import {Router} from '@angular/router';
import {Pick3DrawTimeEnum} from '../../models/pick3-draw-time.enum';

describe('ViewPage', () => {
  let component: ViewPage;
  let fixture: ComponentFixture<ViewPage>;
  let router: Router;
  let popover: PopoverController;
  let popoverSpy = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPage],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [AppService, Pick3WebScrapingProviderService, CardContextService, PopoverController]
    }).compileComponents();
    router = TestBed.get(Router);
    popover = TestBed.get(PopoverController);
    spyOn(router, 'getCurrentNavigation').and.returnValue({
      extras: {
        state: {
          currentSlideNumber: 7,
          currentDay: Pick3DrawTimeEnum.DAY
        }
      }
    } as any);

    fixture = TestBed.createComponent(ViewPage);
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
