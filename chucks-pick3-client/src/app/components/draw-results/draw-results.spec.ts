'use strict';

import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, SimpleChange} from '@angular/core';
import {DrawResultsComponent} from "./draw-results";
import {TestUtils} from "../../../test";
import {ProgressIndeterminateComponent} from "../progress-indeterminate/progress-indeterminate";
import {ScrapingService} from "../../providers/web-scraping/scraping.service.interface";

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
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(morningRow).toBeTruthy();
      expect(dayRow).toBeTruthy();
      expect(eveningRow).toBeTruthy();
      expect(nightRow).toBeTruthy();
    });
  });

  it('each row has a distinct icon', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const iconNames = new Set([]);

      iconNames.add(queryDescendentDom(morningRow).icon);
      iconNames.add(queryDescendentDom(dayRow).icon);
      iconNames.add(queryDescendentDom(eveningRow).icon);
      iconNames.add(queryDescendentDom(nightRow).icon);

      console.log("iconNames", iconNames);
      expect(iconNames.size).toEqual(4);
    });
  });

  it('rows should be labeled by their draw time', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(queryDescendentDom(morningRow).drawTime).toEqual('Morning');
      expect(queryDescendentDom(dayRow).drawTime).toEqual('Day');
      expect(queryDescendentDom(eveningRow).drawTime).toEqual('Evening');
      expect(queryDescendentDom(nightRow).drawTime).toEqual('Night');
    });
  });

  it('question marks should be displayed before scrape data is available', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(queryDescendentDom(morningRow).winNumber).toEqual('???');
      expect(queryDescendentDom(dayRow).winNumber).toEqual('???');
      expect(queryDescendentDom(eveningRow).winNumber).toEqual('???');
      expect(queryDescendentDom(nightRow).winNumber).toEqual('???');
    });
  });

  it('should show a toast when results for drawing have not yet been scraped', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      morningRow.triggerEventHandler('click', null);

      expect(instance.toast.create).toHaveBeenCalled();
    });
  });

  it('should update itself with the results of the scrape', fakeAsync(() => {
    instance.date = new Date();

    const scrapeSvc = TestBed.get(ScrapingService);
    scrapeSvc.scrapeResults.and.returnValue(Promise.resolve({
      drawResult: 123,
      drawDate: instance.date,
      drawTime: null,
    }));

    instance.ngOnChanges({
      date: new SimpleChange(null, instance.date, false)
    });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(queryDescendentDom(morningRow).winNumber).toEqual('123');
        expect(queryDescendentDom(dayRow).winNumber).toEqual('123');
        expect(queryDescendentDom(eveningRow).winNumber).toEqual('123');
        expect(queryDescendentDom(nightRow).winNumber).toEqual('123');
      }).catch(() => {
        fail();
    });
  }));

  function queryDescendentDom(row: DebugElement): any {
    let result = {
      winNumber: undefined,
      drawTime: undefined,
      icon: undefined,
      progressBar: undefined,
    };

    result.winNumber = row.query(By.css('.win-number')).nativeElement.textContent.trim();
    result.drawTime = row.query(By.css('.draw-time')).nativeElement.textContent.trim();
    result.icon = row.query(By.css('ion-col[text-end] > .icon')).attributes['ng-reflect-name'];
    result.progressBar = row.query(By.css('progress-indeterminate'));

    return result;
  }
});
