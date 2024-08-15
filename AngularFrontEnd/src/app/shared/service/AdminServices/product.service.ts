import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8081/api/admin/products');
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8081/api/admin/product', product);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/admin/products/${id}`);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8081/api/admin/products/${id}`, product);
  }

  
}
