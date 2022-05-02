import { I18nService } from './i18n.service';
import { TestBed } from '@angular/core/testing';
import { TranslateCompiler, TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';

describe('I18nService', () => {
  let service: I18nService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [TranslateModule.forRoot()],
      providers: [I18nService],
    }).compileComponents();
    service = TestBed.inject(I18nService);
  });

  it('should set the language value', function () {
    service.setLanguage('es-MX');
    expect(service.setLang).toBe('es-MX', 'did not set the language value');
  });
});
