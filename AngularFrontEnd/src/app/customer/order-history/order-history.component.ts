import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/service/CustomerServices/order.service';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';



@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {

  orders: Order[] = [];
  showModal : boolean = false;
  product : Product[] = [];
  selectedOrder: Order | null = null;


  constructor(private orderService : OrderService){}

  ngOnInit() {
    this.getOrders()
  }

  getOrders(){
    this.orderService.getOrders().subscribe(
      (orders) => {this.orders = orders}
    )
  }


  openModal(order: Order) {
    this.selectedOrder = order;
    this.showModal = true;
    console.log('Selected Order:', JSON.stringify(this.selectedOrder.items, null, 2));
  }
  closeModal(){
    this.showModal = false;
  }
  

}
