import {TestUtils} from '../../../test';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {TodayPage} from './today.page';
import {TodayPageModule} from './today.page.module';
import {By} from '@angular/platform-browser';
import {ScrapingService} from '../../providers/web-scraping/scraping.service.interface';
import {DebugElement} from '@angular/core';
import {DateUtil} from '../../model/DateUtil';

describe('TodayPage', () => {
  let instance: TodayPage = null;
  let fixture: ComponentFixture<TodayPage> = null;

  beforeEach(async(() => TestUtils.configureIonicTestingModule([], [TodayPageModule]).compileComponents().then(() => {
    fixture = TestBed.createComponent(TodayPage);
    instance = fixture.debugElement.componentInstance;
  })));

  it('should create a valid instance of TodayPage', () => {
    expect(instance instanceof TodayPage).toBe(true);
  });

  it('should direct the user to the FutureSelectPage', fakeAsync(() => {
    const scrapeSvc: any = TestBed.get(ScrapingService);
    scrapeSvc.scrapeResults.and.returnValue(Promise.resolve({
      drawResult: 123,
      drawDate: instance.date,
      drawTime: null,
    }));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let morningRow: DebugElement = fixture.debugElement.query(By.css('.drawing-row:nth-child(1)'));

      morningRow.triggerEventHandler('click', null);

      expect(instance.navCtrl.push).toHaveBeenCalledWith('FutureSelectPage', {
        drawDate: DateUtil.dateToString(instance.date),
        drawTime: 'MORNING',
        drawResult: 123,
      });
    });
  }));

  it('should have a heading of "Today\'s Drawings"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('.heading'));
    expect(title.nativeElement.textContent).toBe('Today\'s Drawings');
  });

  it('should be titled "Chuck\'s Pick 3"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('ion-title'));
    expect(title.nativeElement.textContent).toBe('Chuck\'s Pick 3');
  });
});
