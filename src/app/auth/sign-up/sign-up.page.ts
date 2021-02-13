import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { LoginService } from "src/app/Service/login/login.service";
import { ValidatorService } from "src/app/Service/validatorsService/validator.service";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService,
    private angularFire: AngularFirestore,
    private ValidationService: ValidatorService
  ) {}

  userForm: FormGroup;
  invalidUsername = true;
  loadingUsername = false;
  usernameSubscription: Subscription;
  loadingMobileNumber = false;
  invalidMobileNumnber = true;
  mobileNumberSubscription: Subscription;
  ngOnInit() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),

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
  checkUsername(event) {
    this.loadingUsername = true;
    this.usernameSubscription = this.ValidationService.checkingValidation(
      "username",
      event.target.value
    ).subscribe((result) => {
      this.loadingUsername = false;
      console.log(result);
      result.length
        ? (this.invalidUsername = true)
        : (this.invalidUsername = false);
    });
  }
  checkMobileNumber(event) {
    this.loadingMobileNumber = true;
    this.mobileNumberSubscription = this.ValidationService.checkingValidation(
      "mobileNumber",
      event.target.value
    ).subscribe((result) => {
      console.log(result);

      this.loadingMobileNumber = false;
      result.length
        ? (this.invalidMobileNumnber = true)
        : (this.invalidMobileNumnber = false);
    });
  }
}
