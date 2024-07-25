import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../search-input/search-input.component';
import { ProductService } from '../../shared/service/AdminServices/product.service';
import { CategoryService } from '../../shared/service/AdminServices/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule,SearchInputComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  categories: Category[] = [];
  editingProduct: number | null = null;


  constructor(private productService :ProductService, private categoryService:CategoryService){  }

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    rating: 0,
    product_image: '',
    categoryId: 0,
    categoryname: ''
  };

    ngOnInit(){
      this.loadProducts()
      this.loadCategories();
    }

    onAddProduct() {
      this.productService.createProduct(this.newProduct).subscribe(() => {
        this.loadProducts()
        this.resetNewProduct()
      });
    }

    resetNewProduct() {
      this.newProduct = {
        name: '',
        description: '',
        price: 0,
        rating: 0,
        product_image: '',
        categoryId: 0,
        categoryname: ''
      };
    }
  
    loadCategories() {
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
      });
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

    OnDeleteProduct(id : number){
      this.productService.deleteProduct(id).subscribe(
        () => { console.log("Product Deleted Successfully"); this.loadProducts()},
        error => { console.error("Deleting Product Has Failed", error)}
      )
    }
    startEditing(id: number): void {
      this.editingProduct = id;
    }
  
    OnUpdateProduct(product: Product): void {
      if(product.id != null){
        this.productService.updateProduct(product.id, product).subscribe({
          next: (updatedProduct) => {
            const index = this.products.findIndex(c => c.id === updatedProduct.id);
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            this.editingProduct = null;
          },
          error: (error) => {
            console.error('Error updating Product:', error);
            // Optionally, you can show an error message to the user
          }
        });
      }
    }
   

}
