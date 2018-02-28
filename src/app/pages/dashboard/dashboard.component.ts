import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { HttpService } from '../../@core/data/http-client';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  settings = {
    mode: 'inline', 
    
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate : true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave : true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      email_address: {
        title: 'E-mail',
        type: 'string',
      },
      phone_number: {
        title: 'Phone',
        type: 'string',
      },
      // address_id: {
      //   title: 'Address',
      //   type: 'string',
      // },
    },
  };  

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,private http: HttpService) {
    this.getList();
  }
  getList(){
    this.service.getData()
    .subscribe(
      (data)=>{
        this.source.load(data.results);
      })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.service.deleteCustomer(event.data.id).subscribe(
        (data)=>{},
        (err)=>{},
        ()=>{alert(event.data.name + ' Deleted')}
      )
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    console.log('edit', event)
      this.service.updateCustomer(event.data).subscribe(
        (data)=>{},
        (err)=>{},
        ()=>{this.getList()}
      )
  }

  onAdd(event): void {
    this.service.createCustomer(event.newData)
    .subscribe(
      (data)=>{
        let dta:any = {
          id: data.id,
          name: data.name,
          email_address: data.email_address,
          phone_number: data.phone_number
        }
        this.source.add(dta);
        this.getList();
      })
  } 
  
  handleSomething() {
    
  }

}

