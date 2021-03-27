import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Service/login/login.service";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  constructor(
    private userData: UserDataService,
    private router: Router,
    private login: LoginService
  ) {}
  activeUserData: any = {};

  ngOnInit() {
    this.activeUserData = this.userData.getUserData();
  }

  logOut() {
    this.userData.setuserData(null);
    this.userData.setLoginStatus(false);
    this.router.navigate(["/login"], { replaceUrl: true });
  }
}
