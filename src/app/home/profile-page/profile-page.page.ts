import { Component, OnInit } from "@angular/core";
import { HomeChatsService } from "src/app/Service/HomeChatService/home-chats.service";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.page.html",
  styleUrls: ["./profile-page.page.scss"],
})
export class ProfilePagePage implements OnInit {
  UserData;
  constructor(private homeChattingService: HomeChatsService) {}

  ngOnInit() {
    this.UserData = this.homeChattingService.getUserData();
    console.log(this.UserData);
  }
}
