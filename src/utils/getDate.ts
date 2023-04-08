const getYear = (timestamp: number) => {
    return Math.floor(timestamp / 31536000) + 1970;
}

const getMonth = (timestamp: number) => {
    return Math.floor(timestamp % 31536000 / 2629744) + 1;
}

const getDay = (timestamp: number) => {
    return Math.floor(timestamp % 31536000 % 2629744 / 86400) + 1;
}

const getDateFromTimestamp = (timeStamp : number) => {
    return getYear(timeStamp) + ": " + getMonth(timeStamp) + ": " + getDay(timeStamp);
}

export default getDateFromTimestamp;