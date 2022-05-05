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
  it('should invoke the sortPick3DrawState method', () => {
    spyOn(service, 'sortPick3DrawState');
    service.updatePick3DrawState(drawingTimeCardColorIndicators);
    expect(service.sortPick3DrawState).toHaveBeenCalled();
  });

  it('should invoke the applyPick3DrawState method', () => {
    spyOn(service, 'applyPick3DrawState');
    service.sortPick3DrawState(currentState);
    expect(service.applyPick3DrawState).toHaveBeenCalled();
  });

  //ensuring applyPick3DrawState is saving to the service's variable the picksIndicator
  it('should be saving the  values to the picksIndicator', () => {
    service.applyPick3DrawState('gray', 'not-drawn-yet');
    expect(service.picksIndicator).toBeDefined('picksIndicator is not defined');
  });
});
