import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { LoadingService } from "../loading/loading.service";
import { ToastControllerService } from "../toastController/toast-controller.service";
import { FcmTokenService } from "../tokenService/fcm-token.service";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private auth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private loader: LoadingService,
    private router: Router,
    private toast: ToastControllerService,
    private fcmToken: FcmTokenService
  ) {}
  userLogin(email, password) {
    let userData;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((loginSuccess) => {
        this.fireStore
          .collection("users", (ref) => ref.where("email", "==", email))
          .get()
          .subscribe((result) => {
            result.forEach((doc) => {
              let data = {};
              data = doc.data();
              userData = {
                id: doc.id,
                ...data,
              };
              console.log(userData);
            });
          });
      });
  }
  userSiginUp(data) {
    this.loader.showLoader();
    const DataToBeAdded = {
      first_name: data.first_name,
      last_name: data.last_name,
      username: data.username,
      mobileNumber: data.mobile_number,
      email: data.email,
      fcmToken: this.fcmToken.gettoken() ? this.fcmToken.gettoken() : "",
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
            this.loader.hideLoader();
            this.router.navigate(["/login"]);
            this.toast.bringToastController(
              "Account Created!!",
              3000,
              "success"
            );
          })
          .catch((err) => {
            this.loader.hideLoader();
            this.toast.bringToastController(
              "Something Went Wrong",
              3000,
              "danger"
            );
          });
      })
      .catch((err) => {
        this.loader.hideLoader();
        this.toast.bringToastController("Something Went Wrong", 3000, "danger");
      });
  }
  ForgotPassword() {}
  changeUserFcmToken(){
      
  }
}
