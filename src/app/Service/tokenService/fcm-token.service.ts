import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FcmTokenService {

  constructor() { }
  fcmToken
  setToken(token){
    this.fcmToken=token
  }
  gettoken(){
    return this.fcmToken
  }
}
