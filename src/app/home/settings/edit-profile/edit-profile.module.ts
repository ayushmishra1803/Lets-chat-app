import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditProfilePageRoutingModule } from "./edit-profile-routing.module";

import { EditProfilePage } from "./edit-profile.page";
import { HeadingDirective } from "src/app/Directives/heading/heading.directive";
import { EditProfileCardComponent } from "src/app/components/edit-profile-card/edit-profile-card.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
  ],
  declarations: [EditProfilePage, HeadingDirective, EditProfileCardComponent],
})
export class EditProfilePageModule {}
