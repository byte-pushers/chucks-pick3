import {TestUtils} from '../../../test';
import {FutureSelectPage} from './future-select.page';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FutureSelectPageModule} from './future-select.page.module';
import {DrawingTime} from '../../providers/prediction/api/v1/DrawingTime.model';
import {By} from '@angular/platform-browser';
import {ActionSheetController, NavParams} from 'ionic-angular';
import {DebugElement} from '@angular/core';

describe('FutureSelectPage', () => {
  let instance: FutureSelectPage = null;
  let fixture: ComponentFixture<FutureSelectPage> = null;
  let data: any = {
    drawTime: 'MORNING',
    drawDate: '2018-06-02',
    drawResult: 23,
  };

  beforeEach(async(() => TestUtils.configureIonicTestingModule([], [FutureSelectPageModule], [{provide: NavParams, useValue: new NavParams(data)}]).compileComponents().then(() => {
    fixture = TestBed.createComponent(FutureSelectPage);
    instance = fixture.debugElement.componentInstance;
  })));

  it('should create a valid instance of FutureSelectPage', () => {
    expect(instance instanceof FutureSelectPage).toBe(true);
  });

  it('timeIcon() should associate a unique icon with each value of DrawingTime', () => {
    const iconNames: Set<String> = new Set([]);

    iconNames.add(instance.timeIcon(DrawingTime.MORNING));
    iconNames.add(instance.timeIcon(DrawingTime.DAY));
    iconNames.add(instance.timeIcon(DrawingTime.EVENING));
    iconNames.add(instance.timeIcon(DrawingTime.NIGHT));

    expect(iconNames.size).toBe(4);
  });

  it('should display the date, time, and winning number', () => {
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.draw-time')).nativeElement.textContent.trim())
      .toBe('Morning');
    expect(fixture.debugElement.query(By.css('.draw-date')).nativeElement.textContent.trim())
      .toBe('Winner for Jun 1, 2018');
    expect(fixture.debugElement.query(By.css('.draw-result')).nativeElement.textContent.trim())
      .toBe('023');
  });

  it('should show the date picker when the select day button is clicked', () => {
    fixture.detectChanges();
    spyOn(instance, 'showPicker').and.callFake(() => {});
    fixture.debugElement.query(By.css('#select-day')).triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(instance.showPicker).toHaveBeenCalled();
  });

  it('should show the time picker when the select time button is clicked', () => {
    fixture.detectChanges();
    spyOn(instance, 'showTimePicker').and.callFake(() => {});
    fixture.debugElement.query(By.css('#select-time')).triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(instance.showTimePicker).toHaveBeenCalled();
  });

  it('showTimePicker() should raise an action sheet with an option for each time of day', () => {
    fixture.detectChanges();

    let asCtrl: ActionSheetController = TestBed.get(ActionSheetController);
    instance.showTimePicker();

    expect(asCtrl.create).toHaveBeenCalledWith({
      title: 'Select time of drawing',
      buttons: [
        {
          icon: instance.timeIcon(DrawingTime.MORNING),
          text: 'Morning',
          handler: jasmine.any(Function),
        },
        {
          icon: instance.timeIcon(DrawingTime.DAY),
          text: 'Day',
          handler: jasmine.any(Function),
        },
        {
          icon: instance.timeIcon(DrawingTime.EVENING),
          text: 'Evening',
          handler: jasmine.any(Function),
        },
        {
          icon: instance.timeIcon(DrawingTime.NIGHT),
          text: 'Night',
          handler: jasmine.any(Function),
        },
      ],
    });
  });

  it('should have a heading of "Get New Picks"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('.heading'));
    expect(title.nativeElement.textContent).toBe('Get New Picks');
  });

  it('should be titled "Chuck\'s Pick 3"', () => {
    let title: DebugElement = fixture.debugElement.query(By.css('ion-title'));
    expect(title.nativeElement.textContent).toBe('Chuck\'s Pick 3');
  });

});
