import { Component, OnInit } from '@angular/core';
import { ProductVisitorService } from '../../shared/service/VisitorServices/product-visitor.service';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-sellers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-sellers.component.html',
  styleUrl: './top-sellers.component.scss'
})
export class TopSellersComponent implements OnInit {

  products : Product [] = [];

  constructor(private productService : ProductVisitorService){}
  ngOnInit(){
    this.topMonthSellers();
  }

  topMonthSellers() {
    this.productService.getAllProducts().subscribe(
      (products) => {  this.products = products.slice(0,4); }
    )};

  }

