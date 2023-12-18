import { Component, OnInit } from '@angular/core';
import { branch } from 'src/app/classes/branch';
import { arrProduct3 } from 'src/app/classes/product';
import { BranchesService } from 'src/app/services/branches.service';
import { ProductsService } from 'src/app/services/products.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { UsersService } from 'src/app/services/users.service';
import {  ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  currentUser:any
  shoppingList:Array<arrProduct3>=[]
  currentBranch:branch;
  total:number=0
  
  paymentForm = new FormGroup({
    bank: new FormControl('', [Validators.required, Validators.minLength(4)]),
    num: new FormControl('', [Validators.required, Validators.minLength(16),Validators.maxLength(16)]),
    tokef: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]),
    num3: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(3)]),
  });


  constructor(  private router:Router , private branchSer : BranchesService, private route: ActivatedRoute, private sendServ:SendmailService,
    private shoppingListServ:ShoppingListService, 
    private userServ:UsersService) {}

  ngOnInit(): void {
    this.currentBranch = this.branchSer.currentBranch ;
    this.total = this.shoppingListServ.total ;
    this.shoppingList = this.shoppingListServ.shoppingList ;
    this.currentUser = this.userServ.currentUser

  }

  payment(event:any){
    this.route.queryParams.subscribe((params) => {
      const from = params['from']
    if(from=='sh'){
      this.shoppingList.forEach(x=>{
        if(!this.shoppingListServ.productIsTrue(x._id))
        return;
      })
      let body =`שלום לך  ${this.currentUser.firstName +" " +this.currentUser.lastName}  המוצרים שלך יגיעו לסניף  ${this.currentBranch.name}    שברחוב  ${this.currentBranch.address}`+ "    התשלום בוצע בהצלחה !!    קנית   " + this.shoppingList.length +"    מוצרים   בסכום :   "+this.total+"  שקלים חדשים"
      this.sendServ.sendEMail("תשלום בוצע בהצלחה-קבלה" ,body , this.currentUser.email).subscribe(res=>{       
      }) 
      this.userServ.finishBuy().subscribe(res=>{
        alert("תודה שקניתם אצלינו!")
        this.router.navigate([''])
      })
    }
    else{       
       this.router.navigate(['giftCard'],{queryParams :{from:'pay'}})
    }
    })
   
  }

}

