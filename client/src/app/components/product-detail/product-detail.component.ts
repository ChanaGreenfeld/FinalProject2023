import { Location } from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { arrProduct, arrProduct3 } from 'src/app/classes/product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  producta:arrProduct3

  constructor(private route: ActivatedRoute,private prodServ : ProductsService ,private _snackBar: MatSnackBar,    private router: Router,
    private shoppingListServ:ShoppingListService,
    private userServ:UsersService) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.prodServ.getProductById(id).subscribe(res=>{
       this.producta=res[0];
      })     
    });
  }

  addToshopping(){
    if(this.userServ.currentUser){
      const index =  this.shoppingListServ.shoppingList.indexOf(this.producta);
      if(index==-1){
        this.producta.item=1
         this.shoppingListServ.shoppingList.push(this.producta)
        
      }
      else{
        this.shoppingListServ.shoppingList[index].item=this.shoppingListServ.shoppingList[index].item+1;
      }
      this.shoppingListServ.total += this.producta.price
      this._snackBar.open('מוצר נוסף בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });    }
    else{
      this.router.navigate(['login'])
    }
  }

}
