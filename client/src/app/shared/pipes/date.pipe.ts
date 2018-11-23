import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from '../date.functions';

@Pipe({
  name: 'dateFromUTC'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, args?: any): any {

    return DateFunctions.getDateFromUTCEpoch(value);
  }

}
