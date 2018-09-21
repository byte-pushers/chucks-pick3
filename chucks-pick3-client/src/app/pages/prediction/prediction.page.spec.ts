import {TestUtils} from '../../../test';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PredictionPage} from './prediction.page';
import {PredictionPageModule} from './prediction.page.module';
import {NavParams} from 'ionic-angular';
import {PredictionProvider} from '../../providers/prediction/prediction.service';
import {of} from 'rxjs/observable/of';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {DrawingTime} from '../../providers/prediction/api/v1/DrawingTime.model';
import {DateUtil} from '../../model/DateUtil';

describe('PredictionPage', () => {
  let instance: PredictionPage = null;
  let fixture: ComponentFixture<PredictionPage> = null;
  let data: any = {
    winDrawTime: 'MORNING',
    futureDrawTime: 'EVENING',
    winDrawDate: '2018-06-02',
    futureDrawDate: DateUtil.dateToString(new Date('2018-11-12')),
    winNumber: 123,
  };
  let navParams: NavParams = new NavParams(data);

  beforeEach(async(() => TestUtils.configureIonicTestingModule([], [PredictionPageModule], [{provide: NavParams, useValue: navParams}]).compileComponents().then(() => {
    fixture = TestBed.createComponent(PredictionPage);
    instance = fixture.debugElement.componentInstance;
  })));

  it('should create a valid instance of PredictionPage', () => {
    expect(instance instanceof PredictionPage).toBe(true);
  });

  it('should display drawing time and result based on passed in nav params', () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.query(By.css('span.draw-time')).nativeElement.textContent.trim()).toBe('Morning');
      expect(fixture.debugElement.query(By.css('span.draw-result')).nativeElement.textContent.trim()).toBe('June 2, 2018');
    });
  });

  it('should display a progress spinner before the prediction provider RPC completes', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('ion-spinner'))).toBeTruthy();
  });

  it('should not display a progress spinner afetr the prediction provider RPC completes', fakeAsync(() => {
    const predictionPrvdr: any = TestBed.get(PredictionProvider);
    predictionPrvdr.getPredictions.and.returnValue(of({
      date: data.futureDrawDate,
      drawingTime: data.futureDrawTime,
      plays: [ 123, 234, 345, 456, 567 ],
    }));

    fixture.detectChanges();
    instance.ionViewDidLoad();
    tick();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('ion-spinner'))).toBeFalsy();
  }));

  it('should load predictions based on passed in nav params', fakeAsync(() => {
    const predictionPrvdr: any = TestBed.get(PredictionProvider);
    predictionPrvdr.getPredictions.and.returnValue(of({
      date: data.futureDrawDate,
      drawingTime: data.futureDrawTime,
      plays: [ 123, 234, 345, 456, 567 ],
    }));

    fixture.detectChanges();
    instance.ionViewDidLoad();
    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('.play'))
        .map(debugEl => debugEl.nativeElement.children[0].textContent))
        .toEqual([ '123', '234', '345', '456', '567']);
    });
  }));

  it('should have a heading of "Your Picks"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('.heading'));
    expect(title.nativeElement.textContent).toBe('Your Picks');
  });

  it('should be titled "Chuck\'s Pick 3"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('ion-title'));
    expect(title.nativeElement.textContent).toBe('Chuck\'s Pick 3');
  });

  it('should display four distinct icons for each time of day', () => {
    const iconNames: Set<String> = new Set([]);

    iconNames.add(instance.timeIcon(DrawingTime.MORNING));
    iconNames.add(instance.timeIcon(DrawingTime.DAY));
    iconNames.add(instance.timeIcon(DrawingTime.EVENING));
    iconNames.add(instance.timeIcon(DrawingTime.NIGHT));

    expect(iconNames.size).toBe(4);
  });

});
