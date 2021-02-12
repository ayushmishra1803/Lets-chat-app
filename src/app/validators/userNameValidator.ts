import { AngularFirestore } from "@angular/fire/firestore";
import { AbstractControl } from "@angular/forms";
import { map} from "rxjs/operators";
export class UsernameValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      console.log(control);

      const username = control.value.toLowerCase();

      return afs
        .collection("users", (ref) => ref.where("username", "==", username))
        .valueChanges().pipe(map(res=>{
            console.log(res);
            
            return null
        }))
    };
  }
}
//(debounceTime(500),take(1),map(res=>res.length ? {username:"Ayush"}:null))