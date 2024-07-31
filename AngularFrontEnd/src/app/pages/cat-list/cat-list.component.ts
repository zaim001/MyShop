import { Component, OnInit } from '@angular/core';
import { CategoryVisitorService } from '../../shared/service/VisitorServices/category-visitor.service';
import { Category } from '../../models/category';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss'
})
export class CatListComponent implements OnInit {

  categories : Category[] = [];

  constructor(private categoryService : CategoryVisitorService){}
  ngOnInit(): void {
   this.getMonthCategories();
  }

  getMonthCategories(){
    this.categoryService.getAllCategories().subscribe(
      (categories) => this.categories = categories.slice(0, 3)
    )
  }
}
