import { TestBed } from '@angular/core/testing';

import { CheckFirstNameService } from './check-first-name.service';

describe('CheckFirstNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckFirstNameService = TestBed.get(CheckFirstNameService);
    expect(service).toBeTruthy();
  });
});
