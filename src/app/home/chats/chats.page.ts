import { AfterContentInit, Component, OnInit } from "@angular/core";
import { HomeChatsService } from "src/app/Service/HomeChatService/home-chats.service";
import { LoadingService } from "src/app/Service/loading/loading.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit,AfterContentInit {
  constructor(
    private homeChattingService: HomeChatsService,
    private loading: LoadingService,
    private userData: UserDataService
  ) {}
  ngAfterContentInit(): void {
    this.activeUser=this.userData.getUserData();
    const userid = this.userData.getUserData().id;
    this.loading.showLoader();
    this.homeChattingService.getActiveUserChats(userid).subscribe((data) => {
      if (data) {
        this.fetchChats(data);
      } else {
        this.loading.hideLoader();
      }
    });
  }
  userchat = [];
  activeUser;
  ngOnInit() {
  
  }
  fetchChats(userChatData: any[]) {
    this.userchat = [];
    userChatData.forEach((userSpecificChatId) => {
      this.homeChattingService
        .fetchUserChats(
          userSpecificChatId.chattingUserId,
          userSpecificChatId.firebaseChatId
        )
        .subscribe((data) => {
          console.log(data.length);

          console.log(data);
          this.userchat.push({
            userData: data[1],
            chatData: data[0],
          });
          console.log(this.userchat);

          this.loading.hideLoader();
        });
    });
  }
}
