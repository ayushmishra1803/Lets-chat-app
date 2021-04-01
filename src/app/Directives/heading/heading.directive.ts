import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appHeading]",
})
export class HeadingDirective implements OnInit {
  constructor(private ElemetRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(this.ElemetRef.nativeElement, "width", "100%");
    this.renderer.setStyle(this.ElemetRef.nativeElement, "display", "flex");
    this.renderer.setStyle(this.ElemetRef.nativeElement, "margin-top", "5%");

    this.renderer.setStyle(
      this.ElemetRef.nativeElement,
      "justify-content",
      "center"
    );
    this.renderer.setStyle(this.ElemetRef.nativeElement, "color", "white");
    this.renderer.setStyle(this.ElemetRef.nativeElement, "font-size", "18px");
  }
}
