import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ViewerModalComponent } from "ngx-ionic-image-viewer";
import { HomeChatsService } from "src/app/Service/HomeChatService/home-chats.service";
import { ViewPhotoServiceService } from "src/app/Service/viewPhotoService/view-photo-service.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.page.html",
  styleUrls: ["./profile-page.page.scss"],
})
export class ProfilePagePage implements OnInit {
  UserData;
  constructor(
    private homeChattingService: HomeChatsService,
    private photoViewImage: ViewPhotoServiceService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.UserData = this.homeChattingService.getUserData();
  }
  async viewImage(src) {
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
