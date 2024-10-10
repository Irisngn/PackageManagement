import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight',
  standalone: true
})
export class WeightPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
     if (value == null){
      return "";

     };
  
  const grams = value * 1000;
  return `${grams}g`; 
  }

}
