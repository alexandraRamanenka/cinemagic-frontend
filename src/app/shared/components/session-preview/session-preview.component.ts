import { Component, OnInit, Input } from '@angular/core';
import { Session } from '@shared/models/session';

@Component({
  selector: 'app-session-preview',
  templateUrl: './session-preview.component.html',
  styleUrls: ['./session-preview.component.scss']
})
export class SessionPreviewComponent implements OnInit {
  @Input() session: Session;
  constructor() {}

  ngOnInit() {}
}
