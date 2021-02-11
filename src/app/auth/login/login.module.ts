import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { LoginPageRoutingModule } from "./login-routing.module";

import { LoginPage } from "./login.page";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { LoginService } from "src/app/Service/login/login.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AngularFireAuthModule,
  ],
  declarations: [LoginPage],
  providers: [AngularFireAuth, LoginService],
})
export class LoginPageModule {}
