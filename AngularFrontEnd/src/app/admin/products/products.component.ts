import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { ProductServiceService } from '../../shared/service/AdminServices/product-service.service';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin.component';
import { CategoryServiceService } from '../../shared/service/AdminServices/category-service.service';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '../../search-input/search-input.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,CommonModule,SearchInputComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  @Input() products: Product[] = [];
  @Input() categories: Category[] = [];
  editingProduct: number | null = null;
  filteredProducts: Product[] = [];
  searchTerm: string = '';


  constructor(private productService :ProductServiceService, private categoryService:CategoryServiceService){  }

  newProduct: Product = {
    name: '',
    description: '',
    price: 0,
    rating: 0,
    product_image: '',
    categoryId: 0,
    categoryname: '',
   
  };

    ngOnInit(){
      this.loadCategories();
      this.loadProducts()
    }

    onAddProduct() {
      this.productService.createProduct(this.newProduct).subscribe(() => {
        this.loadProducts()
        this. newProduct = {
          name: '',
          description: '',
          price: 0,
          rating: 0,
          product_image: '',
          categoryId: 0,
          categoryname: '',
        }
      });
    }

      
    loadCategories() {
      this.categoryService.getCategories().subscribe(data => {
        this.categories = data;
      });
    }
    
    loadProducts() {
      this.productService.getProducts().subscribe(data => {
        this.products = data;
        this.filterProducts();
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
    onSearch(searchTerm: string) {
      this.searchTerm = searchTerm;
      this.filterProducts();
    }
  
    filterProducts() {
      if (this.searchTerm) {
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredProducts = [...this.products];
      }
    }

}
