import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserDataService } from "../userData/user-data.service";

@Injectable({
  providedIn: "root",
})
export class ChattingService {
  constructor(
    private angularfire: AngularFirestore,
    private userData: UserDataService
  ) {}
  addtochats(...agrs) {}
}
