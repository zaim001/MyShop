import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SearchInputComponent } from '../search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { ProductVisitorService } from '../shared/service/VisitorServices/product-visitor.service';
import { CategoryVisitorService } from '../shared/service/VisitorServices/category-visitor.service';
import { CartCustomerService } from '../shared/service/CustomerServices/cart-customer.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [FormsModule,CommonModule,ProductCardComponent,SearchInputComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent{
  products: Product[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedPriceFilter: string = 'all';
  product: Product | undefined;
  
 

  constructor(
    private productService: ProductVisitorService,
    private categoryService: CategoryVisitorService,
    private cartService: CartCustomerService,
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.filterProducts()
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      //.map(product => ({
      //   ...product,
      //   categoryname: this.getCategoryName(product.categoryId)
      // }));
      this.filterProducts();
      
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterProducts();
  }

  filterProducts() {
    //filter by search term
    let filtered = this.searchTerm
    ? this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    : [...this.products];

    //filter by price
    if (this.selectedPriceFilter === 'lowToHigh') {
    filtered.sort((a, b) => a.price - b.price);
    } 
    else if (this.selectedPriceFilter !== 'all') {
    const [min, max] = this.selectedPriceFilter.split('-').map(Number);
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    this.filteredProducts = filtered;
}
 

  isCategoryCollapsed = false;
  isBrandingCollapsed = false;
  isFilterPriceCollapsed = false;

  toggleCategoryCollapse() {
    this.isCategoryCollapsed = !this.isCategoryCollapsed;
  }
  toggleBrandingCollapse() {
    this.isBrandingCollapsed = !this.isBrandingCollapsed;
  }
  toggleFilterPriceCollapse() {
    this.isFilterPriceCollapsed = !this.isFilterPriceCollapsed;
  }

}
