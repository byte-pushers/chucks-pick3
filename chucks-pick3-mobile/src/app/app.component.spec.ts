import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {stringify} from 'querystring';
import {EnumValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator';

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app-component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('#resetButtons() should pass an enum', function() {
    const comp = AppComponent;
    comp.resetButtons('gotoHome');
    expect(comp.resetButtons).toBe(EnumValue, 'not an enum');
  });

});
