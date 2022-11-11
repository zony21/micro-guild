import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date) => {
    const formattedDate = dayjs.utc(date).tz("Asia/Tokyo").format("YYYY_MM");
    return formattedDate;
}

export const groupBy = function (contents) {
    return contents.reduce(function (group, x) {
        const yearMonthString = formatDate(new Date(x["publishedAt"]));
        (group[yearMonthString] = group[yearMonthString] || []).push(x);
        return group;
    }, {});
};