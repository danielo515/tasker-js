// @ts-check
// import distanceInWords from 'date-fns/distance_in_words';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import difference_in_minutes from 'date-fns/difference_in_minutes';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import difference_in_hours from 'date-fns/difference_in_hours';
import  subMilliseconds  from 'date-fns/sub_milliseconds';
import  subMinutes  from 'date-fns/sub_minutes';
import  subHours  from 'date-fns/sub_hours';

export const calculatePauseTime = (pauses = []) => {
    let pauseTime = 0;
    for (let i = 0, l = pauses.length; (i + 1) < l; i += 2) {
        // not sure why I have to invert this
        pauseTime += differenceInMilliseconds(pauses[i + 1], pauses[i]);
    }
    return pauseTime;
};

const detailedDistance = (start,finish) => {
    const hours = difference_in_hours(finish, start);
    const hoursAdjusted = subHours(finish,hours);
    const minutes = difference_in_minutes(hoursAdjusted, start);
    const seconds = differenceInSeconds(subMinutes(hoursAdjusted,minutes), start);
    return [hours, minutes, seconds];
};

const formatDetail = (hours,minutes,seconds) => `${hours} hours ${minutes} min. ${seconds} sec.`;

export const calculateRunningTime = (start, finish, pauses, format = formatDetail) => {
    const discount = calculatePauseTime(pauses);
    // to get the actual running time we make finish date closer to the start one by subtracting pause time.
    const adjustedStop = subMilliseconds(finish || Date.now(), discount);
    return format(...detailedDistance(start,adjustedStop));
};
