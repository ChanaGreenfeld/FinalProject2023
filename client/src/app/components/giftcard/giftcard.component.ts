import { CurrencyPipe } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { AlertComponent } from '@coreui/angular'
import { SendmailService } from 'src/app/services/sendmail.service'
import { UsersService } from 'src/app/services/users.service'
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component'

export interface DialogData {
  data: string;
  name: string;
}
@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.css'],
})
export class GiftcardComponent implements OnInit {
  one: boolean = true
  two: boolean = false
 
  other: boolean = false
  me: boolean = false
  isTruePayment:boolean=false
  isTruePayment2:boolean=false
   sum: number = 0
  giftForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    bracha: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    from: new FormControl('',[ Validators.required, Validators.minLength(3)]),
});
  

  constructor(private sendMail: SendmailService,public dialog: MatDialog ,private router:Router , private route:ActivatedRoute  ,private userServ:UsersService) {}

  ngOnInit(): void {
    this.isTruePayment =false
    this.isTruePayment2=false
    this.route.queryParams.subscribe((params) => {
      const from = params['from']
    if(from=='pay'){
      this.one=false,
      this.two=false,
      this.other=false,
      this.me=false,
      this.isTruePayment = this.sendMail.isTruePayment
      this.isTruePayment2 = this.sendMail.isTruePayment2

    }
    else{
      this.one=true,
      this.two=false,
      this.other=false,
      this.me=false,
      this.isTruePayment = this.sendMail.isTruePayment
      this.isTruePayment2 = this.sendMail.isTruePayment2
    }
    })
  }

  oneStage(sum: any) {
    if(this.userServ.currentUser){
      this.sendMail.sum = sum.target[0].value
    this.one = false
    this.two = true
    }
    else
    this.router.navigate(['login'])
  }

  toOther() {
    this.other = true
    this.me = false
  }
  toMe() {
    this.me = true
    this.other = false
  } 
   
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  send() {
    let sub = " היי  " +this.sendMail.nameFromGiftCardToSend+"  מחכה לך הפתעה מ-Toys Way "
    let body = `${this.sendMail.nameFromGiftCardToSend}שלום לך  :  קיבלת גיפט כארד מתנה על סכום  ${this.sendMail.sum} ש"ח,   ברכה:   ${this.sendMail.textFromGiftCardToSend}   ממני :)   ${this.sendMail.fromFromGiftCardToSend}`
    this.sendMail.isTruePayment=false
    this.sendMail.sendEMail(sub,body, this.sendMail.mailFromGiftCardToSend).subscribe(res=>{})  
    this.openDialog();  
  }

  send2(){    
    let sub = " היי  " +this.userServ.currentUser.firstName+"  מחכה לך הפתעה מ-Toys Way "
    let body = ` ${this.sendMail.sum} ש"ח,   : קיבלת גיפט כארד  , מעריכים אותך על שפינקת את עצמך !!! ת יישר כח`
    this.sendMail.isTruePayment2=false
    this.sendMail.sendEMail(sub,body, this.userServ.currentUser.email).subscribe(res=>{
      })
      this.openDialog();  

    }

  toPay(event:any){
    this.sendMail.isTruePayment=true
    this.sendMail.nameFromGiftCardToSend=event.target[0].value;
    this.sendMail.textFromGiftCardToSend=event.target[1].value;
    this.sendMail.mailFromGiftCardToSend=event.target[2].value;
    this.sendMail.fromFromGiftCardToSend=event.target[3].value;    
    this.router.navigate(['payment'],{ queryParams: { from: 'gift' }})
  }

  toPay2(){
    this.sendMail.isTruePayment2=true
    this.router.navigate(['payment'],{ queryParams: { from: 'gift' }})
  }

}
