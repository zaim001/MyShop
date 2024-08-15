import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductVisitorService {

   apiUrl = "http://localhost:8081/api/visitor";

  constructor(private http :HttpClient) { }

  getAllProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products`)
  }
  getProductById(id : number) : Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
  }
  searchProduct(title : string): Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8081/api/visitor/search/${title}`);
  }
}
