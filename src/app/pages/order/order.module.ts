import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrderComponent } from './order.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { MyFilterPipe } from '../pipe';
import { HttpService } from '../../@core/data/http-client';
import { Select2Module } from 'ng2-select2';


@NgModule({
  imports: [
    ThemeModule,
    Select2Module 
  ],
  declarations: [
    OrderComponent,
    ReceiptComponent,
    MyFilterPipe
  ],
  providers:[
    HttpService,
  ]
})
export class OrderModule { 

 
}
