import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastNotificationService {

  constructor(public toastController: ToastController) { }

  async presentToast(toastHeader: string, toastMessage: string, toastClass: string) {
    const toast = await this.toastController.create({
      header: toastHeader,
      message: toastMessage,
      duration: 2000,
      position: 'top',
      cssClass: toastClass,
      buttons: [
        {
          side: 'start',
          icon: 'alert-circle-outline',
          cssClass: 'results-icon'
        }
      ]
    });
    await toast.present();
  }
}
