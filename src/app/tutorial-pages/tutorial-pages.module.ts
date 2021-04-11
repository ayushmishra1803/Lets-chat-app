import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorialPagesPageRoutingModule } from './tutorial-pages-routing.module';

import { TutorialPagesPage } from './tutorial-pages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorialPagesPageRoutingModule
  ],
  declarations: [TutorialPagesPage]
})
export class TutorialPagesPageModule {}
