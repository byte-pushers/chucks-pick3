import {IonicToastNotificationService} from "../services/ionic-toast-notification.service";
import {TestBed} from "@angular/core/testing";
import {NavigationEnum} from "./navigate.enum";
import {Pick3DrawTimeCardStateEnum} from "./pick3-draw-time-card-state.enum";

describe('Pick3DrawTimeCardStateEnum', () => {
  let service = Pick3DrawTimeCardStateEnum;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [Pick3DrawTimeCardStateEnum]});
  });

  it('should return a enum value', function () {
    const propertyKey =  service.getPropertyKey(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.NOT_DRAWN_YET);
    expect(propertyKey).toBe('card.draw.time.state.not.drawn.yet', 'did not return a string value');
  });

  it('should return a string value', function () {
    const toStringValue = service.toString(Pick3DrawTimeCardStateEnum.Pick3DrawTimeCardStateEnum.DRAWN);
    expect(toStringValue).toBe('DRAWN', 'did not convert to string')
  });

});
