import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsPage } from "./settings.page";

const routes: Routes = [
  {
    path: "",
    component: SettingsPage,
  },
  {
    path: "edit-profile",
    loadChildren: () =>
      import("./edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
