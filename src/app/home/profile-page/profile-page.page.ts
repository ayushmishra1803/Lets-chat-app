import { Component, OnInit } from "@angular/core";
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
    private photoViewImage: ViewPhotoServiceService
  ) {}

  ngOnInit() {
    this.UserData = this.homeChattingService.getUserData();
  }
  viewImage(src) {
    this.photoViewImage.viewPhoto(src)
  }
}
