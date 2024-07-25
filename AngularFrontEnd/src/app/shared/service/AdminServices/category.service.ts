import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8081/api/admin/cats');
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8081/api/admin/category', category);
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/admin/cats/${id}`);
  }
  updateCategory(id: number, cat: Category): Observable<Category> {
    return this.http.put<Category>(`http://localhost:8081/api/admin/cats/${id}`, cat);
  }

}
