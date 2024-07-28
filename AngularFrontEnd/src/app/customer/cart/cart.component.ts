import { Component, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit{

  cart: Cart | undefined;

  constructor(private cartService: CartCustomerService) { }

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




