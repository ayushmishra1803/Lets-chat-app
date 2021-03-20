import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root",
})
export class UsersDatafromFirebaseService {
  constructor(private fireStore: AngularFirestore) {}

  getUserByuuid(uuid) {
   return this.fireStore.collection(`users`).get()
  }
}
