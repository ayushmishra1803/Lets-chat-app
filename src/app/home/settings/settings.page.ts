import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/Service/userData/user-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private userData:UserDataService) { }
  activeUserData:any={}

  ngOnInit() {
    this.activeUserData=this.userData.getUserData();
  }

}
