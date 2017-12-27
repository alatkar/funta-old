import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) { }

  /*
  getCategories() {
    return this.db.list('/categories', ref=> {
        let q = ref.orderByChild('name');
        return q;
    });
  }*/

  public getCategories() {
    return this.db
      .list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }
}
