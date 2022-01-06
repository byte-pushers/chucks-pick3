import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})




export class IonicToastNotificationService {
  public isToastVisible: boolean;
  constructor(public toastController: ToastController) { }

  async presentToast(toastHeader: string, toastMessage: string, toastClass: string) {
    if (this.isToastVisible) {
      return;
    }

    this.isToastVisible = true;

    this.toastController.create({
      header: toastHeader,
      message: toastMessage,
      duration: 2000,
      cssClass: toastClass,
      buttons: [
        {
          side: 'start',
          icon: 'alert-circle-outline',
          cssClass: 'results-icon'
        }
      ],
      position: 'top'
    }).then((toast: HTMLIonToastElement) => {
      /* istanbul ignore next */
      toast.onDidDismiss().then(() => {
        this.isToastVisible = false;
      });
      /* istanbul ignore next */
      toast.present();
    });
  }
}
