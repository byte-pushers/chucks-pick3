
import {TestBed} from '@angular/core/testing';
import {Pick3DrawTimeCardStateEnum} from './pick3-draw-time-card-state.enum';

describe('Pick3DrawTimeCardStateEnum', () => {
  const enumValue = Pick3DrawTimeCardStateEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [Pick3DrawTimeCardStateEnum]});
  });

  it('should return a enum value', function () {
    const propertyKey =  enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
    expect(propertyKey).toBe('card.draw.time.state.not.drawn.yet', 'did not return a string value');
  });

  it('should return a string value', function () {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
    expect(toStringValue).toBe('DRAWN', 'did not convert to string')
  });

});
