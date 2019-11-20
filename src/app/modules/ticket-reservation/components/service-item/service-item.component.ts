import { AddButtonStates } from '@shared/enums/addButtonStates';
import { ServiceOrder } from '@shared/models/serviceOrder';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Service } from '@shared/models/service';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {
  private defaultImage = '/assets/defaultServiceImage.png';

  @Input() service: Service;
  @Input() set inCart(value: boolean) {
    if (!value) {
      this.amount = 0;
      this.state = AddButtonStates.Add;
    }
  }
  @Output() serviceAdd = new EventEmitter<ServiceOrder>();
  amount: number;
  state: AddButtonStates = AddButtonStates.Add;

  constructor() {}

  ngOnInit() {
    if (!this.service.image) {
      this.service.image = this.defaultImage;
    }
  }

  addService() {
    this.serviceAdd.emit({ service: this.service, amount: this.amount });
    this.state =
      this.amount === 0 ? AddButtonStates.Add : AddButtonStates.Change;
  }
}
