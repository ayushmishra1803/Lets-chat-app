import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { FcmTokenService } from "./Service/tokenService/fcm-token.service";

import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { UserDataService } from "./Service/userData/user-data.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcmToken: FcmTokenService,
    private Storage: Storage,
    private router: Router,
    private userData: UserDataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkLoginStatus();
      this.tokenInit();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    this.Storage.get("userData")
      .then((result) => {
        if (result == null) {
          this.userData.setLoginStatus(false);
          this.router.navigate(["/login"], { replaceUrl: true });
        } else {
          this.userData.setLoginStatus(true);
          this.userData.setuserData(result);
          this.router.navigate(["/home/chats"], { replaceUrl: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //This Method is responsible for the fcm token used for Push notifications
  tokenInit() {
    FCM.getToken()
      .then((token) => {
        console.log(token);
        this.fcmToken.setToken(token);
      })
      .catch((err) => {
        console.log(err);
      });

    FCM.onNotification().subscribe((data) => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });

    FCM.hasPermission().then((hasPermission) => {
      if (hasPermission) {
        console.log("Has permission!");
      }
    });
  }
}
