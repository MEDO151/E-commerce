import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {

  transform(products:any, num1:number, num2:number ): any {
    return products.slice(num1,num2);
  }

}
