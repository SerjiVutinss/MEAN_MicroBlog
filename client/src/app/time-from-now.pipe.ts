import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from './shared/date.functions';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let now = DateFunctions.getCurrentUTCEpoch();
    let timeDiff = DateFunctions.timeSinceInMinutes(now, value);

    let retVal = "";
    if (timeDiff > 0) {
      retVal = "~" + Math.floor(timeDiff) + "mins ago";
    } else {
      retVal = "~" + Math.floor(timeDiff) + "mins from now";
    }

    return retVal;
  }

}
