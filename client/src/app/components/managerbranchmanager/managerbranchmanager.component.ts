import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { branch } from 'src/app/classes/branch';
import { Manager } from 'src/app/classes/manager';
import { BranchesService } from 'src/app/services/branches.service';
import { ManagersService } from 'src/app/services/managers.service';

@Component({
  selector: 'app-managerbranchmanager',
  templateUrl: './managerbranchmanager.component.html',
  styleUrls: ['./managerbranchmanager.component.css']
})
export class ManagerbranchmanagerComponent implements OnInit {
  managers:Array<any>=[]
  managerToEdit:Manager= new Manager("","","","","")
  flagEdit:boolean=false
  branches:Array<branch>=[]
  flagAdd:boolean=false
  idToEdit:string
  selectedBranch:string
  currentBranch:string


  constructor(private manaerServ:ManagersService , private branchSer:BranchesService,private _snackBar: MatSnackBar  ) {   }
  ngOnInit(): void {
    this.manaerServ.getAllManagers().subscribe(res=>{
      this.managers=res
    })
  }

  deleteManager(id:string){
    this.manaerServ.deleteManager(id).subscribe(res=>{
      this._snackBar.open('מנהל נמחק בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
      const index =  this.managers.findIndex(x=>x._id==id)
      if (index !== -1) {
        this.managers.splice(index, 1);  
      }
    })
  }
  
  toEdit(manager:any){
    this.flagEdit =!this.flagEdit
    this.flagAdd=false
    this.managerToEdit.firstName=manager.firstName
    this.managerToEdit.lastName=manager.lastName
    this.idToEdit=manager._id
    this.managerToEdit.userName=manager.userName
    this.managerToEdit.password=manager.password
    this.managerToEdit.branchName=manager.branchName
    this.branchSer.getAllBranches().subscribe(res=>{
      this.branches=res
    })
  }

  editmanager(event:any){
    let mana = new Manager(event.target[0].value,event.target[1].value,event.target[2].value,event.target[3].value,this.currentBranch)
    this.manaerServ.editManager(this.idToEdit,mana).subscribe(res=>{
      this._snackBar.open('מנהל עודכן  בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
      this.ngOnInit()
    })
  }

  changeAddFlag() {
    this.flagAdd = !this.flagAdd;
    this.flagEdit=false
    this.branchSer.getAllBranches().subscribe(res=>{
      this.branches=res
    })
  }
  saveBranch(event:any){
    this.currentBranch=event.target.value
  }

  addmanager(event:any){
    let mana = new Manager(event.target[0].value,event.target[1].value,event.target[2].value,event.target[3].value,this.currentBranch)
    this.manaerServ.addManager(mana).subscribe(res=>{
      this._snackBar.open('מנהל נוסף בהצלחה  בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
      this.ngOnInit()
    })
  }
 
}
