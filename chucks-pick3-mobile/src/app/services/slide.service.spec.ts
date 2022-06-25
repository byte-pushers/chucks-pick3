import { TestBed } from '@angular/core/testing';

import { SlideService } from './slide.service';

describe('SlideServiceService', () => {
  let service: SlideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve a number", function() {
    service.passSlideNumber(7);
    expect(service.getSlideNumber).toBeDefined();

  });
});
