import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Faq } from '../../models/faq';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaqService } from '../../shared/service/AdminServices/faq.service';

@Component({
  selector: 'app-admin-faq',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-faq.component.html',
  styleUrl: './admin-faq.component.scss'
})
export class AdminFaqComponent implements OnInit {
  
  faqs : Faq[] = [];
  editingFaq: number | null = null;


  constructor(private faqService : FaqService){}
    
  ngOnInit(){
    this.loadFaqs();
  }
  

  loadFaqs(){
    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data;
    });
  }
 

  newFaq: Faq = {
    question : '',
    answer :'',
    expanded : true
  };

  onAddFaq() {
    this.faqService.createFaq(this.newFaq).subscribe(() => {
      this.loadFaqs();
      this.newFaq = {
        question : '',
        answer :'',
        expanded : true
      }
     
    });
  }

  OnDeleteFaq(id : number){
    this.faqService.deletFaq(id).subscribe(
      () => {
        console.log('FAQ deleted successfully');
        this.loadFaqs();
      },
      error => {
        console.error('Error deleting FAQ:', error);
      }
    )
  }
  startEditing(id: number): void {
    this.editingFaq = id;
  }

  OnUpdateFaq(faq: Faq): void {
    if(faq.id){
      this.faqService.updateFaq(faq.id, faq).subscribe({
        next: (updatedFaq) => {
          const index = this.faqs.findIndex(f => f.id === updatedFaq.id);
          if (index !== -1) {
            this.faqs[index] = updatedFaq;
          }
          this.editingFaq = null;
        },
        error: (error) => {
          console.error('Error updating FAQ:', error);
          // Optionally, you can show an error message to the user
        }
      });
    }
  }
  }



