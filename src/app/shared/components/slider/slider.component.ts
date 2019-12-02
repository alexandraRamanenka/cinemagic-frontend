import { fromEvent, Subject, Observable } from 'rxjs';
import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ContentChild
} from '@angular/core';
import { SlideDirective } from './slide.directive';
import {
  AnimationBuilder,
  AnimationFactory,
  animate,
  style,
  AnimationPlayer
} from '@angular/animations';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('slider', { static: true }) slider;
  @ContentChildren(SlideDirective) slidesItems: QueryList<SlideDirective>;
  @ContentChild('sliderNext', { static: true }) nextControl;
  @ContentChild('sliderPrev', { static: true }) prevControl;

  @Input() animationTiming = '200ms ease-in';
  @Input() offset = 0;

  private currentSlide = 0;
  private itemWidth: number;
  private player: AnimationPlayer;
  private unsubscribe$: Subject<void> = new Subject();
  private nextClicked$: Observable<any>;
  private prevClicked$: Observable<any>;
  slideStyle = {};

  constructor(private builder: AnimationBuilder) {}

  ngOnInit() {
    this.itemWidth = this.slider.nativeElement.clientWidth;
    this.offset = this.offset || this.itemWidth;
    this.slideStyle = {
      width: `${this.itemWidth}px`
    };
  }

  ngAfterViewInit() {
    this.nextClicked$ = this.nextControl
      ? fromEvent(this.nextControl.nativeElement, 'click')
      : null;
    if (this.nextClicked$) {
      this.nextClicked$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(e => this.onNextClicked());
    }

    this.prevClicked$ = this.prevControl
      ? fromEvent(this.prevControl.nativeElement, 'click')
      : null;
    if (this.prevClicked$) {
      this.prevClicked$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(e => this.onPrevClicked());
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private onNextClicked() {
    const timing = this.animationTiming;

    if (this.currentSlide === this.slidesItems.length - 1) {
      this.currentSlide = 0;
      this.createAnimation('0ms', (this.slidesItems.length - 1) * this.offset);
    } else {
      this.currentSlide++;
    }

    const offset = this.currentSlide * this.offset;
    this.createAnimation(timing, offset);
  }

  private onPrevClicked() {
    const timing = this.animationTiming;

    if (this.currentSlide === 0) {
      this.currentSlide = this.slidesItems.length - 1;
      this.createAnimation('0ms', (this.currentSlide + 1) * this.offset);
    } else {
      this.currentSlide--;
    }

    const offset = this.currentSlide * this.offset;
    this.createAnimation(timing, offset);
  }

  private createAnimation(timing, offset) {
    const animation: AnimationFactory = this.builder.build([
      animate(timing, style({ transform: `translateX(-${offset}px)` }))
    ]);

    this.player = animation.create(this.slider.nativeElement);
    this.player.play();
  }
}
