import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { HomeChatsService } from "src/app/Service/HomeChatService/home-chats.service";
import { LoadingService } from "src/app/Service/loading/loading.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit, AfterContentInit {
  constructor(
    private homeChattingService: HomeChatsService,
    private loading: LoadingService,
    private userData: UserDataService,
    private router: Router
  ) {}
  usersChatSubscription = new Subscription();

  ngAfterContentInit(): void {
    this.userchat = [];
    this.activeUser = this.userData.getUserData();
    const userid = this.userData.getUserData().id;
    this.loading.showLoader();

    this.usersChatSubscription.add(
      this.homeChattingService.getActiveUserChats(userid).subscribe((data) => {
        this.loading.hideLoader();
        if (data.length > 0) {
          this.fetchChats(data);
          this.loading.hideLoader();
        } else {
          this.loading.hideLoader();
        }
      })
    );
  }

  userchat = [];
  activeUser;
  chatsSubscription = new Subscription();
  ngOnInit() {
    setTimeout((p) => {
      this.loading.hideLoader();
    }, 5000);
  }
  fetchChats(userChatData: any[]) {
    this.userchat = [];

    userChatData.map((userSpecificChatId, index) => {
      if (index === 0) {
        this.userchat = [];
      }
      this.chatsSubscription.add(
        this.homeChattingService
          .fetchUserChats(
            userSpecificChatId.chattingUserId,
            userSpecificChatId.firebaseChatId
          )
          .subscribe((data) => {
            this.userchat.push({
              userData: data[1],
              chatData: data[0],
              userId: userSpecificChatId.chattingUserId,
            });
          })
      );
    });
  }
  goToChats(uuid) {
    this.usersChatSubscription.unsubscribe();
    this.chatsSubscription.unsubscribe();
    this.router.navigate(["/chating/" + uuid]);
  }
  goToContacts() {
    this.router.navigate(["/home/contacts"]);
  }
}
