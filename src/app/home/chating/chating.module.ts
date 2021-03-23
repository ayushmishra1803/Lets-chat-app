import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatingPageRoutingModule } from './chating-routing.module';

import { ChatingPage } from './chating.page';

import { AngularFireMessagingModule } from '@angular/fire/messaging';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatingPageRoutingModule,AngularFireMessagingModule
  ],
  declarations: [ChatingPage]
})
export class ChatingPageModule {}
