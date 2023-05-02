import { useSelector } from "react-redux";
import { IReduxState } from "store/slice/state.interface";

export const getDayFromTimestamp = (timeStamp : number) => {
    var date = new Date(timeStamp * 1000);
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var day = date.getDate();

    return year + ":" + month + ":" + day;
}

export const getHourFromTimestamp = (timeStamp : number) => {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
}

const getDay = (start : number, timeStamp : number) => {
    return Math.floor((timeStamp - start) / 4 / 60);
}

export const getDifference = (startTime : number, timeStamp : number) => {
    const currentTimeStamp: number = Math.round(new Date().getTime() / 1000);

    return getDay(startTime, currentTimeStamp) - getDay(startTime, timeStamp);
}