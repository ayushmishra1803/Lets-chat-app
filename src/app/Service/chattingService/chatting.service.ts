import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserDataService } from "../userData/user-data.service";

@Injectable({
  providedIn: "root",
})
export class ChattingService {
  constructor(
    private angularfire: AngularFirestore,
    private userData: UserDataService
  ) {}
  addtochats(...agrs) {
    const chatData = {
      ...agrs[2],
    };
    this.angularfire
      .collection("chats")
      .add(chatData)
      .then((charAdded) => {
        const dataFor0 = {
          id: agrs[1].id,
          firebaseChatId: charAdded.id,
        };
        const dataFor1 = {
          id: agrs[1].id,
          firebaseChatId: charAdded.id,
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
  addMessgaesIfChatExist(chatId) {
 
  }
}
