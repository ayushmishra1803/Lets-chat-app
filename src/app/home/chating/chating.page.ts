import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChattingService } from "src/app/Service/chattingService/chatting.service";
import { UsersDatafromFirebaseService } from "src/app/Service/fetchingUsersDataFromFirebase/users-datafrom-firebase.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-chating",
  templateUrl: "./chating.page.html",
  styleUrls: ["./chating.page.scss"],
})
export class ChatingPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gettinguserDataService: UsersDatafromFirebaseService,
    private chatting: ChattingService,private userData:UserDataService
  ) {}
  activatedUser;
  chatingUser;
  message = "";
  ngOnInit() {
    this.activatedRoute.params.subscribe((uuid) => {
      console.log(uuid.uuid);
      this.gettinguserDataService
        .getUserByuuid(uuid.uuid)
        .subscribe((result) => {
          console.log();
          let data = {};
          data = result.data();
          this.chatingUser = {
            id: result.id,
            ...data,
          };
          console.log(this.chatingUser);
        });
    });
  }
  sendMessage() {
    if (this.message != "") {
      const data ={
        sender:this.userData.getUserData().id,
        message:this.message,
        Data:new Date()
      }
      this.chatting.addtochats(this.chatingUser,this.userData.getUserData(),data);
    }
  }
}
