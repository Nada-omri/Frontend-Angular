import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

import { BuyerOrder } from '../shared/models/BuyerOrder';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders!: BuyerOrder[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  showMe1: number = -1;
  showMe2: string | null = null;

  toggleTag1(rowIndex: number) {
    this.showMe1 = this.showMe1 === rowIndex ? -1 : rowIndex;
    this.showMe2 = null; // Reset showMe2 when toggling the main section
  }

  toggleTag2(rowIndex: number, subRowIndex: number) {
    const indexString = `${rowIndex}-${subRowIndex}`;
    this.showMe2 = this.showMe2 === indexString ? null : indexString;
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
        console.log('success');
      },
      error: (error: any) => {
        console.log('ERROR');
      }
    });
  }
}
