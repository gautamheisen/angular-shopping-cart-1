import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-subtotal',
  templateUrl: './subtotal.component.html',
  styleUrls: ['./subtotal.component.scss']
})
export class SubtotalComponent implements OnInit {

  count : any;
  subTotal : any;
  count$: Observable<number> | undefined;
  subTotal$: Observable<number> | undefined;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    // this.subTotal$ = this.shoppingCartService.getSubTotal();
    // this.count$ = this.shoppingCartService.getCount();
    this.shoppingCartService.count.subscribe(data=>{
      this.count= data;
     
    })
    this.shoppingCartService.total.subscribe(data=>{
      this.subTotal= data;
     
    })
   
  }

}
