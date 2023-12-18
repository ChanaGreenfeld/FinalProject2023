import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { branch } from 'src/app/classes/branch';
import { BranchesService } from 'src/app/services/branches.service';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.css']
})
export class BranchManagerComponent implements OnInit {
  branches:Array<branch>=[]
  flagEdit:boolean=false
  branchToEdit:branch=new branch("","");
  idToEdit:string
  flagAdd:boolean
  constructor( private branchSer:BranchesService,private _snackBar: MatSnackBar) {   }

  ngOnInit(): void {
    this.branchSer.getAllBranches().subscribe(res=>{
      this.branches=res
    })
  }
  toEdit(branch:any){
    this.flagEdit =!this.flagEdit
    this.branchToEdit.address=branch.address   
    this.branchToEdit.name=branch.name
    this.idToEdit=branch._id
    this.flagAdd = false
  }

  changeAddFlag() {
    this.flagAdd = !this.flagAdd;
    this.flagEdit=false
  }

  editbranch(event:any){
      let branc= new branch(event.target[0].value,event.target[1].value)
      this.branchSer.editBranch(this.idToEdit , branc).subscribe(res=>{
        this._snackBar.open('סניף עודכן בהצלחה', 'סגור', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration:2000,
        });
        this.ngOnInit()
        this.flagEdit=!this.flagEdit
      })
  }

  addBranch(event:any){
    let mana = new branch(event.target[0].value,event.target[1].value)
    this.branchSer.addBranch(mana).subscribe(res=>{
      this._snackBar.open('סניף נוסף  בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:2000,
      });
      this.ngOnInit()
      this.flagAdd=!this.flagAdd
    })

  }

}
