import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserDataService } from "../userData/user-data.service";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class ChattingService {
  constructor(
    private angularfire: AngularFirestore,
    private userData: UserDataService
  ) {}
  FirstTymChat(...agrs) {
    const collectionName = Math.random().toString();
    const chatData = {
      ...agrs[2],
    };
    this.angularfire
      .collection(collectionName)
      .add(chatData)
      .then((charAdded) => {
        const dataFor0 = {
          chattingUserId: agrs[1].id,
          firebaseChatId: collectionName,
        };
        const dataFor1 = {
          chattingUserId: agrs[0].id,
          firebaseChatId: collectionName,
        };
        this.angularfire
          .collection(`users/${agrs[0].id}/chats`)
          .add(dataFor0)
          .then((result) => {
            this.angularfire
              .collection(`users/${agrs[1].id}/chats`)
              .add(dataFor1)
              .then((result) => {});
          });
      });
  }
  searchIfChatExist(chattingUserID, activeuserId) {
    return this.angularfire
      .collection(`users`)
      .doc(`${activeuserId}`)
      .collection("chats", (ref) =>
        ref.where("chattingUserId", "==", chattingUserID)
      )
      .get();
  }
  fetchChats(chatsCollectionUUid) {
    return this.angularfire
      .collection(chatsCollectionUUid, (ref) => ref.orderBy("Date", "asc"))
      .snapshotChanges()
      .pipe(
        map((action) =>
          action.map((a) => {
            const data = a.payload.doc.data() as any[];
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
  addMessgaesIfChatExist(chatId, data) {
    return this.angularfire.collection(chatId).add(data);
  }
}
