import {TestBed} from '@angular/core/testing';
import {PageReader} from './page.reader';


describe('PageReader', () => {
  let service: PageReader;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [PageReader]});
    service = TestBed.inject(PageReader);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return html',  () => {
    expect(service.read).toBeDefined();
  });
});

