import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartCustomerService } from '../../shared/service/CustomerServices/cart-customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  @Input() cart: Cart | undefined;
  @Output() removeProductFromCart = new EventEmitter<number>();

  onRemoveProduct(productId: number) {
    this.removeProductFromCart.emit(productId);
  }

}




