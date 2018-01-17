import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.shoppingCartService.addToCart(product);    
  }
}
