import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

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
export class FaqComponent {

  accordionGroups: AccordionGroup[] = [
    {
      title: 'What services does TanahAir Offer?',
      content: 'TanahAir offers a service for creating a website design, illustration, icon set, website development, animation and digital marketing.',
      expanded: true
    },
    {
      title: 'How does TanahAir create website content without knowing our Business plan?',
      content: 'TanahAir will schedule interviews with customers who have used our services and discuss business about the product and help solve the problem so that it becomes the best solution.',
      expanded: false
    },
    {
      title: 'What often will results be reported?',
      content: 'We will report each section that has been done, such as Flow, wireframe for each category, then full wireframe until it becomes a complete design and we will report the development of the website approximately every 1 week.',
      expanded: false
    },
    {
      title: 'Why should I choose a Design studio like TanahAir over a full-service agency?',
      content: 'Because TanahAir provides the best service to customers and provides flexibility to solve problems with our experts so that customers get satisfaction. And we provide service very quickly according to the price we offer.',
      expanded: false
    },
    {
      title: 'What will be delivered? And When?',
      content: 'What will be given is a design and development to become a website for that time depending on the difficulties the client gives us. However, the track record we have done to create a website design and development will take about 1 month.',
      expanded: false
    },
    {
      title: 'How quickly will I start seeing results after working with TanahAir?',
      content: 'About 1 week there will be results that we give to clients. Because after the client makes payments we will begin to share a task with our workers and do the work as quickly as possible.',
      expanded: false
    }
  ];

  toggleAccordion(index: number): void {
    this.accordionGroups[index].expanded = !this.accordionGroups[index].expanded;
  }
 
}
