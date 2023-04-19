
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
