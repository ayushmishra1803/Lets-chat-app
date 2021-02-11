import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  constructor(private modal: ModalController) {}

  async showLoader() {
    const { LoadingComponent } = await import(
      "../../components/loading/loading.component"
    );
    const modal = this.modal.create({
      component: LoadingComponent,
      backdropDismiss: false,
      cssClass: "loader",
      animated: false,
    });
    (await modal).present();
  }
  hideLoader() {
    this.modal.dismiss();
  }
}
