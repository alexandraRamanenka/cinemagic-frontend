import { Component, Input, OnInit } from '@angular/core';
import { Service } from '@shared/models/service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {
  private defaultImage = '/assets/defaultServiceImage.png';
  @Input() service: Service;

  constructor() {}

  ngOnInit() {
    if (!this.service.image) {
      this.service.image = this.defaultImage;
    }
  }
}
