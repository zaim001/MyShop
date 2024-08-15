import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from '../../models/cart';
import { CartCustomerService } from '../../shared/service/CustomerServices/cart-customer.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../shared/service/CustomerServices/order.service';
import { Order } from '../../models/order';
import { StripeService } from '../../shared/service/CustomerServices/stripe.service';
import { Product } from '../../models/product';

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
  orders : Order[] = [];
  products : Product[] = [];
  stripeError: string | null = null;


  constructor(private cartService:CartCustomerService,private orderService : OrderService, private stripeService : StripeService){}
 

  ngOnInit() {
    this.getProductsCart();
    
 }
 getProductsCart(){
   this.cartService.getCart().subscribe((cart) => {
     this.cart = cart;
   });
 }
 totalCartPrice(): number {
  return this.cart?.products.reduce((sum, product) => sum + product.price, 0) || 0;
}

 removeProductFromCart(productId : number){
  this.cartService.deleteProductCart(productId).subscribe(
    () => this.getProductsCart()
  )
}
async placeOrder(event: Event): Promise<void> {
  event.preventDefault(); // Prevent default form submission

  try {
    const paymentMethod = await this.stripeService.createPaymentMethod();
    if (paymentMethod) {
      this.orderService.checkout(paymentMethod.id).subscribe(
        () => {
          this.getProductsCart();
          window.location.href = 'customer/success'; 
        },
        (error) => {
          console.error('Error placing order', error);
          this.stripeError = 'Payment failed. Please try again.';
        }
      );
    } else {
      this.stripeError = 'Failed to create payment method.';
    }
  } catch (error) {
    console.error('Error creating payment method', error);
    this.stripeError = 'Payment failed. Please try again.';
  }
}

}




