import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { arrProduct, arrProduct3, product } from 'src/app/classes/product';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  products:Array<any>=[]
  total:number
  
  constructor(private shoppingServ:ShoppingListService ,private router:Router) { }

  ngOnInit(): void {
    this.products = this.shoppingServ.shoppingList
    this.total = this.shoppingServ.total
  }

  deleteFromShoppingList(prod:arrProduct3 ){
    const index =  this.shoppingServ.shoppingList.indexOf(prod);
    if (index !== -1) {
      this.shoppingServ.shoppingList.splice(index, 1);
      this.total = this.total-Number(prod.item)*prod.price
      this.total=Number((Math.round(this.total * 100) / 100).toFixed(3));
    }
  }
  up(prod:arrProduct3 , num:any){
    prod.item = num;
  }

  continue(){
    this.router.navigate(['branches'])
  }

  updateCount(value:number,product:any){
    product.item+=value;
    this.total += value*product.price ;
    this.total=Number((Math.round(this.total * 100) / 100).toFixed(3));
  }
}
