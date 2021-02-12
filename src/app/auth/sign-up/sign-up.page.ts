import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Service/login/login.service";
import { UsernameValidator } from "src/app/validators/userNameValidator";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private angularFire: AngularFirestore
  ) {}

  userForm: FormGroup;
  ngOnInit() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        UsernameValidator.username(this.angularFire),
      ]),

      last_name: new FormControl("", {
        asyncValidators: [],
      }),
      username: new FormControl("", {
        asyncValidators: [],
      }),

      mobile_number: new FormControl("", {
        asyncValidators: [],
      }),

      email: new FormControl("", {
        asyncValidators: [],
      }),

      password: new FormControl("", {
        asyncValidators: [],
      }),
    });
  }
  SignUp() {
    const data = {
      first_name: this.userForm.controls.first_name.value,
      last_name: this.userForm.controls.last_name.value,
      username: this.userForm.controls.username.value,
      mobile_number: this.userForm.controls.mobile_number.value,
      email: this.userForm.controls.email.value,
      password: this.userForm.controls.password.value,
    };

    this.loginService.userSiginUp(data);
  }
  navigateTologin() {
    this.router.navigate(["/login"]);
  }
}
