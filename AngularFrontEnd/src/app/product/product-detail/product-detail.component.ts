import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductVisitorService } from '../../shared/service/VisitorServices/product-visitor.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryVisitorService } from '../../shared/service/VisitorServices/category-visitor.service';
import { CommonModule } from '@angular/common';
import { CartCustomerService } from '../../shared/service/CustomerServices/cart-customer.service';
import { Cart } from '../../models/cart';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  cart : Cart | undefined;
  products : Product[] = [];
  categories : Category[] = [];
  product : Product | undefined;

  constructor(private productService : ProductVisitorService, private route: ActivatedRoute,private categoryService: CategoryVisitorService,private cartService : CartCustomerService,private keycloakService : KeycloakService){}

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(id);
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      product => {
        this.product = product;
        this.product.categoryname = this.getCategoryName(product.categoryId);
        });
      }
      addProductToCart(){
        if(typeof(this.product) != "undefined" && this.hasRole('customer')){
          this.cartService.addToCart(this.product).subscribe(
            (data) => {this.cart = data
              alert("Product Added Successfully");
            },
          )
        }
        else if (!this.hasRole('customer')) { alert("You have to login to add product to your cart")}
      }
      hasRole(role: string): boolean {
        return this.keycloakService.getUserRoles().includes(role);
      }
  
      getCategoryName(categoryId: number): string {
        const category = this.categories.find(c => c.id === categoryId);
        return category ? category.name : 'Unknown';
      }
      
      get fullStars(): number[] {
        if(typeof(this.product) != 'undefined'){
          return Array(Math.floor(this.product.rating)).fill(0);
        }
        else {
          return [];
        }
       
      }
      get hasHalfStar(): boolean {
        if(typeof(this.product) != 'undefined'){
        return this.product.rating % 1 !== 0;
        }
        else {
          return false;
        }
      }
    
      get starCount(): number {
        if(typeof(this.product) != 'undefined'){
        return Math.floor(this.product.rating) + (this.hasHalfStar ? 1 : 0);
      }
      else {
        return 0;
      }

    }

}
