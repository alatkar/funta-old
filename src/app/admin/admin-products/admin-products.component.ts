import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: {title: string}[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productsService: ProductService) {
    this.subscription = this.productsService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
