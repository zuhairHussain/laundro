import { Injectable } from '@angular/core';
import { HttpService } from '../../@core/data/http-client';
import { GlobalService } from '../../@core/data/global.service';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class SmartTableService {
  
  constructor(private http: HttpService,private GlobalService : GlobalService) {}

getEmails() {
    return this.http
        .get( GlobalService.serverApi +'customers/?format=json')
        .map(data => {
            let d = data.json();
            let dta = [{id : '000', text : 'Search Customer by Name, Email and Phone'}];
            for (let result of d.results)
            {
                dta.push({id: result.id, text: result.email_address});
            }
            return dta;
        })
}
getItems() {
    return this.http
        .get( GlobalService.serverApi +'laundromat-items/?format=json')
        .map(data => {
            // let d = data.json();
            // let dta = [];
            // for (let result of d.results)
            // {
            //     dta.push({id: result.id, text: result.name});
            // }
            // return dta; 
            console.log('itm', data.json())
            return data.json();
           
        })
}
getPricing() {
    return this.http
        .get( GlobalService.serverApi +'pricing-units/?format=json')
        .map(data => {
            return data.json();
        })
}
getSupplies() {
        return this.http
        .get( GlobalService.serverApi +'supplies/?format=json')
        .map(data => {
            let d = data.json();
            let dta = [{id : '000', text : 'Search Customer by Name, Email and Phone'}];
            for (let result of d.results)
            {
                dta.push({id: result.id, text: result.name});
            }
            return dta;
        })
}
saveData(data){
    return this.http
        .post( GlobalService.serverApi +'request/', data)
        .map(data => {
            return data.json();
        })
}
saveAddress(data){
    return this.http
        .post( GlobalService.serverApi +'addresses/', data)
        .map(data => {
            return data.json();
        })
}
  getData() {
      return this.http
          .get( GlobalService.serverApi +'customers/?format=json')
          .map(data => {
              data.json();
              console.log("I CAN SEE Customer DATA HERE: ", data.json());
              return data.json();
          });
  }

  createCustomer(data) {
    return this.http
        .post( GlobalService.serverApi +'customers/?format=json', data)
        .map(data => {
            data.json();
            console.log("I CAN SEE Customer DATA HERE: ", data.json());
            return data.json();
        });
  }

  createAddress(data) {
    return this.http
        .post( GlobalService.serverApi +'addresses/?format=json', data)
        .map(data => {
            data.json();
            console.log("I CAN SEE addresses DATA HERE: ", data.json());
            return data.json();
        });
  }

  updateCustomer(data) {
    return this.http
        .put( GlobalService.serverApi +'customers/'+ data.id + '/', data)
        .map(data => {
            data.json();
            console.log("I CAN SEE Customer DATA HERE: ", data.json());
            return data.json();
        });
  }

  deleteCustomer(data) {
    console.log(data)
    return this.http
        .delete( GlobalService.serverApi +'customers/'+ data + '/')
  }

}
