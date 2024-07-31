import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartCustomerService } from '../shared/service/CustomerServices/cart-customer.service';
import { Cart } from '../models/cart';
import { CartComponent } from "./cart/cart.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule, CustomerComponent, CartComponent],
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

 removeProductFromCart(productId : number){
  this.cartService.deleteProductCart(productId).subscribe(
    () => this.getProductsCart()
  )
}


 
}
