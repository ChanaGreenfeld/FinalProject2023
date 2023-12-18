import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { arrProduct3 } from 'src/app/classes/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UsersService } from 'src/app/services/users.service';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any = null
  showpopUp:boolean=false
  @Input() isSale: boolean 


  openProductDetails() {
    this.router.navigate(['productDetails'], { queryParams: { id: this.product._id } })
  }


  constructor(private productServ:ProductsService ,private _snackBar: MatSnackBar, private router: Router,private shoppingListServ:ShoppingListService,
    private userServ:UsersService) {}

    addToshopping(e:any,product:arrProduct3){

      e.stopPropagation();
    if(this.userServ.currentUser){
      product.item=1
      this.shoppingListServ.shoppingList.push(product)
      this.shoppingListServ.total += product.price
      this._snackBar.open('מוצר נוסף בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
    }
    else{
      this.router.navigate(['login'])
    }
  }

}
