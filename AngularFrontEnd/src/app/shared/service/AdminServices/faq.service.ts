import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../../../models/faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http : HttpClient) { }

  getFaqs() : Observable<Faq[]>{
    return this.http.get<Faq[]>('http://localhost:8081/api/admin/faqs');
  }

  createFaq(faq : Faq) : Observable<Faq>{
    return this.http.post<Faq>('http://localhost:8081/api/admin/faq', faq)
  }
  deletFaq(id: number) : Observable<void>{
    return this.http.delete<void>(`http://localhost:8081/api/admin/faqs/${id}`)
  }
  updateFaq(id: number, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`http://localhost:8081/api/admin/faqs/${id}`, faq);
  }
}
