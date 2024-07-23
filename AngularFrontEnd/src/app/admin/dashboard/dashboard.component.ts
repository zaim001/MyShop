import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { RouterModule } from '@angular/router';
import { ProductServiceService } from '../../shared/service/AdminServices/product-service.service';
import { CategoryServiceService } from '../../shared/service/AdminServices/category-service.service';
import { AdminFaqComponent } from '../admin-faq/admin-faq.component';
import { FaqServiceService } from '../../shared/service/AdminServices/faq-service.service';
import { Faq } from '../../models/faq';


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

  constructor(private productService: ProductServiceService, private categoryService: CategoryServiceService, private faqService : FaqServiceService) {}


  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
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
      console.log("products : ", this.products);
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
      () => { console.log("Deleted Category Successfully"); this.loadCategories()},
      error => { console.error("Deleting Category Has Failed", error)}
    )
  }
  OnDeleteProduct(id : number){
    this.productService.deleteProduct(id).subscribe(
      () => { console.log("Product Deleted Successfully"); this.loadProducts()},
      error => { console.error("Deleting Product Has Failed", error)}
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
