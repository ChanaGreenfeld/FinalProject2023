import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { order } from 'src/app/classes/user'
import { UsersService } from 'src/app/services/users.service'

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  currentBranch: string
  orders: Array<order> = []
  ordersToView: any = []
  currentManager:string
  constructor(private _snackBar: MatSnackBar,private userServ: UsersService) {}
  ngOnInit(): void {
    if(!this.userServ.isManager){
          history.back()
    }

   else  if (this.userServ.currentUser) {
      this.currentBranch = this.userServ.currentUser.branchName
    this.currentManager=this.userServ.currentUser.firstName +" "+ this.userServ.currentUser.lastName
      this.userServ
        .getOrderByBranchName(this.currentBranch)
        .subscribe((res) => {
          this.orders = res
          this.orders.forEach((ele) => {
            ele.shoppingList.forEach((x) => {
              let obg = {
                id:ele.id,
                fullName: ele.fullName,
                branch: x.branch,
                date: x.date,
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
      this._snackBar.open('סטטוס עודכן!', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration:1600,
      });
    })
  }

}
