import { Component, OnInit, Input } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-reserve-ticket-button',
  templateUrl: './reserve-ticket-button.component.html',
  styleUrls: ['./reserve-ticket-button.component.scss']
})
export class ReserveTicketButtonComponent implements OnInit {
  @Input() link;

  constructor() {}

  ngOnInit() {}
}
