import { Component ,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-main-manager',
  templateUrl: './main-manager.component.html',
  styleUrls: ['./main-manager.component.css']
})
export class MainManagerComponent implements OnInit{


  
  constructor(private userServ:UsersService,private router:Router) {  }
  ngOnInit(): void {
    if(!this.userServ.isMainManager)
    this.router.navigate([""])
  }

}
