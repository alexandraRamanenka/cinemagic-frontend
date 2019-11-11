import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve-ticket-button',
  templateUrl: './reserve-ticket-button.component.html',
  styleUrls: ['./reserve-ticket-button.component.scss']
})
export class ReserveTicketButtonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  click() {
    const url = 'ws://localhost:8080';
    const ws = new WebSocket(url);
    ws.onopen = () => {
      console.log('ws connection');
      ws.send('hey');
    };
  }
}
