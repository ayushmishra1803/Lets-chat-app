import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class HomeChatsService {
  constructor(private angularfire: AngularFirestore) {}
  getActiveUserChats(activeuserUuid) {
    return this.angularfire
      .collection("users")
      .doc(activeuserUuid)
      .collection("chats")
      .get();
  }
  fetchUserChats(...args) {
    console.log(args);
  }
}
