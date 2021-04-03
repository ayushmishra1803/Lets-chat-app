import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class EditUserDataService {
  constructor(private angularFire: AngularFirestore) {}
  edituserData(docId, data) {
    this.angularFire.collection("users").doc(docId).update(data).then(userdata=>{

    })
  }
}
