import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {LanguagePopoverComponent} from './language-popover.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

describe('LanguagePopoverComponent', () => {
  let component: LanguagePopoverComponent;
  let fixture: ComponentFixture<LanguagePopoverComponent>;
  let translate: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguagePopoverComponent],
      imports: [IonicModule.forRoot(),
        TranslateModule.forRoot()]
    }).compileComponents();
    translate = TestBed.get(TranslateService);
    fixture = TestBed.createComponent(LanguagePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

  it('should trigger the use method on the translate service', () => {
    spyOn(translate, 'use');
    component.switchLanguage('en-US');
    expect(translate.use).toHaveBeenCalled();
  });

});
