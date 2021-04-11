import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ViewerModalComponent } from "ngx-ionic-image-viewer";

@Injectable({
  providedIn: "root",
})
export class ViewPhotoServiceService {
  constructor(private modalController: ModalController) {}
  async viewPhoto(src) {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: src,
      },
      cssClass: "ion-img-viewer",
      keyboardClose: true,
      showBackdrop: true,
    });

    modal.present();
  }
}
