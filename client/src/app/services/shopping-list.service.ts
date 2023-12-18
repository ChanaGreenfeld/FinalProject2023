import { Injectable } from '@angular/core';
import { arrProduct3 } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  addtoShoppingList:boolean=true;

  shoppingList:Array<arrProduct3>=[];
  total:number =0
  constructor(private httpClient:HttpClient) { }

  productIsTrue(id:string):Observable<any>{
    return this.httpClient.get<any>(`${environment.userUrl}/productIsTrue/${id}`).pipe(tap(res=>{
      this.addtoShoppingList=res
    }))
  }
}
