import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ChatingPageRoutingModule } from "./chating-routing.module";

import { ChatingPage } from "./chating.page";

import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { LongPressDirective } from "src/app/Directives/longPressDirective/long-press.directive";
import { ChattingLongHoldMenuComponent } from "src/app/components/chatting-long-hold-menu/chatting-long-hold-menu.component";
import { NgxIonicImageViewerModule } from "ngx-ionic-image-viewer";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatingPageRoutingModule,
    AngularFireMessagingModule,
    NgxIonicImageViewerModule,
  ],
  declarations: [
    ChatingPage,
    LongPressDirective,
    ChattingLongHoldMenuComponent,
  ],
})
export class ChatingPageModule {}
