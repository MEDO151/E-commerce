import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitleFormatPipe implements PipeTransform {

  transform(title:string, word1:string, num1:number, num2:number, word2:string ): any{
    return title.split(word1).slice(num1,num2).join(word2);
  }

}
