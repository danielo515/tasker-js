// @ts-check
import distanceInWords from 'date-fns/distance_in_words';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import  subMilliseconds  from 'date-fns/sub_milliseconds';

export const calculatePauseTime = (pauses = []) => {
    let pauseTime = 0;
    for (let i = 0, l = pauses.length; (i + 1) < l; i += 2) {
        // not sure why I have to invert this
        pauseTime += differenceInMilliseconds(pauses[i + 1], pauses[i]);
    }
    return pauseTime;
};

export const calculateRunningTime = (start, finish, pauses) => {
    const discount = calculatePauseTime(pauses);
    // to get the actual running time we make finish date closer to the start one by subtracting pause time.
    const adjustedStop = subMilliseconds(finish || Date.now(), discount);
    return distanceInWords(start, adjustedStop, { includeSeconds: true });
};
