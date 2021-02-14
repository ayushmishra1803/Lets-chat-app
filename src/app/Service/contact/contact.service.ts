import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  constructor(private angularfire: AngularFirestore) {}
  getContactonApp() {
    this.angularfire.collection("users").valueChanges().subscribe(users=>{
      console.log(users);
      
    })
  }
}
