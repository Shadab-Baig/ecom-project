import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartData:cart[]|undefined;
  priceSummary:priceSummary = {
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
}

  constructor(private product:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;
      let price =0;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+ (+item.price* + item.quantity);
        }
      })
      console.warn(price)
      this.priceSummary.price=price      
      this.priceSummary.discount = price/10;      
      this.priceSummary.tax = price/10;      
      this.priceSummary.delivery = 100;      
      this.priceSummary.total=price+(price/10)+100-(price/10);
      console.warn(this.priceSummary);
    });
  }

  checkout(){
    this.router.navigate(['checkout']);
  }

}
