import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { ContactService } from "../Service/contact/contact.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule,AngularFirestoreModule],
  declarations: [HomePage],
  providers: [ContactService],
})
export class HomePageModule {}
