import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductVisitorService } from '../../shared/service/VisitorServices/product-visitor.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryVisitorService } from '../../shared/service/VisitorServices/category-visitor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  products : Product[] = [];
  categories : Category[] = [];
  product : Product | undefined;

  constructor(private productService : ProductVisitorService, private route: ActivatedRoute,private categoryService: CategoryVisitorService){}

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
