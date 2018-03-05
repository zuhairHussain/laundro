import { Component,Input, DoCheck } from '@angular/core';
import { HttpService } from '../../../@core/data/http-client';

@Component({
  selector: 'Receipt',
  styleUrls: ['./receipt.component.scss'],
  templateUrl: './receipt.component.html',
})

export class ReceiptComponent implements DoCheck{
  @Input() data;
  @Input() orderno;
  @Input() items;
  @Input() supplies;
  @Input() totalWeight;
  @Input() customers;
  weight;

  constructor(){

  }
  ngDoCheck(){
    this.weight = this.totalWeight.reduce(
      ( a, b ) => parseInt(a)  + parseInt(b),
      0
    );
  }
  
}

