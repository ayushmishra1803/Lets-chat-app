import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from "@angular/core";
import { GestureController } from "@ionic/angular";

@Directive({
  selector: "[appLongPress]",
})
export class LongPressDirective implements AfterViewInit {
  constructor(
    private gestureCtrl: GestureController,
    private ElementRef: ElementRef,
    private zone: NgZone
  ) {}
  @Output() longPress = new EventEmitter();
  @Input("delay") delay = 1500;
  action: any;
  private longPressActive = false;
  ngAfterViewInit(): void {
    this.loadLongPressOnElement();
  }
  loadLongPressOnElement() {
    const gesture = this.gestureCtrl.create({
      el: this.ElementRef.nativeElement,
      threshold: 0,
      gestureName: "long-press",
      onStart: (ev) => {
        this.longPressActive = true;
        this.longPressAction();
      },
      onEnd: (ev) => {
        this.longPressActive = false;
      },
    });
    gesture.enable(true);
  }
  private longPressAction() {
    if (this.action) {
      clearInterval(this.action);
    }
    this.action = setTimeout(() => {
      this.zone.run(() => {
        if (this.longPressActive === true) {
          this.longPressActive = false;
          this.longPress.emit();
        }
      });
    }, this.delay);
  }
}
