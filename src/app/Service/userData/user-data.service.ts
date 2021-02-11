import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private storage: Storage) {}
  userData;
  setuserData(userData) {
    this.userData = userData;
    this.storage
      .set("userData", userData)
      .then((stored) => {
        //console.log(stored);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getUserData() {
    return this.userData;
  }
  fetchUserAtreLogin() {
    this.storage
      .get("userData")
      .then((fetched) => {
        this.userData = fetched;
        console.log(fetched);
      })
      .catch((err) => {});
  }
}
