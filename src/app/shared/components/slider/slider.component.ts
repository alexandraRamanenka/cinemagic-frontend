import { fromEvent, Subscription } from 'rxjs';
import {
  Component,
  ViewChildren,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  ContentChildren,
  QueryList
} from '@angular/core';
import { SlideDirective } from './slide.directive';
import {
  AnimationBuilder,
  AnimationFactory,
  animate,
  style,
  AnimationPlayer
} from '@angular/animations';
import { SlideContentDirective } from './slide-content.directive';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slider', { static: true }) slider;
  @ContentChildren(SlideDirective) slidesItems: QueryList<SlideDirective>;
  @ViewChildren(SlideContentDirective, { read: ElementRef })
  private slides: QueryList<ElementRef>;
  @ViewChild('sliderNext', { static: true }) nextControl;
  @ViewChild('sliderPrev', { static: true }) prevControl;

  @Input() animationTiming = '200ms ease-in';

  private currentSlide = 0;
  private itemWidth: number;
  private player: AnimationPlayer;
  private nextClicked$: Subscription;
  private prevClicked$: Subscription;

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    this.itemWidth = this.slides.first.nativeElement.clientWidth;
    console.log(this.itemWidth);
    console.log(this.slidesItems);
    this.nextClicked$ = this.nextControl
      ? fromEvent(this.nextControl.nativeElement, 'click').subscribe(e =>
          this.onNextClicked()
        )
      : null;
    this.prevClicked$ = this.prevControl
      ? fromEvent(this.prevControl.nativeElement, 'click').subscribe(e =>
          this.onPrevClicked()
        )
      : null;
  }

  ngOnDestroy(): void {
    this.nextClicked$.unsubscribe();
    this.prevClicked$.unsubscribe();
  }

  private onNextClicked() {
    let timing = this.animationTiming;

    if (this.currentSlide === this.slidesItems.length - 1) {
      this.currentSlide = 0;
      timing = '0ms';
    } else {
      this.currentSlide++;
    }
    const offset = this.currentSlide * this.itemWidth;

    const animation: AnimationFactory = this.builder.build([
      animate(timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = animation.create(this.slider.nativeElement);
    this.player.play();
  }

  private onPrevClicked() {
    let timing = this.animationTiming;

    if (this.currentSlide === 0) {
      this.currentSlide = this.slidesItems.length - 1;
      timing = '0ms';
    } else {
      this.currentSlide--;
    }

    const offset = this.currentSlide * this.itemWidth;

    const animation: AnimationFactory = this.builder.build([
      animate(timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = animation.create(this.slider.nativeElement);
    this.player.play();
  }
}
