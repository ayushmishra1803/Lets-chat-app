import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {}
  userLogin(number, register) {
    return this.auth.signInWithPhoneNumber(number, register);
  }
  userSiginUp(data) {
    const DataToBeAdded = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      mobileNumber: data.mobile_number,
      email: data.email,
    };
    console.log(DataToBeAdded);

    this.fireStore
      .collection("users")
      .add(DataToBeAdded)
      .then((dataAdded) => {
        this.auth
          .createUserWithEmailAndPassword(data.email, data.password)
          .then((AuthCreated) => {
            console.log(AuthCreated);
            
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  }
  ForgotPassword() {}
}
