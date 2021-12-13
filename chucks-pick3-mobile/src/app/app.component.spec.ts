import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule, Platform, PopoverController} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {Pick3DrawTimeEnum} from './models/pick3-draw-time.enum';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DrawDateService} from "./services/draw-date.service";
import {NgZone} from "@angular/core";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let popover: PopoverController;
  const popoverSpy = jasmine.createSpyObj('Popover', ['create', 'present', 'onDidDismiss', 'dismiss']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [CommonModule, IonicModule.forRoot(),
        TranslateModule.forRoot(),
        RouterTestingModule, TranslateModule, HttpClientTestingModule],
      providers: [PopoverController, TranslateService, SplashScreen, Platform, DrawDateService]
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

    fixture = TestBed.createComponent(AppComponent);
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
