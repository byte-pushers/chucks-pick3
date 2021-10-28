import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppVanillaComponent } from './app-vanilla.component';

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [AppVanillaComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app-vanilla', () => {
    const fixture = TestBed.createComponent(AppVanillaComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  // TODO: add more tests!

});
