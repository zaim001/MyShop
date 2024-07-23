import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryVisitorService {

  apiUrl = "http://localhost:8081/api/visitor";

  constructor(private http :HttpClient) { }

  getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}/categories`)
  }
}
