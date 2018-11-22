import { readElementValue } from "@angular/core/src/render3/util";

export class DateFunctions {

    //this.post.created_utc = Math.round(new Date().getTime() / 1000.0);

    public static getCurrentUTCEpoch(): number {
        return Math.round(new Date().getTime() / 1000.0);
    }

    public static getUTCEpochFromDate(date: Date): number {
        return Math.round(date.getTime() / 1000.0);
    }

    public static getUTCEpochFromString(strDate: string): number {

        return Math.round(new Date(strDate).getTime() / 1000.0);
    }

    public static getDateFromUTCEpoch(epoch: any) {
        var d = new Date(epoch * 1000);
        return d.toJSON();
    }

    public static timeSinceInMinutes(t1: any, t2: any) {
        let retVal = t1 - t2;

        return Math.floor(retVal / 60);
    }

}