import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({dateCreated: new Date().getTime()});
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/'+ cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);        
    console.log(result);
    return result.key;
  }

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.snapshotChanges().take(1).subscribe(item => {
      if(item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + 1});    
      } else {
        console.log(product);
        item$.update({product: {
          //$key is reserved word and we have to use it when it is loaded
          key: product.$key,
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
        }, quantity:1});
      }

    });
  }
}
