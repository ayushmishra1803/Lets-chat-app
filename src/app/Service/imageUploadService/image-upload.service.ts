import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { ChattingService } from "../chattingService/chatting.service";
import { EditUserDataService } from "../Edit-User-Data/edit-user-data.service";

@Injectable({
  providedIn: "root",
})
export class ImageUploadService {
  constructor(
    private angularStorage: AngularFireStorage,
    private editUserData: EditUserDataService,private chattingService:ChattingService
  ) {}
  uploadProfileImageImage(imagefile, userId) {
    const storage = this.angularStorage.storage.ref(userId);
    storage
      .putString(imagefile, "data_url", {
        contentType: "image/jpeg",
      })
      .then((uploaded) => {
        const ref = this.angularStorage.ref(userId);
        ref.getDownloadURL().subscribe((url) => {
          this.editUserData.edituserData(
            userId,
            {
              profileImage: url,
            },
            "profileImage"
          );
        });
      });
  }
  UploadImage(imageData, SenderUuid, collectionId) {
    const uniqueuuid = Math.random().toString();
    const storage = this.angularStorage.storage.ref(`photos/${uniqueuuid}`);
    storage
      .putString(imageData, "base64", {
        contentType: "image/jpeg",
      })
      .then((uploaded) => {
        const ref = this.angularStorage.ref(`photos/${uniqueuuid}`);
        ref.getDownloadURL().subscribe((url) => {
         // console.log(url);
          const data = {
            messageType: "Image",
            imageUrl: url,
            sender: SenderUuid,
            Date: new Date(),message:"Photo"
          };
          this.chattingService.addMessgaesIfChatExist(collectionId,data)
        });
      });
  }
}
