import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpPageRoutingModule } from './sign-up-routing.module';

import { SignUpPage } from './sign-up.page';
import { UsernameValidator } from 'src/app/validators/userNameValidator';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,ReactiveFormsModule,AngularFirestoreModule  ],
  declarations: [SignUpPage,],providers:[UsernameValidator]
})
export class SignUpPageModule {}
