import { Component,Input } from '@angular/core';
import { HttpService } from '../../../@core/data/http-client';

@Component({
  selector: 'Receipt',
  styleUrls: ['./receipt.component.scss'],
  templateUrl: './receipt.component.html',
})

export class ReceiptComponent {
  @Input() data:object;
  @Input() orderno:object;
}

