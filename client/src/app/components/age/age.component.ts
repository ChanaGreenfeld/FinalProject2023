import { Component , OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-age',
  templateUrl: './age.component.html',
  styleUrls: ['./age.component.css']
})
export class AgeComponent implements OnInit{
  products:Array<any>=[]
  ages:string=''
  constructor(private productServ:ProductsService ,    
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const age = params['age']
      this.age(age);
    })
  }
  age(age:string){
    this.ages=age
    this.productServ.getProductsByAge(age)
      .subscribe((data: any) => {
        this.products = data;
      })
  
  }

  
}
