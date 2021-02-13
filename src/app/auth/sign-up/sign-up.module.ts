import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SignUpPageRoutingModule } from "./sign-up-routing.module";

import { SignUpPage } from "./sign-up.page";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { ValidatorService } from "src/app/Service/validatorsService/validator.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
  ],
  declarations: [SignUpPage],
  providers: [ValidatorService],
})
export class SignUpPageModule {}
