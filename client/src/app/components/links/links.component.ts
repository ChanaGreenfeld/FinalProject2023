import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent {
  links: any[] = [{
    title: 'הנמכרים ביותר', 
    image: 'assets/nim.png', 
    nav: '/bestSell'
  }, {
    title: 'הנחה',
    image: 'assets/sale.png',
    nav: '/sale'
  }, {
    title: 'אודות',
    image: 'assets/logo-project.jpg',
    nav: '/about'
  }, {
    title: 'Gift Card',
    image: 'assets/gift.png',
    nav: '/giftCard'
  }, {
    title: 'מוצרים חדשים',
    image: 'assets/new.png',
    nav: '/newProducts'
  }]  
  
  constructor (private router: Router) { }

  navigate(nav: string) {
    this.router.navigate([nav])
  }
}
