import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FaqServiceService } from '../shared/service/AdminServices/faq-service.service';
import { Faq } from '../models/faq';
import { FaqVisitorService } from '../shared/service/VisitorServices/faq-visitor.service';

interface AccordionGroup {
  title: string;
  content: string;
  expanded: boolean;
}

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
