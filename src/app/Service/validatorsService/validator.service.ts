import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class ValidatorService {
  constructor(private fireStore: AngularFirestore) {}
  checkingValidation(field, value) {
    return this.fireStore
      .collection("users", (ref) => ref.where(field, "==", value))
      .valueChanges();
  }
}
