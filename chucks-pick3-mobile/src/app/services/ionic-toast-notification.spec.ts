import { TestBed } from '@angular/core/testing';
import { IonicToastNotificationService } from './ionic-toast-notification.service';

describe('IonicToastNotificationService', () => {
  let service: IonicToastNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IonicToastNotificationService] });
    service = TestBed.inject(IonicToastNotificationService);
  });
  it('should check if toast is visible ', () => {
    service.presentToast('Internal Error', 'Please try again later.', 'internet-not-available');
    expect(service.isToastVisible).toBeTrue();
  });
});
