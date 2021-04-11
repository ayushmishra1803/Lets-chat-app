import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ChattingLongHoldMenuComponent } from "src/app/components/chatting-long-hold-menu/chatting-long-hold-menu.component";
import { ChattingService } from "src/app/Service/chattingService/chatting.service";
import { UsersDatafromFirebaseService } from "src/app/Service/fetchingUsersDataFromFirebase/users-datafrom-firebase.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";
import { Camera, CameraOptions } from "@ionic-native/Camera/ngx";
import { ImageUploadService } from "src/app/Service/imageUploadService/image-upload.service";
import { ViewerModalComponent } from "ngx-ionic-image-viewer";
import { SpeechRecognition } from "@ionic-native/speech-recognition/ngx";
@Component({
  selector: "app-chating",
  templateUrl: "./chating.page.html",
  styleUrls: ["./chating.page.scss"],
})
export class ChatingPage implements OnInit, AfterContentInit, AfterViewChecked {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gettinguserDataService: UsersDatafromFirebaseService,
    private chatting: ChattingService,
    private userData: UserDataService,
    private notification: AngularFireMessaging,
    private modalController: ModalController,
    private camera: Camera,
    private uploadPhotoService: ImageUploadService,
    private speechRecognition: SpeechRecognition,
    private router: Router
  ) {}
  @ViewChild("chatInputONDOM", { static: false }) chatInput: ElementRef;
  EditMode: boolean = false;
  chatToBeEdited: any = {};
  ngAfterViewChecked(): void {
    try {
      this.chatSection.nativeElement.scrollTop = this.chatSection.nativeElement.scrollHeight;
    } catch (err) {}
  }
  @ViewChild("chatSection") chatSection: ElementRef;
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
  chats: any = [];
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

                    try {
                      this.chatSection.nativeElement.scrollTop = this.chatSection.nativeElement.scrollHeight;
                    } catch (err) {}
                  });
              });
            });
        });
    });
    this.chatting.newChatCollectionName.subscribe((res) => {
      this.chattingCollection = res;
      this.chatting.fetchChats(this.chattingCollection).subscribe((chats) => {
        this.chats = chats ? chats : [];

        try {
          this.chatSection.nativeElement.scrollTop = this.chatSection.nativeElement.scrollHeight;
        } catch (err) {}
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
        this.message = "";
      } else {
        const data = {
          sender: this.userData.getUserData().id,
          message: this.message,
          Date: new Date(),
        };
        this.chatting.addMessgaesIfChatExist(this.chattingCollection, data);
        this.message = "";
      }
    }
  }
  onLongHold(selectedChat) {
    this.modalController
      .create({
        component: ChattingLongHoldMenuComponent,
        backdropDismiss: true,
        cssClass: ["chat-menu-modal modal-wrapper"],
      })
      .then((present) => {
        present.present();
        present.onDidDismiss().then((onDissmiss) => {
          console.log(onDissmiss);
          if (onDissmiss.data) {
            if (onDissmiss.data.data === "Delete") {
              this.deletemessage(selectedChat);
            } else if (onDissmiss.data.data === "Edit") {
              this.editMode(selectedChat);
            }
          }
        });
      })
      .catch((err) => {});
  }
  deletemessage(selectedChatData) {
    console.log(selectedChatData);

    this.chatting
      .deleteMessage(this.chattingCollection, selectedChatData.id)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {});
  }
  editMode(selectedChatData) {
    this.chatToBeEdited = selectedChatData;
    this.EditMode = true;
    this.message = selectedChatData.message;
  }
  editmessage() {
    this.EditMode = false;
    const data = {
      message: this.message,
      edited: true,
    };
    this.chatting.editMessage(
      this.chattingCollection,
      this.chatToBeEdited.id,
      data
    );
    this.chatToBeEdited = {};
    this.message = "";
  }

  /* 
  this method is responsible for selecting images from cameara 
*/
  SendPhoto() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        if (this.chattingCollection === "") {
          this.uploadPhotoService.UploadImageIfChatDoesNotExist(
            imageData,
            this.userData.getUserData().id,
            this.chatingUser,
            this.userData.getUserData()
          );
        } else {
          this.uploadPhotoService.UploadImage(
            imageData,
            this.userData.getUserData().id,
            this.chattingCollection
          );
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
  async viewPhoto(src) {
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
  /* 
 this method is responsible for Taking Permission for speech 
*/
  speechToTextRequestPermission() {
    this.speechRecognition.requestPermission().then(
      () => this.turnSpeechToText(),
      () => console.log("Denied")
    );
  }
  /* 
 this method is responsible for Converting speech into text
*/
  turnSpeechToText() {
    this.speechRecognition.startListening().subscribe(
      (matches: string[]) => {
        this.message = this.message + matches[0];
      },
      (onerror) => console.log("error:", onerror)
    );
  }
  /* 
  this method is responsible for selecting images from gallery 
  */
  sendImageFromGalley() {
    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        targetWidth: 500, //what widht you want after capaturing
        targetHeight: 500,
      })
      .then((imageData) => {
        if (this.chattingCollection === "") {
          this.uploadPhotoService.UploadImageIfChatDoesNotExist(
            imageData,
            this.userData.getUserData().id,
            this.chatingUser,
            this.userData.getUserData()
          );
        } else {
          this.uploadPhotoService.UploadImage(
            imageData,
            this.userData.getUserData().id,
            this.chattingCollection
          );
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }
  goToProfile() {
    this.router.navigate(["/profile-page"]);
  }
}
