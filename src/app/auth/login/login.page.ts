import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "src/app/Service/login/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private Router: Router, private loginService: LoginService) {}

  ngOnInit() {}
  OnLoginSubmit(f: NgForm) {
   this.loginService.userLogin(f.value.email,f.value.password)
  }
  navigateToSignUp() {
    this.Router.navigate(["/sign-up"]);
  }
}
