import { AfterContentInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ChattingService } from "src/app/Service/chattingService/chatting.service";
import { UsersDatafromFirebaseService } from "src/app/Service/fetchingUsersDataFromFirebase/users-datafrom-firebase.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-chating",
  templateUrl: "./chating.page.html",
  styleUrls: ["./chating.page.scss"],
})
export class ChatingPage implements OnInit, AfterContentInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gettinguserDataService: UsersDatafromFirebaseService,
    private chatting: ChattingService,
    private userData: UserDataService
  ) {}
  ngAfterContentInit(): void {
    if (this.chattingCollection != "") {
      this.chatting.fetchChats(this.chattingCollection).subscribe((chats) => {
        this.chats = chats;
        console.log(this.chats);
      });
    }
  }
  activateUser;
  chatingUser;
  message = "";
  chattingCollection = "";
  chats = [];
  ngOnInit() {
    this.activateUser = this.userData.getUserData();
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
          /*
          this is used to check weather these two users chatted before
          */
          this.chatting
            .searchIfChatExist(
              this.chatingUser.id,
              this.userData.getUserData().id
            )
            .subscribe((ChatIdFound) => {
              ChatIdFound.forEach((chatResult) => {
                this.chattingCollection = chatResult.data().firebaseChatId;
                this.chatting
                  .fetchChats(this.chattingCollection)
                  .subscribe((chats) => {
                    this.chats = chats ? chats : [];
                    console.log(this.chats);
                  });
              });
            });
        });
    });
  }
  sendMessage() {
    console.log(this.chats);

    if (this.message != "") {
      if (this.chats.length == 0) {
        const data = {
          sender: this.userData.getUserData().id,
          message: this.message,
          Date: new Date(),
        };
        this.chatting.FirstTymChat(
          this.chatingUser,
          this.userData.getUserData(),
          data
        );
        this.message= ''
      } else {
        const data = {
          sender: this.userData.getUserData().id,
          message: this.message,
          Date: new Date(),
        };
        this.chatting.addMessgaesIfChatExist(this.chattingCollection, data);
        this.message= ''
      }
    }
  }
}
