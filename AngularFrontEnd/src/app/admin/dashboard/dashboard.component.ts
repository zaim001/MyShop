import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { RouterModule } from '@angular/router';

import { AdminFaqComponent } from '../admin-faq/admin-faq.component';

import { Faq } from '../../models/faq';
import { ProductService } from '../../shared/service/AdminServices/product.service';
import { CategoryService } from '../../shared/service/AdminServices/category.service';
import { FaqService } from '../../shared/service/AdminServices/faq.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoriesComponent,ProductsComponent,AdminFaqComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  products: Product[] = [];
  categories: Category[] = [];
  faqs: Faq[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private faqService : FaqService) {}


  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
    this.loadFaqs()
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      // Map category names to products
      this.products = this.products.map(product => ({
        ...product,
        categoryname: this.getCategoryName(product.categoryId)
      }));
    });
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  loadFaqs(){
    this.faqService.getFaqs().subscribe(data => {
      this.faqs = data;
    });
  }
  OnDeleteCategory(id : number){
    this.categoryService.deleteCategory(id).subscribe(
      () => {this.loadCategories()},
    )
  }
  OnDeleteProduct(id : number){
    this.productService.deleteProduct(id).subscribe(
      () => {this.loadProducts()},
    )
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
}
