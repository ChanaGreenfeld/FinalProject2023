import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css']
})
export class NewProductsComponent {
  products: Array<any>=[]

  constructor(private productServ:ProductsService) {  }
  ngOnInit():void{
    this.productServ.getProductsByDate().subscribe(res=>{
      this.products=res
    })
  }

}
