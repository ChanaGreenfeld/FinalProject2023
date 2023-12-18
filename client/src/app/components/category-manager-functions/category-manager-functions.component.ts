import { Component , OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { category } from 'src/app/classes/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-manager-functions',
  templateUrl: './category-manager-functions.component.html',
  styleUrls: ['./category-manager-functions.component.css']
})
export class CategoryManagerFunctionsComponent implements OnInit{
 categories:Array<category>=[]
  flagAdd:boolean = false
  flagEdit:boolean = false
  idToEdit:string
  
  constructor( private categoryServ:CategoryService,private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.categoryServ.getAllCategory().subscribe(res=>{
      this.categories=res
    })
  }


  toAdd(){
    this.flagAdd=true
    this.flagEdit=false
  }

  toEdit(idToEdit:string){
    this.flagEdit=true
    this.idToEdit=idToEdit
    this.flagAdd=false
  }

  addCategory(name:any) {
    this.flagAdd=false
    this.categoryServ.addCategory(name.target[0].value).subscribe(res=>{
      this._snackBar.open('קטגוריה נוספה  בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
      this.ngOnInit()
    })
  }

  editCategory(newname:any){
    this.flagEdit=false
    this.categoryServ.editCategory(this.idToEdit,newname.target[0].value).subscribe(res=>{
      this._snackBar.open('קטגוריה עודכנה בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
      this.ngOnInit()
    })
  }

  deleteCategory(id:string){
    const index =  this.categories.findIndex(x=>x._id==id);
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
    this.categoryServ.deleteCategory(id).subscribe(res=>{
      this._snackBar.open('קטגוריה נמחקה בהצלחה', 'סגור', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:1200,
      });
    })
  }

}
