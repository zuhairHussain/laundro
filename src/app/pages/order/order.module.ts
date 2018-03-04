import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { OrderComponent } from './order.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { itemFilter,supplyFilter,customersFilter } from '../pipe';
import { HttpService } from '../../@core/data/http-client';
import { Select2Module } from 'ng2-select2';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCAkw2R5hND8U-Jzc7zJ-RBlv5A_qedI8o",
      libraries: ["places"],
      
    }),
    ThemeModule,
    Select2Module 
  ],
  declarations: [
    OrderComponent,
    ReceiptComponent,
    itemFilter,
    supplyFilter,
    customersFilter
  ],
  providers:[
    HttpService,
  ]
})
export class OrderModule { 

 
}
