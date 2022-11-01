import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {

  count$: Observable<number> | undefined;
  count: any;
 
  constructor(
    private shoppingCartService: ShoppingCartService,
    
  ) { }

  ngOnInit() {
    //this.count$ = this.shoppingCartService.getCount();
    this.shoppingCartService.count.subscribe(data=>{
      this.count= data;
     
    })
    
  }

}
