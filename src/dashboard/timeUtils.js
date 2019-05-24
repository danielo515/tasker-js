import { distanceInWords, differenceInMilliseconds, subMilliseconds, distanceInWordsToNow } from 'date-fns';

export const calculatePauseTime = pauses => {
    let pauseTime = 0;
    for (let i = 0, l = pauses.length; (i + 1) < l; i += 2) {
        // not sure why I have to invert this
        pauseTime += differenceInMilliseconds(pauses[i + 1], pauses[i]);
    }
    return pauseTime;
};

export const calculateRunningTime = (start, stop, pauses) => {
    const discount = calculatePauseTime(pauses);
    return stop 
        ? distanceInWords(start, subMilliseconds(stop, discount), { includeSeconds: true })
        : distanceInWordsToNow(start);
};
