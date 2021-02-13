import { Injectable } from "@angular/core";
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserDataService } from "src/app/Service/userData/user-data.service";

@Injectable({
  providedIn: "root",
})
export class AuthChildGuard implements CanActivateChild {
  constructor(private userData: UserDataService) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userData.getloginStatus()) {
      return true;
    } else {
      return false;
    }
  }
}
