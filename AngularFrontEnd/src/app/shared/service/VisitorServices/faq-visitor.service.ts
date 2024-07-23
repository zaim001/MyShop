import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../../../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqVisitorService {

  constructor(private http: HttpClient) { }

  getAllFaqs() : Observable<Faq[]>{
    return this.http.get<Faq[]>("http://localhost:8081/api/visitor/faqs")
  }
}
