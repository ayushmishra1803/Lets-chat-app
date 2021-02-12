import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Service/login/login.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {}
  SignUp(f: NgForm) {
    const data = {
      first_name: f.value.firstName,
      last_name: f.value.lastName,
      username: f.value.username,
      mobile_number: f.value.mobilenumber,
      email: f.value.email,
      password: f.value.password,
    };
    this.loginService.userSiginUp(data)
  }
  navigateTologin() {
    this.router.navigate(["/login"]);
  }
}
