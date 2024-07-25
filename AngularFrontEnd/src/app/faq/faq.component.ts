import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';

import { Faq } from '../models/faq';
import { FaqVisitorService } from '../shared/service/VisitorServices/faq-visitor.service';



@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {

  constructor(private faqService : FaqVisitorService){
    
  }

  faqs : Faq[] = [];


  loadFaqs(){
    this.faqService.getAllFaqs().subscribe(data => {
      this.faqs = data.map((faq,index) => ({ ...faq, expanded: index === 0 }));
    });
  }

  ngOnInit(): void {
    this.loadFaqs();
  }


  toggleAccordion(index: number): void {
    this.faqs[index].expanded = !this.faqs[index].expanded;
  }
 
}
