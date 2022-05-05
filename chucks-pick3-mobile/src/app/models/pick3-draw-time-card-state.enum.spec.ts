import { TestBed } from '@angular/core/testing';
import { Pick3DrawTimeCardStateEnum } from './pick3-draw-time-card-state.enum';

describe('Pick3DrawTimeCardStateEnum', () => {
  const enumValue = Pick3DrawTimeCardStateEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Pick3DrawTimeCardStateEnum] });
  });
  //property Key
  it('should return card.draw.time.state.drawn', () => {
    const propertyKey = enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.DRAWN);
    expect(propertyKey).toBe('card.draw.time.state.drawn', 'did not return a string value');
  });
  it('should return card.draw.time.state.not.drawn.yet', () => {
    const propertyKey = enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
    expect(propertyKey).toBe('card.draw.time.state.not.drawn.yet', 'did not return a string value');
  });
  it('should return card.draw.time.state.not.drawn.yet.with.generated.picks', () => {
    const propertyKey = enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS);
    expect(propertyKey).toBe('card.draw.time.state.not.drawn.yet.with.generated.picks', 'did not return a string value');
  });
  it('should return card.draw.time.state.draw.time.enum.night', () => {
    const propertyKey = enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
    expect(propertyKey).toBe('card.draw.time.state.draw.time.enum.night', 'did not return a string value');
  });
  it('should return card.draw.time.state.drawn.with.generated.picks.with.winners', () => {
    const propertyKey = enumValue.getPropertyKey(Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS);
    expect(propertyKey).toBe('card.draw.time.state.drawn.with.generated.picks.with.winners', 'did not return a string value');
  });

  xit('should return a string value', function () {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.DRAWN);
    console.log(`toStringValue = ${toStringValue}`);
    expect(toStringValue).toBe('DRAWN', 'did not convert to string');
  });
  it('should return NOT_DRAWN_YET', () => {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
    expect(toStringValue).toBe('NOT_DRAWN_YET', 'did not convert to string');
  });
  it('should return NOT_DRAWN_YET_WITH_GENERATED_PICKS', () => {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET_WITH_GENERATED_PICKS);
    expect(toStringValue).toBe('NOT_DRAWN_YET_WITH_GENERATED_PICKS', 'did not convert to string');
  });
  it('should return DRAWN', () => {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.DRAWN);
    expect(toStringValue).toBe('DRAWN', 'did not convert to string');
  });
  it('should return DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS', () => {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS);
    expect(toStringValue).toBe('DRAWN_WITH_GENERATED_PICKS_WITH_NO_WINNERS', 'did not convert to string');
  });
  it('should return DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS', () => {
    const toStringValue = enumValue.toString(Pick3DrawTimeCardStateEnum.DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS);
    expect(toStringValue).toBe('DRAWN_WITH_GENERATED_PICKS_WITH_WINNERS', 'did not convert to string');
  });
  it('should return DRAWN', () => {
    const toStringValue = enumValue.toString('drawn');
    expect(toStringValue).toBe('DRAWN', 'did not convert to string');
  });
});
