import { Component,Input, OnInit } from '@angular/core';
import { HttpService } from '../../@core/data/http-client';
import { ReceiptComponent } from './receipt/receipt.component';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concat } from 'rxjs/operator/concat';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'order',
  styleUrls: ['./order.component.scss'],
  templateUrl: './order.component.html',
  
})

export class OrderComponent implements OnInit {
  public emails: Observable<Array<Select2OptionData>>;
  public startValue: Observable<string>;
  public supplies: Observable<Array<Select2OptionData>>;
  public pricing;
  
  /* Multi select Items */
  public itemOptions: Select2Options;
  public items = [];
  public suberr;
  public sucess;
  orderno;
  
  
  public loading = false;  
  public selectedItems = [];
  constructor(private service: SmartTableService){

  }

  data = {
      requestbag_set: [
          {
              weight: 0,
              customer: 1,
              items: [{quantity : 0, item : null }]
          }
      ],
      customer_comments: null,
      detail: null,
      delivery_date: "",
      supplies_pricing: 0,
      items_pricing: 0,
      custom_service_price: null,
      payment_method: 0,
      service: 1,
      user: 1,
      customer: null,
      supplies: []
  }
  create_user = {
    name : null,
    email_address : null,
    phone_number : null,
    address : null
  }
  // data2 = {
  //   customer_comments: "",
  //   detail: "",
  //   any_detail: "",
  //   special_requiremen: "",
  //   invoice_url: "",
  //   customer_id: 0,
  //   request_detail: {
  //     weight: "",
  //     requestbag_set: [{weight : 0 , items : [{item : null , qty : 0}]}],
  //     items:[],
  //     supplies: []
  //   },
  //   itemPricing : null
  // }
  
  addBags(event){
    let arr = [];
    for(let i = 1 ; i <= event ; i++){
      arr.push(
        {
          weight: 0,
          customer: 1,
          items: [{quantity : 0, item : null }]
      }
      )
      console.log(i)
    }
    this.data.requestbag_set = arr;
  }


  qty(val, i , i2){
    console.log(this.data.requestbag_set);
    this.data.requestbag_set[i2].items[i].quantity = val;
  }
  selitm(val, i , i2){
    this.data.requestbag_set[i2].items[i].item = val;
    console.log(this.data.requestbag_set)
  }
  addItem(i , i2){
    this.data.requestbag_set[i2].items.push({quantity : 0, item : null })
  }
  removeItem(i , i2){
    console.log(this.data.requestbag_set[i2].items[i])
    this.data.requestbag_set[i2].items.splice(i, 1)
  }
  ngOnInit() {
      this.service.getPricing().subscribe(data => {
        this.pricing = data.results;
      })
      this.emails = this.service.getEmails();
      this.service.getItems().subscribe(data => {
        this.items = data.results;
      });
      this.startValue = Observable.create(obs => {
        obs.next('000');
        obs.complete();
      })
      this.itemOptions = {
        multiple: true
      }
     
      this.supplies = this.service.getSupplies();

  }
  changedEmail(event){
    this.data.customer = event.value;
    console.log(event)
   
  }
  suppliesListing(event){
    this.data.customer = event.value;
  }
  changedItems(data){
      console.log(data)
  }

  request(){
    this.service.saveData(this.data).subscribe(
      data => {
        console.log(data)
        this.orderno = data.id
      },
      error => {
        this.suberr = "Please Fill All Required Fields."
        this.loading = false;
        console.log(error)
      },
      () => {
        this.suberr = "";
        this.loading = false;
        this.sucess = "Request Successfully Processed"
      }
      
    )
  }

  submit(){

    this.loading = true;
    this.suberr = "";
    this.sucess = "";
    if(this.data.customer.length != 0 && this.data.customer[0] != "0"){
      this.request()
    }
    else{
      let obj = this.create_user
      if(obj.email_address != null && obj.name != null && obj.phone_number != null){
        this.service.createCustomer(this.create_user)
        .subscribe(
          data =>{
            console.log(data)
            this.data.customer = data.id;
          },
          error => {
            this.loading = false;
            let err = JSON.parse(error._body)
            this.suberr = Object.values(err)[0];
          },
          () => {
            this.request()            
          }
        )
      }
      else{
        this.loading = false;        
        this.suberr = "Please Fill All Required Fields."
      }
    }
    
  }
}

