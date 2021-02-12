import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastControllerService {
  constructor(private toast: ToastController) {}
  async bringToastController(message, duration, color?) {
    const toast = this.toast.create({
      message: message,
      duration: duration,
      color: color ? color : "primary",
    });
    (await toast).present();
  }
}
