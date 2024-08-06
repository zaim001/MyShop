import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order';
import { HttpClient } from '@angular/common/http';
import { StripeService } from './stripe.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8081/api/customer';

  constructor(private http: HttpClient, private stripeService: StripeService) {}

  checkout(paymentMethodId: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/checkout`, { paymentMethodId });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/history`);
  }

  
}
