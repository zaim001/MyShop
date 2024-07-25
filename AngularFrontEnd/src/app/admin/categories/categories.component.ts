import { Component, Input, OnInit} from '@angular/core';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin.component';

import { CommonModule } from '@angular/common';
import { CategoryService } from '../../shared/service/AdminServices/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  categories: Category[] = [];
  editingCat: number | null = null;


  constructor(private categoryService : CategoryService){}


  newCategory: Category = {
    name : '',
    description : '',
    cat_image :'',
  };
  
  ngOnInit(){
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
 
  onAddCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe(() => {
      this.loadCategories();
      this.newCategory = {
        name : '',
        description : '',
        cat_image :'',
      }
     
    });
  }
  OnDeleteCategory(id: number){
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.loadCategories();
      }
    )
  }

  startEditing(id: number): void {
    this.editingCat = id;
  }

  OnUpdateCategory(category: Category){
    if(category.id){
      this.categoryService.updateCategory(category.id, category).subscribe({
        next: (updatedCat) => {
          const index = this.categories.findIndex(c => c.id === updatedCat.id);
          if (index !== -1) {
            this.categories[index] = updatedCat;
          }
          this.editingCat = null;
        },
        error: (error) => {
          console.error('Error updating Category:', error);
          // Optionally, you can show an error message to the user
        }
      });
    }
  }


}
