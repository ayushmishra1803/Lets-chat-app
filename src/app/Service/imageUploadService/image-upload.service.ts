import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { EditUserDataService } from "../Edit-User-Data/edit-user-data.service";

@Injectable({
  providedIn: "root",
})
export class ImageUploadService {
  constructor(
    private angularStorage: AngularFireStorage,
    private editUserData: EditUserDataService
  ) {}
  uploadProfileImageImage(imagefile,userId){
    const storage = this.angularStorage.storage.ref(
      userId
    );
    storage
      .putString(imagefile, "data_url", {
        contentType: "image/jpeg",
      }).then(uploaded=>{
        const ref = this.angularStorage.ref(userId);
        ref.getDownloadURL().subscribe(url=>{
          this.editUserData.edituserData(userId,{
            profileImage:url
          },'profileImage')
        })
      })

    
    
  }
}
