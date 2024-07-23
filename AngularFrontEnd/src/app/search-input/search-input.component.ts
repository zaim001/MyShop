import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../models/product';
import { ProductServiceService } from '../shared/service/AdminServices/product-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {


  constructor(private productService: ProductServiceService) {}

  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.search.emit(this.searchTerm);
  }

}
