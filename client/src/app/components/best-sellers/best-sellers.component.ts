import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css']
})
export class BestSellersComponent implements OnInit {

products:Array<any>=[]


constructor(private productServ:ProductsService) { }
  ngOnInit(): void {
    this.productServ.getProductsPopular().subscribe(res=>{
      this.products=res
    })
   }
}
