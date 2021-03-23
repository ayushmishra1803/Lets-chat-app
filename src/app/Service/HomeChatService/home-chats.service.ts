import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest } from "rxjs";

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
      .valueChanges();
  }
  fetchUserChats(chattinuser, firebaseChatID) {
  return   combineLatest(
      this.angularfire
        .collection(firebaseChatID, (ref) => ref.orderBy("Date", "asc"))
        .valueChanges(),
      this.angularfire.collection("users").doc(chattinuser).valueChanges()
    );
  }
}
