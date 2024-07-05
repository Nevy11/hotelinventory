import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hinvHover]',
  standalone: true,
})
export class HoverDirective implements OnInit {
  @Input() color: string = 'red';

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private render: Renderer2
  ) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    // this.element.nativeElement.style.backgroundColor = this.color;
    this.render.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.color
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.render.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.render.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.color
    );
  }
}
