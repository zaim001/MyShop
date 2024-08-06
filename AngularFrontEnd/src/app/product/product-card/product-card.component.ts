import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Cart } from '../../models/cart';
import { CartCustomerService } from '../../shared/service/CustomerServices/cart-customer.service';
import { KeycloakService } from 'keycloak-angular';

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
  showModal : boolean = false
 
 

  constructor(private cartService: CartCustomerService,private keycloakService: KeycloakService){}

 
  addProductToCart(){
    if(typeof(this.product) != "undefined" && this.hasRole('customer')){
      this.cartService.addToCart(this.product).subscribe(
        (data) => {this.cart = data
          this.showModal = true;},
      )
    }
    else if (!this.hasRole('customer')) { alert("You have to login to add product to your cart")}
  }
  hasRole(role: string): boolean {
    return this.keycloakService.getUserRoles().includes(role);
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
  closeModal(){
    this.showModal = false;
  }
}
