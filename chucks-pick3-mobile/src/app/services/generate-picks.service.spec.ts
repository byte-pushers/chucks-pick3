import { TestBed } from '@angular/core/testing';

import { GeneratePicksService } from './generate-picks.service';

describe('GeneratePicksService', () => {
  let service: GeneratePicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratePicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
