import { Observable } from 'rxjs/Observable';
import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({dateCreated: new Date().getTime()});
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().map(x => new ShoppingCart(x.payload.val().items));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    // tslint:disable-next-line:curly
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    console.log('ShoppingCartService:getOrCreateCartId => ', result);
    return result.key;
  }

  async addToCart(product: Product) {
    this.UpdateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.UpdateItemQuantity(product, -1);
  }

  private async UpdateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);

    item$.snapshotChanges().take(1).subscribe(item => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + change});
      } else {
        console.log('ShoppingCartService:UpdateItemQuantity => ', product);
        item$.update({product: {
          // $key is reserved word and we have to use it when it is loaded
          key: product.$key,
          title: product.title,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
        }, quantity: 1});
      }
    });

  }
}
