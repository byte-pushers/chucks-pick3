import {TestBed} from '@angular/core/testing';
import {IonicToastNotificationService} from '../../src/app/services/ionic-toast-notification.service';


xdescribe('IonicToastNotificationService', () => {
  let service: IonicToastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [IonicToastNotificationService]});
    service = TestBed.inject(IonicToastNotificationService);
  });
  it('should check if toast is visible ',  () => {
    service.presentToast('Internal Error',
      'Please try again later.', 'internet-not-available');
expect(service.isToastVisible).toBeTrue();
  });

});

