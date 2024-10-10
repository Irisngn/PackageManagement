import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateTime',
  standalone: true
})
export class FormatDateTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    
    const date = new Date(value);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
