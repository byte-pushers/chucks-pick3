'use strict';

import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {DrawResultsComponent} from "./draw-results";
import {TestUtils} from "../../../test";
import {ProgressIndeterminateComponent} from "../progress-indeterminate/progress-indeterminate";

describe('DrawResultsComponent', () => {

  let morningRow: DebugElement;
  let dayRow: DebugElement;
  let eveningRow: DebugElement;
  let nightRow: DebugElement;

  let instance: DrawResultsComponent = null;
  let fixture: ComponentFixture<DrawResultsComponent> = null;

  beforeEach(async(() => TestUtils.beforeEachCompiler([DrawResultsComponent, ProgressIndeterminateComponent]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();

    morningRow = fixture.debugElement.query(By.css('.drawing-row:nth-child(1)'));
    dayRow = fixture.debugElement.query(By.css('.drawing-row:nth-child(3)'));
    eveningRow = fixture.debugElement.query(By.css('.drawing-row:nth-child(5)'));
    nightRow = fixture.debugElement.query(By.css('.drawing-row:nth-child(7)'));
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initializes', () => {
    expect(instance).toBeTruthy();
  });

  it('contains four rows',() => {
      expect(morningRow).toBeTruthy();
      expect(dayRow).toBeTruthy();
      expect(eveningRow).toBeTruthy();
      expect(nightRow).toBeTruthy();
    });

  it( 'each row has a distinct icon', () => {
    const iconNames = new Set([]);

    iconNames.add(queryDescendentDom(morningRow).icon);
    iconNames.add(queryDescendentDom(dayRow).icon);
    iconNames.add(queryDescendentDom(eveningRow).icon);
    iconNames.add(queryDescendentDom(nightRow).icon);

    expect(iconNames.size).toEqual(4);
  });

  function queryDescendentDom(row: DebugElement): any {
    var result = {
      winNumber: undefined,
      drawTime: undefined,
      icon: undefined,
      progressBar: undefined,
    };

    result.winNumber = row.query(By.css('win-number'));
    result.drawTime = row.query(By.css('draw-time'));
    result.icon = row.query(By.css('ion-col[text-end] > .icon'));
    result.progressBar = row.query(By.css('progress-indeterminate'));

    return result;
  }
});
