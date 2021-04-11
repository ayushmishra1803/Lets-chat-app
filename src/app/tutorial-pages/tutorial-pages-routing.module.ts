import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TutorialPagesPage } from './tutorial-pages.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialPagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialPagesPageRoutingModule {}
