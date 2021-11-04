import {TestBed} from '@angular/core/testing';

import {NumberUtilityService} from './numberUtility.service';

describe('NumberUtilityService', () => {
  let service: NumberUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NumberUtilityService]});
    service = TestBed.inject(NumberUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
// padLeft method with test cases for a single digit and multiple digits:
  it('should pad 7 to the left to create 007', () => {
    expect(service.padLeft(7, 3)).toBe('007', 'Is not padding to left correctly');
  });
  it('should pad 753 to the left to create 00753', () => {
    expect(service.padLeft(73, 4)).toBe('0073', 'It is not padding to left correctly');
  });

  // padRight method with test cases for a single digit and multiple digits:
  it('should pad 1 to the right to create 100', () => {
    expect(service.padRight(1, 3)).toBe('100', 'Is not padding to right correctly');
  });
  it('should pad 11 to the right to create 1100', () => {
    expect(service.padRight(11, 4)).toBe('1100', 'Is not padding to right correctly');
  });

// isSingleDigit method with test cases for both true and false:
  it('should check if number is single digit', () => {
    expect(service.isSingleDigit(9)).toBeTrue();
  });
  it('should check if numbers is not single digit', () => {
    expect(service.isSingleDigit(977)).toBeFalse();
  });

  // isANumber method with test cases for both true and false:
  it('should prove it is a number', () => {
    expect(service.isANumber(2)).toBeTrue();
  });
  it('should prove it is not a number', () => {
    expect(service.isANumber('a')).toBeFalse();
  });

  // isNotANumber method with test cases for both true and false:
  it('should return true since it is not a number', () => {
    expect(service.isNotANumber('a')).toBeTrue();
  });

  it('should return false since it is a number', () => {
    expect(service.isNotANumber(6)).toBeFalse();
  });
});
