import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic";

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

    FCM.getToken().then((token) => {
      console.log(token);
    }).catch(err=>{console.log(err);
    })

   

    // FCM.onTokenRefresh().subscribe(token => {
    //  console.log(token);

    // });

    FCM.hasPermission().then((hasPermission) => {
      if (hasPermission) {
        console.log("Has permission!");
      }
    });


  }
}
