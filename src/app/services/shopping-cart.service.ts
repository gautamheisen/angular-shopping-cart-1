import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Item, ShoppingCart } from '../models';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCart$: BehaviorSubject<ShoppingCart>;
  public count = new BehaviorSubject<any>(0);
  public total = new BehaviorSubject<any>(0);

  constructor(
    private httpClient: HttpClient
  ) {
   
     // Initialize shopping cart with default value
    this.shoppingCart$ = new BehaviorSubject<ShoppingCart>({ id: '', items: [], subTotal: 0 });

    // Load shopping cart data
    this.getShoppingCart(); 
  }

  private getShoppingCart() {
    this.httpClient.get<ShoppingCart>('/assets/data.json').subscribe((shoppingCart) => {
      this.setShoppingCart(shoppingCart);
    },
    () => {
      console.error('Shopping cart data could not be loaded.');
    });
  }

  private setShoppingCart(shoppingCart: ShoppingCart) {
    this.shoppingCart$.next(shoppingCart);
    this.getCount().subscribe(data=>{this.count.next(data)});
    this.getSubTotal().subscribe(data=>{this.total.next(data)});
  }

  getItems(): Observable<Item[]> {
    return this.shoppingCart$.pipe(
      pluck('items')
    );
  }

  getSubTotal(): Observable<number> {
    return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const subTotal = shoppingCart?.items
          .map((item) => item.quantity * item.sku.price)
          .reduce((p, c) => p + c, 0);
         
        return subTotal;
      })
    );
  }

  // getCount(): any {
  //   this.count.next(2);
  //   console.log(this.shoppingCart$)
  //    this.shoppingCart$.pipe(
  //     map((shoppingCart) => {
  //       const count = shoppingCart.items
  //         .map((item) => item.quantity)
  //         .reduce((p, c) => p + c, 0);
          
  //         console.log(count)
  //      //  count;
  //     })
  //   );
  // }

  getCount(): Observable<number> {
    return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const count = shoppingCart.items
          .map((item) => item.quantity)
          .reduce((p, c) => p + c, 0);
        return count;
      })
    );
  }

  updateQuantity(updateQuantity: number, updateItem: Item) {
    const shoppingCart = { ...this.shoppingCart$.value };
    shoppingCart.items = shoppingCart.items.map((item) => {
      item.quantity = item.id === updateItem.id ? +updateQuantity : item.quantity;
      return item;
    });
    this.setShoppingCart(shoppingCart);
  }

  deleteItem(deleteItem: Item) {
    const shoppingCart = { ...this.shoppingCart$.value };
    shoppingCart.items = shoppingCart.items.filter((item) => deleteItem.id !== item.id);
    this.setShoppingCart(shoppingCart);
  }

}
