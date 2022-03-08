import { TestBed } from '@angular/core/testing';

import { SelectPicksService } from './select-picks.service';

describe('SelectPicksService', () => {
  let service: SelectPicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectPicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
