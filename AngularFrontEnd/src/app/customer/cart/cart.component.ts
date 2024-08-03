import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartCustomerService } from '../../shared/service/CustomerServices/cart-customer.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/service/CustomerServices/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cart: Cart | undefined;
  order: Order | undefined;

  constructor(private cartService:CartCustomerService,private orderService : OrderService){}
 

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
placeOrder(): void {
  this.orderService.checkout().subscribe(
    (order) => {
      this.order = order;
      this.getProductsCart(); // Refresh the cart after placing order
    },
    (error) => {
      console.error('Error placing order', error);
      // Handle error (e.g., show an error message)
    }
  );
}

}




