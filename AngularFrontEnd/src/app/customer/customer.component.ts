import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartCustomerService } from '../shared/service/CustomerServices/cart-customer.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  cart: Cart | undefined;

  constructor(private cartService:CartCustomerService){}

  ngOnInit(): void {
    this.getProductsCart();
    
 }
 getProductsCart(){
   this.cartService.getCart().subscribe((cart) => {
     this.cart = cart;
   });
 }
}
