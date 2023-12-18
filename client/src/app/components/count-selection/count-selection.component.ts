import { Component , EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'count-selection',
  templateUrl: './count-selection.component.html',
  styleUrls: ['./count-selection.component.css']
})
export class CountSelectionComponent {
 @Input() count: number = 1
  
@Output() onCountChange = new EventEmitter<number>()


  constructor () { }

  updateCount(value: number) {
    if (this.count + value > 0) {
      this.count += value
      this.onCountChange.emit(this.count)
    }
  }
}


 
