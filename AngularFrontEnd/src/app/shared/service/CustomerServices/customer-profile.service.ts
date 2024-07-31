import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService {

  apiUrl = "http://localhost:8081/api/customer"
  constructor(private http : HttpClient) { }

  getProfile() : Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/profile`)
  }
}
