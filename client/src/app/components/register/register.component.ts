import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
  firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
  lastname: new FormControl('', [Validators.required, Validators.email]),
  phone: new FormControl('', Validators.required),
  mail: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
  number: new FormControl('', Validators.required),
  city: new FormControl('', Validators.required),
  username: new FormControl('', Validators.required),
  password: new FormControl('', [Validators.required, Validators.minLength(5)])
});


constructor(private userServ:UsersService, private router:Router) { }

get f(){
  return this.registerForm.controls;
}

  register(event:any){
    let user={ 
      userName:event.target[7].value,
      password:event.target[8].value,
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      phone: event.target[2].value,
      email: event.target[3].value,
      address:  {
        "city": event.target[6].value,
        "street": event.target[4].value,
        "numBuild":event.target[5].value    
      }
    }

    this.userServ.addUser(user).subscribe(res=>{
      this.router.navigate([''])

    })
  }


}
