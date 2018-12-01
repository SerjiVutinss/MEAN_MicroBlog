import { Pipe, PipeTransform } from '@angular/core';
import { DateFunctions } from './shared/date.functions';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let now = DateFunctions.getCurrentUTCEpoch();
    let timeDiffMins = DateFunctions.timeSinceInMinutes(now, value);
    // let timeDiffHours = timeDiffMins / 60;
    let retVal = this.parseMinutes(timeDiffMins);
    // let timeDiffDays = timeDiffHours / 24;
    // let timeDiffWeeks = timeDiffDays / 7;
    // let timeDiffMonths = timeDiffDays / 30;
    // let timeDiffYears = timeDiffMonths / 12;


    // let retVal = "";
    // if (Math.abs(timeDiffHours) > 0.5 && Math.abs(timeDiffHours) < 1.5) {
    //   // hours
    //   retVal = "~" + Math.floor(timeDiffHours) + "hr";
    // }


    // if (timeDiff < 30) {
    //   retVal = "~" + Math.floor(timeDiffHours) + "mins";
    // } else {
    //   retVal = "~" + Math.floor(timeDiff) + "mins from now";
    // }


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
        retVal.units = "min";
      } else {
        retVal.units = "mins";
      }
      retVal.value = deltaMins;
      // we are done, exit this if statement
    } else {
      // move to hours and round
      let deltaHours = Math.round(deltaMins / minsPerHour);
      if (deltaHours < 24) {
        if (deltaHours == 1) {
          retVal.units = "hr";
        } else {
          retVal.units = "hrs";
        }
        retVal.value = deltaHours;
      } else {
        // move to days
        let deltaDays = Math.round(deltaHours / 24);
        if (deltaDays == 1) {
          retVal.units = "day";
        } else {
          retVal.units = "days";
        }
        retVal.value = deltaDays;
      }
    }



    // // if we are less than an hour, just use minutes
    // if (deltaMins == 1) {
    //   retVal.value = deltaMins;
    //   retVal.units = " min"
    // }
    // if (deltaMins < minsPerHour) {
    //   retVal.value = deltaMins;
    //   retVal.units = " mins"
    // } else {
    //   retVal.value = deltaMins;
    //   retVal.units = " mins"
    // }

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
