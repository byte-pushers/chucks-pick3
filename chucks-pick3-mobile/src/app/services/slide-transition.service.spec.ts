import { TestBed } from '@angular/core/testing';

import { SlideTransitionService } from './slide-transition.service';

describe('SlideTransitionService', () => {
  let service: SlideTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
