import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../models/cart';
import { CartCustomerService } from '../shared/service/CustomerServices/cart-customer.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product! : Product;
  cart: Cart | null = null;

  constructor(private cartService: CartCustomerService){}

  addProductToCart(){
    if(typeof(this.product) != "undefined"){
      this.cartService.addToCart(this.product).subscribe(
        (data) => {this.cart = data},
      )
    }
  }

  get fullStars(): number[] {
    return Array(Math.floor(this.product.rating)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.product.rating % 1 !== 0;
  }

  get starCount(): number {
    return Math.floor(this.product.rating) + (this.hasHalfStar ? 1 : 0);
  }
}
