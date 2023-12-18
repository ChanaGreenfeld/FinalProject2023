import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, order } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-view-orders-status',
  templateUrl: './view-orders-status.component.html',
  styleUrls: ['./view-orders-status.component.css']
})
export class ViewOrdersStatusComponent implements OnInit{
  orders: Array<order> = []
  ordersToView: any = []
  currentManager:string
 constructor(private userServ:UsersService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.userServ.isMainManager) {
      this.currentManager=this.userServ.mainManager.firstName+" "+this.userServ.mainManager.lastName
      this.userServ.getAllBranch().subscribe(res=>{
        this.orders = res
          this.orders.forEach((ele) => {
            ele.shoppingList.forEach((x) => {
              let obg = {
                fullName: ele.fullName,
                branch: x.branch,
                date: x.date,
                id:ele.id,
                idsl :x._id,
                status: x.status,
                shoppingLength: x.shoppingListProducts.length,
              }
              this.ordersToView.push(obg)
            })
          })
      })
    } 
  }

  editStatus(id:string,idsl:string,event:any){
    let status={
      status:event.target.value
    }
    this.userServ.editStatus(id,idsl,status).subscribe(res=>{
      const index =  this.ordersToView.findIndex((xu: { idsl: string; })=>xu.idsl==idsl);
      if (index !== -1) {
        this.ordersToView[index].status=status.status;
      }
      this._snackBar.open('סטטוס עודכן בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
    })
  }

}
