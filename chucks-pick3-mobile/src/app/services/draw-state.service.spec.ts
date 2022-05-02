import { TestBed } from '@angular/core/testing';
import { DrawStateService } from './draw-state.service';

describe('DrawStateService', () => {
  let service: DrawStateService;
  const drawingTimeCardColorIndicators = {
    'not-drawn-yet': true,
    'not-drawn-yet-with-generated-picks': false,
    drawn: false,
    'drawn-with-generated-picks-with-no-winners': false,
    'drawn-with-generated-picks-with-winners': false,
    selected: false,
  };
  const currentState = Object.entries(drawingTimeCardColorIndicators);

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DrawStateService] });
    service = TestBed.inject(DrawStateService);
  });
  // Ensuring array for spec works correctly
  it('should contain a defined array', () => {
    expect(drawingTimeCardColorIndicators).toBeDefined('Array is not defined.');
  });

  // testing for methods and ensuring they're working together
  it('should invoke the sortState method', () => {
    spyOn(service, 'sortState');
    service.passState(drawingTimeCardColorIndicators);
    expect(service.sortState).toHaveBeenCalled();
  });

  it('should invoke the applyState method', () => {
    spyOn(service, 'applyState');
    service.sortState(currentState);
    expect(service.applyState).toHaveBeenCalled();
  });

  //ensuring applyState is saving to the service's variable the picksIndicator
  it('should be saving the  values to the picksIndicator', () => {
    service.applyState('gray', 'not-drawn-yet', true);
    expect(service.picksIndicator).toBeDefined('picksIndicator is not defined');
  });
});
