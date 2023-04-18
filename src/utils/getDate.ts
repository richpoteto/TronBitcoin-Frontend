
export const getDayFromTimestamp = (timeStamp : number) => {
    var date = new Date(timeStamp * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();

    return year + ":" + month + ":" + day;
}

export const getHourFromTimestamp = (timeStamp : number) => {
    var date = new Date(timeStamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
}
