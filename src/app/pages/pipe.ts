import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {
        if (!items || !filter) {
            return items;
        }
        
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
          return JSON.stringify(items.filter(item => item.price_unit_id == filter));

        

        // return items.filter(item => {
          
        //   if(filter.length > 1){
        //     let arr = [];
        //     for (let f of filter) {
        //         if (item.id == f) {
        //           arr.push(item);
        //         }
        //     }
        //     console.log(arr)
        //   }
        //   else{
        //     return item.id == filter;
        //   }
         
        // });
       
    }
}