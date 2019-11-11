import { Component, OnInit, Input } from '@angular/core';
import { Session } from '@shared/models/session';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.scss']
})
export class SessionsListComponent implements OnInit {
  @Input() sessions: Session[];

  constructor() {}

  ngOnInit() {}
}
