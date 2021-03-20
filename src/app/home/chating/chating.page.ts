import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersDatafromFirebaseService } from "src/app/Service/fetchingUsersDataFromFirebase/users-datafrom-firebase.service";

@Component({
  selector: "app-chating",
  templateUrl: "./chating.page.html",
  styleUrls: ["./chating.page.scss"],
})
export class ChatingPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private gettinguserDataService: UsersDatafromFirebaseService
  ) {}
  activatedUser;
  chatingUser;
  message = "";
  ngOnInit() {
    this.activatedRoute.params.subscribe((uuid) => {
      console.log(uuid.uuid);
      this.gettinguserDataService
        .getUserByuuid(uuid.uuid)
        .subscribe((result) => {
          console.log();
          let data = {};
          data = result.data();
          this.chatingUser = {
            id: result.id,
            ...data,
          };
          console.log(this.chatingUser);
        });
    });
  }
}
