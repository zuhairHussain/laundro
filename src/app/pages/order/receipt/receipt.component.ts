import { Component,Input } from '@angular/core';
import { HttpService } from '../../../@core/data/http-client';
import { supplyFilter } from '../../pipe';

@Component({
  selector: 'Receipt',
  styleUrls: ['./receipt.component.scss'],
  templateUrl: './receipt.component.html',
})

export class ReceiptComponent {
  @Input() data:object;
  @Input() orderno:object;
  @Input() items:object;
  @Input() supplies:object;
  @Input() customers:object;
  
}

