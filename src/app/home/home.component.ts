import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CatListComponent } from '../cat-list/cat-list.component';
import { TopSellersComponent } from '../top-sellers/top-sellers.component';
import { InfosComponent } from '../infos/infos.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,CatListComponent,InfosComponent,TopSellersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
