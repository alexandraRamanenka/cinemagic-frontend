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
  @Input() service: Service;
  @Input() set inCart(order: ServiceOrder) {
    if (!order) {
      this.amount = 0;
      this.state = AddButtonStates.Add;
    } else {
      this.amount = order.amount;
      this.state = AddButtonStates.Change;
    }
  }
  @Output() serviceAdd = new EventEmitter<ServiceOrder>();

  get buttonState(): AddButtonStates {
    return this.state;
  }

  AddButtonStates = AddButtonStates;
  amount: number;

  private defaultImage = '/assets/defaultServiceImage.png';
  private state: AddButtonStates = AddButtonStates.Add;

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
