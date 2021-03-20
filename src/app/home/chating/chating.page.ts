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
  ngOnInit() {
    this.activatedRoute.params.subscribe((uuid) => {
      console.log(uuid.uuid);
      this.gettinguserDataService
        .getUserByuuid(uuid.uuid)
        .subscribe((result) => {
          result.forEach((mainData) => {
            if (mainData.id === uuid.uuid) {
              console.log(mainData.id);
              console.log(mainData.data());
              this.chatingUser = { ...mainData.data, id: mainData.id };
            }
          });
        });
    });
  }
}
