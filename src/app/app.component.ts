import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    'https://images.unsplash.com/photo-1569834381156-7b735e41e57d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
    'https://images.unsplash.com/photo-1571388826617-5a9094f5f9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1569277401324-53bde2e6708e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQwMzA0fQ&auto=format&fit=crop&w=1311&q=80'
  ];
  title = 'cinemagic-frontend';
}
