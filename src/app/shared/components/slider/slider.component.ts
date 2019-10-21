import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  QueryList,
  ViewChild,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  @ViewChild('sliderContent', { static: false }) slidesContainer;
  @ViewChildren('sliderContent') slides: QueryList<ElementRef>;
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const width = this.slidesContainer.nativeElement.clientWidth;
    this.slides.forEach(slide => {
      console.log(slide);
      this.renderer.setAttribute(slide, 'max-width', `${width}`);
    });
  }
}
