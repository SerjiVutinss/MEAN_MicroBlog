import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from '../date.functions';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let now = DateFunctions.getCurrentUTCEpoch();
    let timeDiffMins = DateFunctions.timeSinceInMinutes(now, value);
    let retVal = this.parseMinutes(timeDiffMins);

    return retVal;
  }

  private parseMinutes(value: any) {
    // return correct string
    let retVal = {
      value: -1,
      units: "",
      fromNow: ""
    };

    const minsPerHour = 60;

    let deltaMins = Math.abs(value); // get the minute difference

    // check to see if we should use minutes or hours
    if (deltaMins < minsPerHour) {
      // if it
      if (deltaMins == 1) {
        retVal.units = " minute";
      } else {
        retVal.units = " minutes";
      }
      retVal.value = deltaMins;
      // we are done, exit this if statement
    } else {
      // move to hours and round
      let deltaHours = Math.round(deltaMins / minsPerHour);
      if (deltaHours < 24) {
        if (deltaHours == 1) {
          retVal.units = " hour";
        } else {
          retVal.units = " hours";
        }
        retVal.value = deltaHours;
      } else {
        // move to days
        let deltaDays = Math.round(deltaHours / 24);
        if (deltaDays == 1) {
          retVal.units = " day";
        } else {
          retVal.units = " days";
        }
        retVal.value = deltaDays;
      }
    }

    // check the sign
    if (value >= 0) {
      retVal.fromNow = " ago";
    } else {
      retVal.fromNow = " from now";
    }
    return "~" + retVal.value + retVal.units + retVal.fromNow;
  }

  private getBestResult(value) {
    let minsInHour = 60;
  }

}
