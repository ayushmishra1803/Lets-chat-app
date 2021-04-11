import { AfterContentInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { UserProfileComponent } from "src/app/components/user-profile/user-profile.component";
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
    private router: Router,
    private modal: ModalController
  ) {}
  usersChatSubscription = new Subscription();
  fetchingFirstTym = false;
  ngAfterContentInit(): void {
    this.userchat = [];
    this.searchUserChat = this.userchat;
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
  searchUserChat = [];
  activeUser;
  chatsSubscription = new Subscription();
  ngOnInit() {
    setTimeout((p) => {
      this.loading.hideLoader();
    }, 5000);
  }
  fetchChats(userChatData: any[]) {
    this.userchat = [];
    this.searchUserChat = [];
    userChatData.map((userSpecificChatId, index) => {
      if (index === 0) {
        this.userchat = [];
        this.searchUserChat = [];
      }

      this.chatsSubscription.add(
        this.homeChattingService
          .fetchUserChats(
            userSpecificChatId.chattingUserId,
            userSpecificChatId.firebaseChatId
          )
          .subscribe((data: any) => {
            console.log(this.userchat);

            if (this.userchat.length <= 0) {
              this.userchat.push({
                userData: data[1],
                chatData: data[0],
                userId: userSpecificChatId.chattingUserId,
              });
            } else if (this.userchat.length > 0) {
              let userFound = false;
              this.userchat.map((userchatDATA, chatIndex) => {
                if (userchatDATA.userData.email === data[1].email) {
                  userFound = true;

                  this.userchat[chatIndex] = {
                    userData: data[1],
                    chatData: data[0],
                    userId: userSpecificChatId.chattingUserId,
                  };
                }
                if (this.userchat.length - 1 == chatIndex) {
                  if (userFound == false) {
                    this.userchat.push({
                      userData: data[1],
                      chatData: data[0],
                      userId: userSpecificChatId.chattingUserId,
                    });
                  }
                }
              });
            }

            this.searchUserChat = this.userchat;
          })
      );
    });
  }
  goToChats(uuid, user) {
    this.homeChattingService.setUserData(user);
    this.router.navigate(["/chating/" + uuid]);
  }
  goToContacts() {
    this.router.navigate(["/home/contacts"]);
  }
  searchChat(event) {
    let search = event.target.value;
    console.log(this.searchUserChat);
    this.userchat = this.searchUserChat.filter((re) => {
      return (
        re.userData.email.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
        re.userData.first_name.toLowerCase().indexOf(search.toLowerCase()) >
          -1 ||
        re.userData.last_name.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
    });
  }
  async openProfileModal(id, data) {
    this.homeChattingService.setUserData(data);
    const modal = this.modal.create({
      component: UserProfileComponent,
      showBackdrop: true,
      backdropDismiss: false,
      animated: true,
      cssClass: ["my-custom-modal-optcss modal-wrapper"],
      componentProps: {
        userData: data,
        id: id,
      },
    });
    (await modal).present();
  }
}
