import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";
import { FcmTokenService } from "./Service/tokenService/fcm-token.service";

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
    private fcmToken: FcmTokenService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.tokenInit();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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

    // FCM.onTokenRefresh().subscribe(token => {
    //  console.log(token);

    // });
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
