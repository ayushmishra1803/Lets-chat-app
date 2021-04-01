import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.page.html",
  styleUrls: ["./edit-profile.page.scss"],
})
export class EditProfilePage implements OnInit {
  editable = [
    {
      title: "First Name",
      placeholder: "Jhon",
      value: "",
      type: "text",
    },
    {
      title: "Last Name",
      placeholder: "Doe",
      value: "",
      type: "text",
    },
    {
      title: "Your Email",
      placeholder: "JhonDoe@unknown.com",
      value: "",
      type: "text",
    },
    {
      title: "Your @Username",
      placeholder: "Jhon@Doe",
      value: "",
      type: "text",
    },
    {
      title: "Your Mobile Number",
      placeholder: "+91 *******",
      value: "",
      type: "tel",
    },
  ];
  constructor(private userData: UserDataService, private nav: NavController) {}

  ngOnInit() {
    this.editable[0].value = this.userData.getUserData().first_name;

    this.editable[1].value = this.userData.getUserData().last_name;

    this.editable[2].value = this.userData.getUserData().email;

    this.editable[3].value = this.userData.getUserData().username;

    this.editable[4].value = this.userData.getUserData().mobileNumber;
  }
  onChangeInputValue(event, index) {
    console.log(event);
  }
  goBack() {
    this.nav.pop();
  }
}
