import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserDataService } from "../userData/user-data.service";

@Injectable({
  providedIn: "root",
})
export class EditUserDataService {
  constructor(
    private angularFire: AngularFirestore,
    private userData: UserDataService
  ) {}

  edituserData(docId, data, editedKey) {
    const OlduserData = this.userData.getUserData();

    this.angularFire
      .collection("users")
      .doc(docId)
      .update(data)
      .then((userdata) => {
        const UpdatesData = {
          ...OlduserData,
          [editedKey]: data[editedKey],
        };
        console.log(UpdatesData);

        this.userData.setuserData(UpdatesData);
      });
  }
}
