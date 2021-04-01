import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-edit-profile-card",
  templateUrl: "./edit-profile-card.component.html",
  styleUrls: ["./edit-profile-card.component.scss"],
})
export class EditProfileCardComponent implements OnInit {
  @Input() cardConfig: {
    title: string;
    value: string;
    placeholder: string;
    type: string;
  };
  @Output() onChangeInput = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}
  onChnage(event){
    
    this.onChangeInput.emit(event.target.value)
  }
}
