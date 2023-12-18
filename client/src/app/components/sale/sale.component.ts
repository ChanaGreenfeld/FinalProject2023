import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { arrProduct, arrProduct3 } from 'src/app/classes/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit{
  products:Array<any>=[]

  constructor(private productServ:ProductsService , private router: Router,private shoppingListServ:ShoppingListService,
    private userServ:UsersService) {}
  ngOnInit(): void {
    this.productServ.getProductsBySale().subscribe(res=>{
      this.products=res;
    });
  }

}
