import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() afterLoad: any = () => {};
  @Input() set loading(value: boolean) {
    this.loadingState = value;
    if (value) {
      this.afterLoad();
    }
  }

  get loading(): boolean {
    return this.loadingState;
  }

  private loadingState = true;

  constructor() {}

  ngOnInit() {}
}
