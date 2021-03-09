import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,children:[{
      path: 'chats',
      loadChildren: () => import('./chats/chats.module').then( m => m.ChatsPageModule)
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
    },
    {
      path: 'contacts',
      loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
    }]
  },
 

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
