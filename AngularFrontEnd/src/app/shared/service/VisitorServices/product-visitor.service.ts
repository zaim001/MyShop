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
}
