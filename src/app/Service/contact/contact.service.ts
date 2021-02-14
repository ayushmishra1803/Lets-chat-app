import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(private angularfire: AngularFirestore) {}
  getContactonApp() {
   return this.angularfire.collection("users").get()
  }
  getLengthOfDataFromDb(){
    return this.angularfire.collection('users').valueChanges();
  }
}
