import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { HomeChatsService } from "src/app/Service/HomeChatService/home-chats.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  @Input() userData;
  @Input() id;
  constructor(
    private modal: ModalController,
    private homeChattingService: HomeChatsService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.userData);

    // this.userData = this.homeChattingService.getUserData();
  }
  dismissModal() {
    this.modal.dismiss();
  }
  goToChats() {
    this.dismissModal();
    this.router.navigate(["/chating/" + this.id]);
  }
  goToProfile() {
    this.dismissModal();
    this.router.navigate(["/profile-page"]);
  }
}
