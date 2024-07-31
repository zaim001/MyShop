import { Component } from '@angular/core';
import { HeroComponent } from '../pages/hero/hero.component';
import { CatListComponent } from '../pages/cat-list/cat-list.component';
import { TopSellersComponent } from '../product/top-sellers/top-sellers.component';
import { InfosComponent } from '../pages/infos/infos.component';
import { FaqComponent } from '../pages/faq/faq.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,CatListComponent,InfosComponent,TopSellersComponent,FaqComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
