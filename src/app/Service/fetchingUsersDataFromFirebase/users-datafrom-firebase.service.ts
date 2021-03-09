import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class UsersDatafromFirebaseService {

  constructor(private fireStore:AngularFirestore) { }
  
  getUserByuuid(uuid){

  }

}
