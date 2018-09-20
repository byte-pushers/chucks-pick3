// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule }                           from '@angular/forms';
import { getTestBed, TestBed }                                        from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {
  App,
  Config,
  DeepLinker,
  Form,
  IonicModule,
  Keyboard,
  DomController,
  MenuController,
  NavController,
  Platform,
  ViewController,
  ToastController, NavParams, ActionSheetController,
} from 'ionic-angular';
import {
  ActionSheetControllerMock,
  ConfigMock,
  PlatformMock,
  ToastControllerMock,
  ViewControllerMock,
} from 'ionic-mocks';
import {ScrapingService} from './app/providers/web-scraping/scraping.service.interface';
import {PipesModule} from './app/pipes/pipes.module';
import {TitleCasePipe} from '@angular/common';
import {PredictionProvider} from './app/providers/prediction/prediction.service';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>, imports?: Array<any>): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components, imports)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture: fixture,
          instance: fixture.debugElement.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>, imports?: Array<any>, providers?: Array<any>): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        App, Form, Keyboard, DomController, MenuController, TitleCasePipe,
        {provide: ActionSheetController, useFactory: () => ActionSheetControllerMock.instance()},
        {provide: Platform, useFactory: () => PlatformMock.instance()},
        {provide: Config, useFactory: () => ConfigMock.instance()},
        {provide: DeepLinker, useFactory: () => ConfigMock.instance()},
        {provide: ViewController, useFactory: () => ViewControllerMock.instance()},
        {provide: ToastController, useFactory: () => ToastControllerMock.instance()},
        {provide: ScrapingService, useValue: jasmine.createSpyObj('ScrapingService', ['scrapeResults'])},
        {provide: NavParams, useValue: jasmine.createSpyObj('NavParams', ['get'])},
        {provide: NavController, useValue: jasmine.createSpyObj('NavController', ['push'])},
        {provide: PredictionProvider, useValue: jasmine.createSpyObj('PredictionProvider', ['getPredictions'])},
        ...(providers ? providers : []),
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        PipesModule,
        ...(imports ? imports : []),
      ],
    });
  }

  // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
  public static eventFire(el: any, etype: string): void {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      let evObj: any = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }
}
