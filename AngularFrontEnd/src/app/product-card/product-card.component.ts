import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product! : Product;

  get fullStars(): number[] {
    return Array(Math.floor(this.product.rating)).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.product.rating % 1 !== 0;
  }

  get starCount(): number {
    return Math.floor(this.product.rating) + (this.hasHalfStar ? 1 : 0);
  }
}
