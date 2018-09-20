import {TestUtils} from '../../../test';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HistoryPage} from './history.page';
import {HistoryPageModule} from './history.page.module';
import {ScrapingService} from '../../providers/web-scraping/scraping.service.interface';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('HistoryPage', () => {
  let instance: HistoryPage = null;
  let fixture: ComponentFixture<HistoryPage> = null;

  beforeEach(async(() => TestUtils.configureIonicTestingModule([], [HistoryPageModule]).compileComponents().then(() => {
    fixture = TestBed.createComponent(HistoryPage);
    instance = fixture.debugElement.componentInstance;
  })));

  it('should create a valid instance of HistoryPage', () => {
    expect(instance instanceof HistoryPage).toBe(true);
  });

  it('should direct the user to the FutureSelectPage', fakeAsync(() => {
    instance.date = new Date();
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
        drawDate: formatDate(instance.date),
        drawTime: 'MORNING',
        drawResult: 123,
      });
    });
  }));

  it('should show the date picker on enter', () => {
    spyOn(instance, 'showPicker').and.callFake(() => {});
    instance.ionViewWillEnter();

    expect(instance.showPicker).toHaveBeenCalled();
  });

  it('showPicker() should open the date picker and set maxDate', () => {
    instance.datePicker = jasmine.createSpyObj('DateName', ['open']);
    instance.datePicker.max = null;

    instance.showPicker();
    expect(instance.datePicker.open).toHaveBeenCalled();
    expect(instance.datePicker.max).toBeTruthy();
  });

  it('should have a heading of "Get New Picks"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('.heading'));
    expect(title.nativeElement.textContent).toBe('Get New Picks');
  });

  it('should be titled "Chuck\'s Pick 3"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('ion-title'));
    expect(title.nativeElement.textContent.trim()).toBe('Chuck\'s Pick 3');
  });

  function formatDate(d: Date): string {
    let month: string = '' + (d.getMonth() + 1),
      day: string = '' + d.getDate(),
      year: number = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
});
