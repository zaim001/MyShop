import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartCustomerService } from '../shared/service/CustomerServices/cart-customer.service';
import { Cart } from '../models/cart';
import { CartComponent } from "./cart/cart.component";
import { SuccessComponent } from './success/success.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule, CustomerComponent, CartComponent,SuccessComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent{
 
}
