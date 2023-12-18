import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  showMassage:boolean=false
constructor(private userServ:UsersService,private router:Router) { }

ngOnInit(): void {
  
}

  login(event:any) {
    this.userServ.LoginUser(event.target[0].value,event.target[1].value).subscribe(res=>{
      this.userServ.currentUser=res.currentUser
      sessionStorage.setItem("token", res.accessToken);
      const token = sessionStorage.getItem('token');    
      if (token) {
        debugger
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        res.role=role
        if(role=='manager'){
          if(event.target[0].value==this.userServ.mainManager.userName &&event.target[1].value ==this.userServ.mainManager.password){
            this.userServ.isMainManager=true
            this.router.navigate(['mainManager'])
          }
          else{
            this.userServ.isManager=true
            this.router.navigate(['manager'])
          }
        }
       else
          this.router.navigate([''])
      }   
    })
  }

}
