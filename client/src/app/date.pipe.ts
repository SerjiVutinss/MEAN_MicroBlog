import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromUtc'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // var myDate = new Date("July 1, 1978 02:30:00"); // Your timezone!
    // var myEpoch = myDate.getTime() / 1000.0;
    // console.log("Epoch" + myEpoch);

    var myDate = new Date(value * 1000);

    let retVal = myDate.toLocaleString();
    // document.write(myDate.to toGMTString()+"<br>"+myDate.toLocaleString());

    return retVal;
  }

}
