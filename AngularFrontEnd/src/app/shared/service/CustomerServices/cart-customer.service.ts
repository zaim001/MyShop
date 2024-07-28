import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../../../models/cart';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartCustomerService {

  apiUrl = "http://localhost:8081/api/customer";
  constructor(private http : HttpClient) { }

  getCart() : Observable<Cart>{
    return this.http.get<Cart>(`${this.apiUrl}/cart`)
  }
  addToCart(product: Product): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/addtocart`, product);
  }
  deleteProductCart(productId: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${productId}`);
  }
}
